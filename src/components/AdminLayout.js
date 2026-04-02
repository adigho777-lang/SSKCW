import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaBars, FaTimes, FaHome, FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, FaCog } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FaBox />, label: 'Products' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { path: '/admin/leads', icon: <FaUsers />, label: 'Leads' },
    { path: '/admin/api-settings', icon: <FaCog />, label: 'API Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition w-full text-left"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">SSKCW Admin</h1>
        </header>
        <main className="p-6 overflow-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
