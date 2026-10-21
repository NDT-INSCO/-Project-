import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'ai-studio-inscointeractive-2ab74c2d-acdd-4fa3-a16b-53ea46221179',
  authDomain: 'ai-studio-inscointeractive-2ab74c2d-acdd-4fa3-a16b-53ea46221179.firebaseapp.com',
};

let app: FirebaseApp;
let db: Firestore | null = null;
let auth: Auth | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (err) {
  console.warn('Firebase initialization note (using local cache fallback):', err);
}

export { app, db, auth };
