import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaWhatsapp, FaEnvelope, FaSave } from 'react-icons/fa';
import { createOrder } from '../services/api';
import { backupOrder, sendOrderViaEmail } from '../utils/orderBackup';
import { getCurrentUser, isUserLoggedIn } from '../utils/userHelpers';
import { useNavigate } from 'react-router-dom';

const OrderModal = ({ product, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    idNumber: '' // Optional ID field
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [backupUsed, setBackupUsed] = useState(false);

  useEffect(() => {
    // Auto-fill user data if logged in
    if (isUserLoggedIn()) {
      const user = getCurrentUser();
      setFormData({
        name: user.name,
        phone: user.phone.replace('+91', ''),
        address: '',
        idNumber: ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isUserLoggedIn()) {
      // Redirect to login
      onClose();
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setBackupUsed(false);

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      idNumber: formData.idNumber || null, // Optional
      product_id: product.id || product.product_id || product._id,
      product_title: product.title,
      quantity: 1,
      total_amount: product.price,
    };

    try {
      // Try to create order via API
      await createOrder(orderData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error placing order via API:', error);
      
      // API failed - Use backup system
      console.log('🔄 API failed, using backup system...');
      
      try {
        // Backup order using all methods
        await backupOrder(orderData);
        
        setBackupUsed(true);
        setSuccess(true);
        setError('');
        
        // Show success message for longer
        setTimeout(() => {
          onClose();
        }, 5000);
        
      } catch (backupError) {
        console.error('Backup system also failed:', backupError);
        setError('Failed to place order. Please try again or contact us directly on WhatsApp.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = () => {
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      product_id: product.id || product.product_id,
      product_title: product.title,
      quantity: 1,
      total_amount: product.price,
    };
    sendOrderViaEmail(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('orderModal.title')} {product.title}</h2>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-xl font-semibold text-gray-900">
              {backupUsed ? t('orderModal.orderReceived') : t('orderModal.orderPlaced')}
            </p>
            {backupUsed ? (
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">{t('orderModal.orderSavedVia')}</p>
                <div className="flex justify-center space-x-4 mt-3">
                  <div className="flex items-center text-green-600">
                    <FaWhatsapp className="mr-2" />
                    <span>{t('orderModal.whatsapp')}</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <FaSave className="mr-2" />
                    <span>{t('orderModal.savedLocally')}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {t('orderModal.contactSoon')}
                </p>
                <button
                  onClick={handleSendEmail}
                  className="mt-4 flex items-center justify-center mx-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaEnvelope className="mr-2" />
                  {t('orderModal.alsoSendEmail')}
                </button>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">{t('orderModal.contactSoon')}</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t('orderModal.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t('orderModal.phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t('orderModal.address')}</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t('orderModal.idNumber')}</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder={t('orderModal.idNumber')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">{t('orderModal.idNumberHelper')}</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50"
            >
              {loading ? t('orderModal.placingOrder') : t('orderModal.placeOrder')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
