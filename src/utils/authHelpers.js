import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Check if user is authorized admin
export const checkAdminAccess = async (user) => {
  if (!user) return false;

  try {
    // Check by phone number
    if (user.phoneNumber) {
      const phoneDoc = await getDoc(doc(db, 'admins', user.phoneNumber));
      if (phoneDoc.exists() && phoneDoc.data().isAdmin) {
        return true;
      }
    }

    // Check by email
    if (user.email) {
      const emailDoc = await getDoc(doc(db, 'admins', user.email));
      if (emailDoc.exists() && emailDoc.data().isAdmin) {
        return true;
      }
    }

    // Check by UID
    const uidDoc = await getDoc(doc(db, 'admins', user.uid));
    if (uidDoc.exists() && uidDoc.data().isAdmin) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking admin access:', error);
    return false;
  }
};

// Get admin data
export const getAdminData = async (identifier) => {
  try {
    const adminDoc = await getDoc(doc(db, 'admins', identifier));
    if (adminDoc.exists()) {
      return adminDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting admin data:', error);
    return null;
  }
};
