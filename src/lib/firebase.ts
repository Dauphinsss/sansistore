import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence).catch(() => {});

isSupported().then((yes) => yes && getAnalytics(app));

export { app, auth, db, googleProvider };

// Only connect to Firebase emulators when explicitly enabled.
const useFirebaseEmulators =
  import.meta.env.DEV && import.meta.env.PUBLIC_USE_FIREBASE_EMULATORS === 'true';

if (useFirebaseEmulators) {
  // Firestore emulator
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    // Connect auth emulator as well
    try {
      connectAuthEmulator(auth, 'http://localhost:9099');
      console.log('Firebase Auth: connected to emulator at http://localhost:9099');
    } catch (e) {
      console.warn('Firebase Auth: could not connect to emulator', e);
    }
    console.log('Firebase: connected to emulators (firestore at localhost:8080)');
  } catch (e) {
    console.warn('Firebase: could not connect to emulators', e);
  }
}
