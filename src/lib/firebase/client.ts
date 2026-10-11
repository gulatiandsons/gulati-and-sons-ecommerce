/**
 * Firebase Client Configuration (Spark Plan Compatible)
 * Safely initializes Firebase without crashing if environment variables are not yet populated.
 */

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
};

export const getFirebaseSetupInstructions = (): string => {
  return `
Firebase Setup Instructions for Gulati & Sons:
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication -> Sign-in method -> Google provider.
3. Enable Cloud Firestore -> Start in production mode.
4. Deploy the supplied 'firestore.rules' file using Firebase CLI (firebase deploy --only firestore:rules).
5. Copy project configuration keys to .env.local:
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
6. Storefront runs on Spark plan without requiring paid Cloud Functions.
`;
};
