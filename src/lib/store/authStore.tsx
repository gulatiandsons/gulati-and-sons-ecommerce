'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser, CustomerAddress } from '@/types';
import { auth, googleProvider, db, isFirebaseConfigured } from '@/lib/firebase/client';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  runTransaction
} from 'firebase/firestore';

export interface OnboardingData {
  fullName: string;
  age: number;
  username: string;
  primaryPhone: string;
  secondaryPhone?: string;
  contactEmail: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

interface AuthContextType {
  currentUser: CustomerUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
  loginWithGoogle: () => Promise<boolean>;
  loginWithEmailPassword: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<CustomerUser>) => Promise<void>;
  checkUsernameAvailable: (username: string) => Promise<boolean>;
  completeOnboarding: (data: OnboardingData) => Promise<{ success: boolean; error?: string }>;
}

const SUPERADMIN_OFFICIAL_EMAIL = 'varungulati.admin@gulatiandsons.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  // Monitor authoritative Firebase Auth state
  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      try {
        if (!fbUser) {
          // No active session: wipe state & clean storage
          setCurrentUser(null);
          try {
            localStorage.removeItem('gs_user');
          } catch {}
          setIsLoading(false);
          return;
        }

        const isSuperadmin = fbUser.email?.toLowerCase() === SUPERADMIN_OFFICIAL_EMAIL.toLowerCase();

        // Check Firestore for user record
        let profileData: CustomerUser | null = null;
        if (db) {
          try {
            const userDocRef = doc(db, 'users', fbUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
              profileData = userSnap.data() as CustomerUser;
            }
          } catch (dbErr) {
            console.warn('Firestore user fetch note:', dbErr);
          }
        }

        if (profileData) {
          // Existing user document found
          const resolvedUser: CustomerUser = {
            ...profileData,
            id: fbUser.uid,
            uid: fbUser.uid,
            email: profileData.email || fbUser.email || '',
            authEmail: fbUser.email || '',
            role: isSuperadmin ? 'admin' : (profileData.role || 'customer')
          };
          setCurrentUser(resolvedUser);
          try {
            localStorage.setItem('gs_user', JSON.stringify(resolvedUser));
          } catch {}

          if (!isSuperadmin && !resolvedUser.onboardingCompleted) {
            setShowOnboardingModal(true);
          }
        } else {
          // New authenticated user session
          const newUser: CustomerUser = {
            id: fbUser.uid,
            uid: fbUser.uid,
            name: fbUser.displayName || 'Patron',
            fullName: fbUser.displayName || '',
            email: fbUser.email || '',
            authEmail: fbUser.email || '',
            contactEmail: fbUser.email || '',
            role: isSuperadmin ? 'admin' : 'customer',
            ordersCount: 0,
            lifetimeSpend: 0,
            lastActive: 'Just now',
            createdAt: new Date().toISOString(),
            onboardingCompleted: isSuperadmin, // Admin doesn't need customer onboarding
            marketingConsent: true,
            addresses: []
          };

          setCurrentUser(newUser);
          try {
            localStorage.setItem('gs_user', JSON.stringify(newUser));
          } catch {}

          // Customer requires onboarding
          if (!isSuperadmin) {
            setShowOnboardingModal(true);
          }
        }
      } catch (err) {
        console.error('Auth state initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not available in current environment.');
      }
      const result = await signInWithPopup(auth, googleProvider);
      return Boolean(result.user);
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmailPassword = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!auth) {
        throw new Error('Firebase Auth is not available.');
      }
      const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
      return Boolean(result.user);
    } catch (err: any) {
      console.error('Email login failed:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('SignOut note:', err);
    } finally {
      setCurrentUser(null);
      setShowOnboardingModal(false);
      try {
        localStorage.removeItem('gs_user');
      } catch {}
      setIsLoading(false);
    }
  };

  const updateProfile = async (profile: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const updated: CustomerUser = { ...currentUser, ...profile, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);

    try {
      localStorage.setItem('gs_user', JSON.stringify(updated));
    } catch {}

    if (db && currentUser.id) {
      try {
        const userRef = doc(db, 'users', currentUser.id);
        await setDoc(userRef, updated, { merge: true });
      } catch (e) {
        console.warn('Firestore updateProfile note:', e);
      }
    }
  };

  const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    const normalized = username.trim().toLowerCase();
    if (!normalized || normalized.length < 3) return false;

    // Disallow reserved names
    const reserved = ['admin', 'superadmin', 'varungulati', 'gulati', 'gulatiandsons', 'root', 'support', 'owner', 'staff'];
    if (reserved.includes(normalized)) return false;

    if (!db) return true;

    try {
      const snap = await getDoc(doc(db, 'usernames', normalized));
      if (!snap.exists()) return true;
      const data = snap.data();
      // Available if claimed by current user
      return data.uid === currentUser?.id;
    } catch {
      return true;
    }
  };

  const completeOnboarding = async (data: OnboardingData): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser?.id) {
      return { success: false, error: 'User must be authenticated before completing onboarding.' };
    }

    const normalized = data.username.trim().toLowerCase();
    if (!/^[a-z0-9_-]{3,20}$/.test(normalized)) {
      return { success: false, error: 'Username must be 3-20 characters using letters, numbers, hyphens, or underscores.' };
    }

    if (data.age < 18) {
      return { success: false, error: 'Patrons must be at least 18 years of age.' };
    }

    const newAddress: CustomerAddress = {
      id: `addr-${Date.now()}`,
      isDefault: true,
      addressLine1: data.addressLine1.trim(),
      addressLine2: data.addressLine2.trim(),
      addressLine3: data.addressLine3?.trim() || '',
      landmark: data.landmark?.trim() || '',
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedUser: CustomerUser = {
      ...currentUser,
      name: data.fullName.trim(),
      fullName: data.fullName.trim(),
      age: Number(data.age),
      username: data.username.trim(),
      usernameNormalized: normalized,
      contactEmail: data.contactEmail.trim(),
      email: data.contactEmail.trim(),
      primaryPhone: data.primaryPhone.trim(),
      secondaryPhone: data.secondaryPhone?.trim() || '',
      phone: data.primaryPhone.trim(),
      onboardingCompleted: true,
      addresses: [newAddress],
      updatedAt: new Date().toISOString()
    };

    // Atomic transaction in Firestore
    if (db) {
      try {
        const usernameRef = doc(db, 'usernames', normalized);
        const userRef = doc(db, 'users', currentUser.id);

        await runTransaction(db, async (txn) => {
          const uDoc = await txn.get(usernameRef);
          if (uDoc.exists() && uDoc.data().uid !== currentUser.id) {
            throw new Error(`The username "${data.username}" is already reserved. Please select another.`);
          }
          txn.set(usernameRef, {
            uid: currentUser.id,
            usernameNormalized: normalized,
            createdAt: new Date().toISOString()
          });
          txn.set(userRef, updatedUser, { merge: true });
        });
      } catch (err: any) {
        console.error('Firestore onboarding transaction error:', err);
        return { success: false, error: err.message || 'Unable to reserve username in Firestore registry.' };
      }
    }

    setCurrentUser(updatedUser);
    setShowOnboardingModal(false);
    try {
      localStorage.setItem('gs_user', JSON.stringify(updatedUser));
    } catch {}

    return { success: true };
  };

  const isAdmin = currentUser?.email?.toLowerCase() === SUPERADMIN_OFFICIAL_EMAIL.toLowerCase() || currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isLoading,
        showOnboardingModal,
        setShowOnboardingModal,
        loginWithGoogle,
        loginWithEmailPassword,
        logout,
        updateProfile,
        checkUsernameAvailable,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
