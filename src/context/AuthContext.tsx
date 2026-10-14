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
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { auth, db, testFirestoreConnection } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { 
  UserRole, 
  UserProfile, 
  ClientProfile, 
  WorkOrder, 
  WorkOrderStatus, 
  WorkerCheckIn, 
  DailyFieldReport 
} from '../types';
import { 
  INITIAL_CLIENTS, 
  INITIAL_WORK_ORDERS, 
  INITIAL_WORKER_TRACKING, 
  INITIAL_FIELD_REPORTS 
} from '../data/initialRbacData';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  currentRole: UserRole;
  loading: boolean;
  signInWithGoogle: (role?: UserRole) => Promise<void>;
  loginAsDemo: (role: UserRole, customName?: string, customCompany?: string) => void;
  switchRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
  updateProfileDetails: (details: Partial<UserProfile>) => Promise<void>;
  
  // Clients Management (تسجيل بيانات العملاء)
  clients: ClientProfile[];
  addClient: (clientData: Omit<ClientProfile, 'clientId' | 'createdAt'>) => Promise<void>;
  
  // Work Orders (طلبات العمل)
  workOrders: WorkOrder[];
  addWorkOrder: (orderData: Omit<WorkOrder, 'orderId' | 'createdAt'>) => Promise<void>;
  updateWorkOrderStatus: (orderId: string, status: WorkOrderStatus) => Promise<void>;
  
  // Worker Tracking (هيكل تتبع العاملين وأماكن تواجدهم)
  workerCheckIns: WorkerCheckIn[];
  submitWorkerCheckIn: (checkInData: Omit<WorkerCheckIn, 'checkInId' | 'lastPing'>) => Promise<void>;
  
  // Daily Field Reports (تقارير العمل الميدانية)
  fieldReports: DailyFieldReport[];
  submitFieldReport: (reportData: Omit<DailyFieldReport, 'reportId' | 'createdAt'>) => Promise<void>;
  
  // Legacy Service Requests & RFQ
  userRequests: any[];
  saveServiceRequest: (requestData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  currentRole: 'manager',
  loading: true,
  signInWithGoogle: async () => {},
  loginAsDemo: () => {},
  switchRole: () => {},
  signOut: async () => {},
  updateProfileDetails: async () => {},
  clients: [],
  addClient: async () => {},
  workOrders: [],
  addWorkOrder: async () => {},
  updateWorkOrderStatus: async () => {},
  workerCheckIns: [],
  submitWorkerCheckIn: async () => {},
  fieldReports: [],
  submitFieldReport: async () => {},
  userRequests: [],
  saveServiceRequest: async () => {},
});

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  manager: {
    userId: 'usr-manager-demo',
    email: 'general.manager@insco-ndt.com',
    displayName: 'م. أحمد عبد الفتاح (المدير العام والتنفيذي)',
    role: 'manager',
    company: 'الشركة الدولية للخدمات والمقاولات (INSCO)',
    phone: '+20 109 077 7202',
    department: 'الإدارة العليا والتوجيه الهندسي',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  supervisor: {
    userId: 'usr-supervisor-demo',
    email: 'samir.radwan@insco-ndt.com',
    displayName: 'م. سمير رضوان (مشرف العمليات والتجهيز)',
    role: 'supervisor',
    company: 'الشركة الدولية للخدمات والمقاولات (INSCO)',
    phone: '+20 100 882 1944',
    department: 'إدارة العمليات الميدانية والـ PWHT',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  client: {
    userId: 'usr-client-demo',
    email: 'procurement@petrobel.org',
    displayName: 'م. حسام العبد (ممثل إدارة المشروعات - بتروبل)',
    role: 'client',
    company: 'شركة بترول بلاعيم (Petrobel)',
    phone: '+20 122 345 6789',
    department: 'المشتريات والعقود الهندسية',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  worker: {
    userId: 'wrk-hassan',
    email: 'hassan.abdelrahman@insco-ndt.com',
    displayName: 'حسن عبد الرحمن (كبير فنيي المعالجة الحرارية)',
    role: 'worker',
    company: 'الشركة الدولية للخدمات والمقاولات (INSCO)',
    phone: '+20 114 901 8832',
    department: 'طاقم العمليات الميدانية - وردية المواقع',
    status: 'active',
    createdAt: new Date().toISOString()
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('insco_active_role');
    return (saved as UserRole) || 'manager';
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('insco_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_PROFILES['manager'];
  });

  // State collections initialized with realistic operational data
  const [clients, setClients] = useState<ClientProfile[]>(() => {
    const saved = localStorage.getItem('insco_clients_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CLIENTS;
  });

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const saved = localStorage.getItem('insco_work_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_WORK_ORDERS;
  });

  const [workerCheckIns, setWorkerCheckIns] = useState<WorkerCheckIn[]>(() => {
    const saved = localStorage.getItem('insco_worker_tracking');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_WORKER_TRACKING;
  });

  const [fieldReports, setFieldReports] = useState<DailyFieldReport[]>(() => {
    const saved = localStorage.getItem('insco_field_reports');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_FIELD_REPORTS;
  });

  const [userRequests, setUserRequests] = useState<any[]>([]);

  // Persist local changes
  useEffect(() => {
    localStorage.setItem('insco_active_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('insco_user_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('insco_clients_data', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('insco_work_orders', JSON.stringify(workOrders));
  }, [workOrders]);

  useEffect(() => {
    localStorage.setItem('insco_worker_tracking', JSON.stringify(workerCheckIns));
  }, [workerCheckIns]);

  useEffect(() => {
    localStorage.setItem('insco_field_reports', JSON.stringify(fieldReports));
  }, [fieldReports]);

  // Firebase auth listener
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const profileData: UserProfile = {
          userId: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || 'مستخدم مسجل',
          photoUrl: currentUser.photoURL || '',
          role: currentRole,
          company: userProfile?.company || 'شركة إنسكو الدولية',
          status: 'active',
          createdAt: new Date().toISOString()
        };

        try {
          await setDoc(userRef, profileData, { merge: true });
          setUserProfile(profileData);
        } catch (err) {
          console.warn('Could not save user profile to Firestore:', err);
        }

        // Listen to service requests
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
      }
    });

    return () => unsubscribe();
  }, [currentRole]);

  const signInWithGoogle = async (role: UserRole = 'manager') => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentRole(role);
      const profile: UserProfile = {
        userId: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || 'عضو معتمد',
        photoUrl: result.user.photoURL || '',
        role: role,
        company: 'الشركة الدولية للخدمات والمقاولات (INSCO)',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setUserProfile(profile);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const loginAsDemo = (role: UserRole, customName?: string, customCompany?: string) => {
    const defaultProf = DEFAULT_PROFILES[role];
    const newProfile: UserProfile = {
      ...defaultProf,
      displayName: customName || defaultProf.displayName,
      company: customCompany || defaultProf.company,
      role: role
    };
    setCurrentRole(role);
    setUserProfile(newProfile);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const defaultProf = DEFAULT_PROFILES[role];
    setUserProfile({
      ...defaultProf,
      role
    });
  };

  const updateProfileDetails = async (details: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...details };
    setUserProfile(updated);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), details);
      } catch (e) {
        console.warn('Firestore user update skipped:', e);
      }
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      // reset to default view
      loginAsDemo('manager');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  // Add Client
  const addClient = async (clientData: Omit<ClientProfile, 'clientId' | 'createdAt'>) => {
    const newId = `cli-${Date.now().toString().slice(-5)}`;
    const newClient: ClientProfile = {
      ...clientData,
      clientId: newId,
      createdAt: new Date().toISOString()
    };

    setClients((prev) => [newClient, ...prev]);

    try {
      await setDoc(doc(db, 'clients', newId), newClient);
    } catch (e) {
      console.warn('Synced locally (Firestore sync optional/fallback):', e);
    }
  };

  // Add Work Order
  const addWorkOrder = async (orderData: Omit<WorkOrder, 'orderId' | 'createdAt'>) => {
    const newId = `WO-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: WorkOrder = {
      ...orderData,
      orderId: newId,
      createdAt: new Date().toISOString()
    };

    setWorkOrders((prev) => [newOrder, ...prev]);

    try {
      await setDoc(doc(db, 'workOrders', newId), newOrder);
    } catch (e) {
      console.warn('Work order saved locally:', e);
    }
  };

  // Update Work Order Status
  const updateWorkOrderStatus = async (orderId: string, status: WorkOrderStatus) => {
    setWorkOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );

    try {
      await updateDoc(doc(db, 'workOrders', orderId), { status });
    } catch (e) {
      console.warn('Status updated locally:', e);
    }
  };

  // Submit Worker Check-In (Location Tracking)
  const submitWorkerCheckIn = async (checkInData: Omit<WorkerCheckIn, 'checkInId' | 'lastPing'>) => {
    const newId = `chk-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const newCheckIn: WorkerCheckIn = {
      ...checkInData,
      checkInId: newId,
      lastPing: now
    };

    setWorkerCheckIns((prev) => {
      // replace if same worker exists, or prepend
      const existing = prev.filter((c) => c.workerId !== checkInData.workerId);
      return [newCheckIn, ...existing];
    });

    try {
      await setDoc(doc(db, 'workerCheckIns', newId), newCheckIn);
    } catch (e) {
      console.warn('Check-in saved locally:', e);
    }
  };

  // Submit Daily Field Report
  const submitFieldReport = async (reportData: Omit<DailyFieldReport, 'reportId' | 'createdAt'>) => {
    const newId = `REP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newReport: DailyFieldReport = {
      ...reportData,
      reportId: newId,
      createdAt: new Date().toISOString()
    };

    setFieldReports((prev) => [newReport, ...prev]);

    try {
      await setDoc(doc(db, 'fieldReports', newId), newReport);
    } catch (e) {
      console.warn('Field report saved locally:', e);
    }
  };

  // Legacy Service Request
  const saveServiceRequest = async (requestData: any) => {
    const requestId = `REQ-${Date.now().toString().slice(-6)}`;
    const payload = {
      requestId,
      userId: user?.uid || userProfile?.userId || 'guest',
      clientName: userProfile?.displayName || 'Client',
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
      if (user) {
        await setDoc(doc(db, 'serviceRequests', requestId), payload);
      }
    } catch (err) {
      console.warn('Could not save serviceRequest to Firestore:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        currentRole,
        loading,
        signInWithGoogle,
        loginAsDemo,
        switchRole,
        signOut,
        updateProfileDetails,
        clients,
        addClient,
        workOrders,
        addWorkOrder,
        updateWorkOrderStatus,
        workerCheckIns,
        submitWorkerCheckIn,
        fieldReports,
        submitFieldReport,
        userRequests,
        saveServiceRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
