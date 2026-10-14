import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, testFirestoreConnection } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  userRequests: any[];
  saveServiceRequest: (requestData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  userRequests: [],
  saveServiceRequest: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRequests, setUserRequests] = useState<any[]>([]);

  useEffect(() => {
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync or create user profile in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          await setDoc(userRef, {
            userId: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || '',
            photoUrl: currentUser.photoURL || '',
            createdAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn('Could not save user profile to Firestore:', err);
        }

        // Listen to user's service requests
        const requestsCol = collection(db, 'serviceRequests');
        const q = query(requestsCol, where('userId', '==', currentUser.uid));
        
        const unsubRequests = onSnapshot(q, (snapshot) => {
          const items: any[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...docSnap.data() });
          });
          setUserRequests(items);
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, 'serviceRequests');
        });

        return () => unsubRequests();
      } else {
        setUserRequests([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const saveServiceRequest = async (requestData: any) => {
    if (!user) return;
    const requestId = `REQ-${Date.now().toString().slice(-6)}`;
    const docRef = doc(db, 'serviceRequests', requestId);

    const payload = {
      requestId,
      userId: user.uid,
      clientName: user.displayName || 'Client',
      contactPhone: requestData.contactPhone || '',
      serviceType: requestData.serviceType || 'NDT',
      assetType: requestData.assetType || 'Piping',
      material: requestData.material || 'Carbon Steel',
      location: requestData.location || 'Cairo',
      urgency: requestData.urgency || 'Normal',
      rfqReference: requestData.rfqReference || requestId,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(docRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `serviceRequests/${requestId}`);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithGoogle,
      signOut,
      userRequests,
      saveServiceRequest
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
