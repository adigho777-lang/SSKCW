import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier 
} from 'firebase/auth';
import { auth } from '../firebase';
import { saveUserToFirestore, getUserFromFirestore } from '../services/firestore';
import { FaPhone, FaUser } from 'react-icons/fa';

const UserLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp' or 'profile'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user already logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      navigate('/');
    }

    // Initialize invisible reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved automatically
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          setError('Session expired. Please try again.');
          // Recreate verifier
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          }
        }
      });
      
      // Render the reCAPTCHA
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      }).catch((error) => {
        console.error('Error rendering reCAPTCHA:', error);
      });
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [navigate]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Format phone number
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone;
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      setConfirmationResult(confirmation);
      setStep('otp');
      setError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please enter a valid number.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
        
        // Recreate invisible reCAPTCHA
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA verified');
          }
        });
        
        window.recaptchaVerifier.render().catch((error) => {
          console.error('Error rendering reCAPTCHA:', error);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check if user exists in Firestore
      const firestoreUser = await getUserFromFirestore(user.uid);
      
      if (firestoreUser) {
        // User exists, save to localStorage and login
        localStorage.setItem('user_data', JSON.stringify(firestoreUser));
        navigate('/');
        return;
      }

      // New user, ask for name
      setStep('profile');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please try again.');
      } else {
        setError('Failed to verify OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    const user = auth.currentUser;
    const userData = {
      uid: user.uid,
      phone: user.phoneNumber,
      name: userName.trim(),
      createdAt: new Date().toISOString()
    };

    // Save to Firestore
    const saved = await saveUserToFirestore(userData);
    
    if (saved) {
      // Also save to localStorage for quick access
      localStorage.setItem('user_data', JSON.stringify(userData));
      navigate('/');
    } else {
      setError('Failed to save profile. Please try again.');
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-600">Login to place orders and track your health journey</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="9876543210"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter 10-digit mobile number
              </p>
            </div>

            <div id="recaptcha-container"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="000000"
              />
              <p className="text-sm text-gray-500 mt-1 text-center">
                OTP sent to +91{phoneNumber}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={handleBackToPhone}
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Back
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="text-center mb-4">
              <div className="text-green-500 text-5xl mb-2">✓</div>
              <p className="text-lg font-semibold text-gray-900">Phone Verified!</p>
              <p className="text-gray-600">Please enter your name to continue</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaUser className="inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105"
            >
              Continue
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
