import axios from 'axios';
import { getCurrentApiUrl, API_ENDPOINTS, API_CONFIG } from '../config/api.config';

// Create axios instance with dynamic base URL
const createApiClient = () => {
  return axios.create({
    baseURL: getCurrentApiUrl(),
    timeout: API_CONFIG.timeout,
    headers: API_CONFIG.headers,
  });
};

// Get current API client
const getApiClient = () => createApiClient();

// Request interceptor
const setupInterceptors = (client) => {
  client.interceptors.request.use(
    (config) => {
      // You can add auth tokens here if needed
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Handle errors globally
      console.error('API Error:', error);
      
      if (error.response) {
        // Server responded with error
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        const errorMessage = error.response.data?.error 
          || error.response.data?.message 
          || `Server error (${error.response.status})`;
        
        return Promise.reject(new Error(errorMessage));
      } else if (error.request) {
        // Request made but no response
        return Promise.reject(new Error('No response from server. Please check your connection.'));
      } else {
        // Something else happened
        return Promise.reject(new Error(error.message || 'Something went wrong'));
      }
    }
  );
  
  return client;
};

// API Service Functions

/**
 * Test API connection
 * @returns {Promise} Connection status
 */
export const testApiConnection = async () => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(API_ENDPOINTS.TEST);
    return { success: true, data: response };
  } catch (error) {
    console.error('API connection test failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all products
 * @returns {Promise} Array of products
 */
export const getProducts = async () => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(API_ENDPOINTS.PRODUCTS);
    // Normalize product data - handle both 'id' and 'product_id'
    const products = Array.isArray(response) ? response : response.products || [];
    const normalizedProducts = products.map(product => ({
      ...product,
      id: product.id || product.product_id,
      imageUrl: product.thumbnail || product.imageUrl || product.image
    }));
    
    // Sort products: A-Z first, then numbers (after "Riyansh ")
    return normalizedProducts.sort((a, b) => {
      const titleA = a.title || '';
      const titleB = b.title || '';
      
      // Extract the part after "Riyansh " for comparison
      const getComparablePart = (title) => {
        return title.replace(/^Riyansh\s+/i, '');
      };
      
      const partA = getComparablePart(titleA);
      const partB = getComparablePart(titleB);
      
      // Check if starts with number
      const startsWithNumberA = /^\d/.test(partA);
      const startsWithNumberB = /^\d/.test(partB);
      
      // If one starts with number and other doesn't, letter comes first
      if (startsWithNumberA && !startsWithNumberB) return 1;
      if (!startsWithNumberA && startsWithNumberB) return -1;
      
      // Both are letters or both are numbers, sort alphabetically/numerically
      return partA.localeCompare(partB, 'en', { numeric: true, sensitivity: 'base' });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise} Product details
 */
export const getProductById = async (id) => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
    // Normalize product data
    const product = response.product || response;
    return {
      ...product,
      id: product.id || product.product_id,
      imageUrl: product.thumbnail || product.imageUrl || product.image
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Get all orders (Admin only)
 * @returns {Promise} Array of orders
 */
export const getOrders = async () => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(API_ENDPOINTS.ORDERS);
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Create new order
 * @param {Object} orderData - Order details {name, phone, address, product_id, product_title, quantity, total_amount}
 * @returns {Promise} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const client = setupInterceptors(getApiClient());
    console.log('Creating order with data:', orderData);
    const response = await client.post(API_ENDPOINTS.ORDERS, orderData);
    console.log('Order created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error details:', error.response?.data);
    
    // Better error message
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error. Please check your internet connection or API URL in admin settings.');
    }
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Please check API URL in admin settings.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Create new lead
 * @param {Object} leadData - Lead details {name, phone, goal, source}
 * @returns {Promise} Created lead
 */
export const createLead = async (leadData) => {
  try {
    const client = setupInterceptors(getApiClient());
    console.log('Creating lead with data:', leadData);
    const response = await client.post(API_ENDPOINTS.LEADS, leadData);
    console.log('Lead created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating lead:', error);
    console.error('Error details:', error.response?.data);
    
    // Better error message
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error. Please check your internet connection or API URL in admin settings.');
    }
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Please check API URL in admin settings.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Search products
 * @param {string} query - Search query
 * @returns {Promise} Filtered products
 */
export const searchProducts = async (query) => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(`${API_ENDPOINTS.PRODUCTS}?search=${query}`);
    return response;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Filter products by category
 * @param {string} category - Category name
 * @returns {Promise} Filtered products
 */
export const filterProductsByCategory = async (category) => {
  try {
    const client = setupInterceptors(getApiClient());
    const response = await client.get(`${API_ENDPOINTS.PRODUCTS}?category=${category}`);
    return response;
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
};

export default getApiClient;
