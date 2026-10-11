'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser } from '@/types';

interface AuthContextType {
  currentUser: CustomerUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  loginWithGoogle: (asAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<CustomerUser>) => void;
}

const DEFAULT_ADMIN: CustomerUser = {
  id: 'usr-admin-01',
  name: 'Yashveer Singh Gulati',
  email: 'yashveer@gulatiandsons.com',
  phone: '+91 98110 12345',
  role: 'admin',
  ordersCount: 4,
  lifetimeSpend: 42490,
  lastActive: 'Just now',
  createdAt: '2026-01-01T10:00:00Z',
  marketingConsent: true,
  addresses: [
    {
      id: 'addr-01',
      isDefault: true,
      addressLine1: 'The Gulati Residence, 14 Amrita Shergill Marg',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110003'
    }
  ]
};

const DEFAULT_CUSTOMER: CustomerUser = {
  id: 'usr-cust-02',
  name: 'Devraj Chauhan',
  email: 'devraj.chauhan@outlook.com',
  phone: '+91 98765 43210',
  role: 'customer',
  ordersCount: 2,
  lifetimeSpend: 17498,
  lastActive: 'Active today',
  createdAt: '2026-02-15T11:20:00Z',
  marketingConsent: true,
  addresses: [
    {
      id: 'addr-02',
      isDefault: true,
      addressLine1: 'Flat 402, Sea Face Apartments, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gs_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        // Default to signed-in sample customer for smooth demo experience
        setCurrentUser(DEFAULT_CUSTOMER);
      }
    } catch {
      setCurrentUser(DEFAULT_CUSTOMER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = async (asAdmin: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // Smooth natural authentication feedback
    const user = asAdmin ? DEFAULT_ADMIN : DEFAULT_CUSTOMER;
    setCurrentUser(user);
    try {
      localStorage.setItem('gs_user', JSON.stringify(user));
    } catch {}
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('gs_user');
    } catch {}
  };

  const updateProfile = (profile: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);
    try {
      localStorage.setItem('gs_user', JSON.stringify(updated));
    } catch {}
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isLoading,
        loginWithGoogle,
        logout,
        updateProfile
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
