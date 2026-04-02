import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getCurrentApiUrl, setApiBaseUrl } from '../../config/api.config';
import { testApiConnection } from '../../services/api';
import { getApiSettings, saveApiSettings } from '../../services/firestore';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const ApiSettings = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [testStatus, setTestStatus] = useState(null);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load current API URL from Firestore or localStorage
    loadApiSettings();
  }, []);

  const loadApiSettings = async () => {
    try {
      const settings = await getApiSettings();
      if (settings && settings.apiUrl) {
        setApiUrl(settings.apiUrl);
        // Also update localStorage for immediate use
        localStorage.setItem('api_base_url', settings.apiUrl);
      } else {
        // Fallback to localStorage
        setApiUrl(getCurrentApiUrl());
      }
    } catch (error) {
      console.error('Error loading API settings:', error);
      setApiUrl(getCurrentApiUrl());
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestStatus(null);

    try {
      // Temporarily set the URL for testing
      const originalUrl = localStorage.getItem('api_base_url');
      localStorage.setItem('api_base_url', apiUrl);

      const result = await testApiConnection();
      
      // Restore original URL if test fails
      if (!result.success && originalUrl) {
        localStorage.setItem('api_base_url', originalUrl);
      }

      setTestStatus(result);
    } catch (error) {
      setTestStatus({ success: false, error: error.message });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveUrl = async () => {
    setSaving(true);
    
    try {
      // Save to both Firestore and localStorage
      await saveApiSettings({ apiUrl });
      setApiBaseUrl(apiUrl);
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving API URL:', error);
      alert('Failed to save API URL: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      // Clear from both Firestore and localStorage
      await saveApiSettings({ apiUrl: '' });
      localStorage.removeItem('api_base_url');
      window.location.reload();
    } catch (error) {
      console.error('Error resetting API settings:', error);
      localStorage.removeItem('api_base_url');
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">API Configuration</h2>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Reset to Default
          </button>
        </div>

        {/* Current API Status */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Current API URL</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800 break-all">{getCurrentApiUrl()}</code>
          </div>
        </div>

        {/* API URL Configuration */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Update API URL</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                API Base URL
              </label>
              <input
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://your-api.vercel.app/api"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter your Vercel API URL (e.g., https://your-project.vercel.app/api)
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleTestConnection}
                disabled={testing || !apiUrl}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {testing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <span>Test API Connection</span>
                )}
              </button>

              <button
                onClick={handleSaveUrl}
                disabled={saving || !apiUrl}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save API URL'}
              </button>
            </div>
          </div>

          {/* Test Result */}
          {testStatus && (
            <div className={`mt-4 p-4 rounded-lg ${testStatus.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
              <div className="flex items-center space-x-2">
                {testStatus.success ? (
                  <>
                    <FaCheck className="text-green-600" />
                    <span className="text-green-800 font-semibold">API Connected Successfully!</span>
                  </>
                ) : (
                  <>
                    <FaTimes className="text-red-600" />
                    <span className="text-red-800 font-semibold">Connection Failed</span>
                  </>
                )}
              </div>
              {testStatus.error && (
                <p className="text-sm text-red-700 mt-2">Error: {testStatus.error}</p>
              )}
              {testStatus.success && testStatus.data && (
                <p className="text-sm text-green-700 mt-2">
                  Successfully fetched {Array.isArray(testStatus.data) ? testStatus.data.length : testStatus.data.products?.length || 0} products
                </p>
              )}
            </div>
          )}
        </div>

        {/* API Endpoints Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Required API Endpoints</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm">GET</span>
              <code className="text-gray-700">/products</code>
              <span className="text-gray-500 text-sm">- Get all products</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm">GET</span>
              <code className="text-gray-700">/products/:id</code>
              <span className="text-gray-500 text-sm">- Get single product</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm">POST</span>
              <code className="text-gray-700">/orders</code>
              <span className="text-gray-500 text-sm">- Create order</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm">GET</span>
              <code className="text-gray-700">/orders</code>
              <span className="text-gray-500 text-sm">- Get all orders</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm">POST</span>
              <code className="text-gray-700">/leads</code>
              <span className="text-gray-500 text-sm">- Create lead</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">📝 Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Enter your Vercel API URL in the field above</li>
            <li>Click "Test API Connection" to verify it works</li>
            <li>If successful, click "Save API URL"</li>
            <li>The page will reload with the new API configuration</li>
            <li>All products and data will now load from your API</li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApiSettings;
