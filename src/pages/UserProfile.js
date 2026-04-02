import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Navbar from '../components/Navbar';
import { FaUser, FaPhone, FaEdit, FaSave, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa';
import { getPendingOrders } from '../utils/orderBackup';
import { getUserProfile, updateUserProfile } from '../services/firestore';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    // Load user data from Firestore or localStorage
    loadUserData();
    
    // Load pending orders
    const orders = getPendingOrders();
    setPendingOrders(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadUserData = async () => {
    const storedData = localStorage.getItem('user_data');
    if (!storedData) {
      navigate('/login');
      return;
    }

    const localData = JSON.parse(storedData);
    
    try {
      // Try to load from Firestore
      const firestoreData = await getUserProfile(localData.uid);
      if (firestoreData) {
        setUserData(firestoreData);
        setEditedName(firestoreData.name);
        // Update localStorage with latest data
        localStorage.setItem('user_data', JSON.stringify(firestoreData));
      } else {
        // Use local data if Firestore doesn't have it
        setUserData(localData);
        setEditedName(localData.name);
      }
    } catch (error) {
      console.error('Error loading user data from Firestore:', error);
      // Fallback to localStorage
      setUserData(localData);
      setEditedName(localData.name);
    }
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      alert('Name cannot be empty');
      return;
    }

    const updatedData = {
      ...userData,
      name: editedName.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      // Save to Firestore
      await updateUserProfile(userData.uid, { name: editedName.trim() });
      
      // Update localStorage
      localStorage.setItem('user_data', JSON.stringify(updatedData));
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Changes saved locally.');
      // Still update localStorage even if Firestore fails
      localStorage.setItem('user_data', JSON.stringify(updatedData));
      setUserData(updatedData);
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_data');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mr-4">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            {/* Name */}
            <div className="border-b pb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaUser className="inline mr-2" />
                Name
              </label>
              {isEditing ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(userData.name);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xl text-gray-900">{userData.name}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-primary hover:text-secondary flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="border-b pb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <p className="text-xl text-gray-900">{userData.phone}</p>
              <p className="text-sm text-gray-500 mt-1">Verified ✓</p>
            </div>

            {/* Member Since */}
            <div className="border-b pb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Member Since
              </label>
              <p className="text-xl text-gray-900">
                {new Date(userData.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaShoppingBag className="mr-3 text-primary" />
              Pending Orders ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.map((order, index) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.product_title}</h3>
                      <p className="text-sm text-gray-600 mt-1">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-600">Amount: ₹{order.total_amount}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.created_at).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Pending Sync
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              These orders will be synced automatically when the server is available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
