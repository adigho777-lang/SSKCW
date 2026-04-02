// API Configuration with Dynamic URL Support
// Priority: localStorage > environment variable > default

const getApiBaseUrl = () => {
  // Check localStorage first (set by admin)
  const storedUrl = localStorage.getItem('api_base_url');
  if (storedUrl) {
    return storedUrl;
  }
  
  // Fallback to environment variable
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Default: Direct API URL (CORS is now enabled!)
  return 'https://sskcw-api.vercel.app/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Function to update API URL dynamically
export const setApiBaseUrl = (newUrl) => {
  localStorage.setItem('api_base_url', newUrl);
  window.location.reload(); // Reload to apply new URL
};

// Function to get current API URL
export const getCurrentApiUrl = () => {
  return localStorage.getItem('api_base_url') || process.env.REACT_APP_API_BASE_URL || 'https://sskcw-api.vercel.app/api';
};

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  
  // Leads
  LEADS: '/leads',
  
  // Test connection
  TEST: '/products',
};

// API Configuration
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};
