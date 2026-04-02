import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';

// User Management
export const saveUserToFirestore = async (userData) => {
  try {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    return false;
  }
};

export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

export const updateUserInFirestore = async (uid, updates) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating user in Firestore:', error);
    return false;
  }
};

// Aliases for compatibility
export const getUserProfile = getUserFromFirestore;
export const updateUserProfile = updateUserInFirestore;

// API Settings Management
export const saveApiSettings = async (settings) => {
  try {
    const settingsRef = doc(db, 'settings', 'api');
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error saving API settings:', error);
    return false;
  }
};

export const getApiSettings = async () => {
  try {
    const settingsRef = doc(db, 'settings', 'api');
    const settingsSnap = await getDoc(settingsRef);
    return settingsSnap.exists() ? settingsSnap.data() : null;
  } catch (error) {
    console.error('Error getting API settings:', error);
    return null;
  }
};

// Orders Management
export const saveOrderToFirestore = async (orderData) => {
  try {
    const orderId = 'order_' + Date.now();
    const orderRef = doc(db, 'orders', orderId);
    await setDoc(orderRef, {
      ...orderData,
      id: orderId,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return { success: true, orderId };
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    return { success: false, error: error.message };
  }
};

export const getUserOrders = async (phone) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('phone', '==', phone));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveUserToFirestore,
  getUserFromFirestore,
  updateUserInFirestore,
  getUserProfile,
  updateUserProfile,
  saveApiSettings,
  getApiSettings,
  saveOrderToFirestore,
  getUserOrders
};
