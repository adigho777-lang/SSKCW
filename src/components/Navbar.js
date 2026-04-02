import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { getCurrentUser, isUserLoggedIn } from '../utils/userHelpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check if user is logged in
    if (isUserLoggedIn()) {
      setUser(getCurrentUser());
    }
  }, [location]);

  const scrollToSection = (id) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const goToProducts = () => {
    navigate('/products');
    setIsOpen(false);
  };

  const goToHome = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-2xl font-bold text-primary cursor-pointer hover:text-secondary transition"
            onClick={goToHome}
          >
            SSKCW
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={goToHome} className="text-gray-700 hover:text-primary transition font-medium">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary transition font-medium">Services</button>
            <button onClick={goToProducts} className="text-gray-700 hover:text-primary transition font-medium">Products</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary transition font-medium">Contact</button>
            
            {user ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition font-medium"
              >
                <FaUser className="mr-2" />
                {user.name}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition font-medium"
              >
                <FaUser className="mr-2" />
                Login
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={goToHome} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 font-medium">Home</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 font-medium">Services</button>
            <button onClick={goToProducts} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 font-medium">Products</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 font-medium">Contact</button>
            
            {user ? (
              <button
                onClick={() => navigate('/profile')}
                className="block w-full text-left px-3 py-2 bg-primary text-white hover:bg-secondary font-medium rounded"
              >
                <FaUser className="inline mr-2" />
                {user.name}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="block w-full text-left px-3 py-2 bg-primary text-white hover:bg-secondary font-medium rounded"
              >
                <FaUser className="inline mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
