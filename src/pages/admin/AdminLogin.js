import React, { useState, useEffect } from 'react';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  signInWithPopup,
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { checkAdminAccess } from '../../utils/authHelpers';
import { FaGoogle, FaPhone } from 'react-icons/fa';

const AdminLogin = () => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'google'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize invisible reCAPTCHA only when on phone login method and phone step
    if (loginMethod === 'phone' && step === 'phone') {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (!window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
              size: 'invisible',
              callback: () => {
                // reCAPTCHA solved automatically
                console.log('reCAPTCHA verified');
              },
              'expired-callback': () => {
                setError('Session expired. Please try again.');
              }
            });
            
            // Render the invisible reCAPTCHA
            window.recaptchaVerifier.render().then((widgetId) => {
              window.recaptchaWidgetId = widgetId;
            }).catch((error) => {
              console.error('Error rendering reCAPTCHA:', error);
            });
          } catch (error) {
            console.error('reCAPTCHA initialization error:', error);
          }
        }
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      // Cleanup on unmount
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error('reCAPTCHA cleanup error:', error);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, [loginMethod, step]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Format phone number (ensure it starts with +)
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      setConfirmationResult(confirmation);
      setStep('otp');
      setError('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please enter with country code (e.g., +919876543210)');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      
      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: () => {},
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.');
          }
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

      // Check if user is authorized admin
      const isAdmin = await checkAdminAccess(user);
      
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        await auth.signOut();
        setError('Access Denied: You are not authorized to access the admin panel.');
        setStep('phone');
        setOtp('');
        setPhoneNumber('');
      }
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

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is authorized admin
      const isAdmin = await checkAdminAccess(user);
      
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        await auth.signOut();
        setError('Access Denied: You are not authorized to access the admin panel.');
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to login with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    // Reinitialize reCAPTCHA when going back
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (error) {
        console.error('reCAPTCHA cleanup error:', error);
      }
      window.recaptchaVerifier = null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Admin Login</h1>
        <p className="text-gray-600 text-center mb-8">SSKCW Management Panel</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login Method Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              loginMethod === 'phone'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaPhone className="inline mr-2" />
            Phone OTP
          </button>
          <button
            onClick={() => setLoginMethod('google')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              loginMethod === 'google'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaGoogle className="inline mr-2" />
            Google
          </button>
        </div>

        {loginMethod === 'phone' ? (
          <>
            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number (with country code)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+919876543210"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Example: +91 for India, +1 for USA
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
            ) : (
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
                    OTP sent to {phoneNumber}
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
          </>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600 text-center mb-4">
              Sign in with your Google account to access the admin panel
            </p>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <FaGoogle className="text-red-500" />
              <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Only authorized admins can access this panel</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
