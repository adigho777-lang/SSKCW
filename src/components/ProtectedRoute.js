import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { checkAdminAccess } from '../utils/authHelpers';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const hasAccess = await checkAdminAccess(user);
        setIsAuthorized(hasAccess);
      } else {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You are not authorized to access the admin panel. Please contact the administrator.
          </p>
          <button
            onClick={() => {
              auth.signOut();
              window.location.href = '/admin';
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
