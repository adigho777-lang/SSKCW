import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getProducts } from '../services/api';
import Navbar from '../components/Navbar';
import { FaShoppingCart, FaEye, FaSearch } from 'react-icons/fa';

const Products = ({ onOrderClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Sort filtered results same way
      const sortedFiltered = filtered.sort((a, b) => {
        const titleA = a.title || '';
        const titleB = b.title || '';
        
        const getComparablePart = (title) => {
          return title.replace(/^Riyansh\s+/i, '');
        };
        
        const partA = getComparablePart(titleA);
        const partB = getComparablePart(titleB);
        
        const startsWithNumberA = /^\d/.test(partA);
        const startsWithNumberB = /^\d/.test(partB);
        
        if (startsWithNumberA && !startsWithNumberB) return 1;
        if (!startsWithNumberA && startsWithNumberB) return -1;
        
        return partA.localeCompare(partB, 'en', { numeric: true, sensitivity: 'base' });
      });
      
      setFilteredProducts(sortedFiltered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      const productList = Array.isArray(data) ? data : data.products || [];
      
      // Sort products: A-Z first, then numbers
      const sortedProducts = productList.sort((a, b) => {
        const titleA = a.title || '';
        const titleB = b.title || '';
        
        // Extract the part after "Riyansh " for comparison
        const getComparablePart = (title) => {
          const parts = title.replace(/^Riyansh\s+/i, '');
          return parts;
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
      
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (price, originalPrice) => {
    if (price && originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
            <p className="text-xl mb-4">⚠️ {error}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('products.title')}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('products.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            {t('products.showing')} <span className="font-bold text-primary">{filteredProducts.length}</span> {t('products.productsFound')}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">{t('products.noProducts')}</p>
            <p className="text-gray-400 mt-2">{t('products.tryDifferent')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image with Badge */}
                <div className="relative overflow-hidden cursor-pointer bg-white" onClick={() => navigate(`/product/${product.id}`)}>
                  {(product.thumbnail || product.imageUrl || product.image) && (
                    <img
                      src={product.thumbnail || product.imageUrl || product.image}
                      alt={product.title}
                      className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  )}
                  
                  {/* Discount Badge */}
                  {((product.price && product.discount_price && product.price > product.discount_price) || 
                    (product.original_price && product.price && product.original_price > product.price)) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    >
                      {product.discount_percent || calculateDiscount(product.discount_price || product.price, product.price || product.original_price)}% OFF
                    </motion.div>
                  )}

                  {/* Quick View Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-300 flex items-center justify-center"
                  >
                    <motion.button
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="bg-white text-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                    >
                      <FaEye />
                      <span>{t('products.viewDetails')}</span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer group-hover:text-primary transition"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.title}
                  </h3>
                  
                  {/* Category */}
                  {product.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                      {product.category}
                    </span>
                  )}
                  
                  {/* Diseases Treated Tags */}
                  {product.diseases_treated && product.diseases_treated.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {product.diseases_treated.slice(0, 2).map((disease, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
                          >
                            {disease}
                          </span>
                        ))}
                        {product.diseases_treated.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{product.diseases_treated.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.short_description || product.description}
                  </p>
                  
                  {/* Price Section - TAGADA LEVEL */}
                  {(product.discount_price || product.price) && (
                    <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-primary">
                            ₹{product.discount_price || product.price}
                          </span>
                          {product.price && product.discount_price && product.price > product.discount_price && (
                            <span className="text-xl text-gray-400 line-through">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      {product.price && product.discount_price && product.price > product.discount_price && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-green-600 font-bold">
                            {t('products.save')} ₹{product.price - product.discount_price}
                          </p>
                          <p className="text-xs text-gray-500">
                            {t('products.inclusiveTax')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FaEye />
                      <span>{t('products.details')}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(product);
                      }}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FaShoppingCart />
                      <span>{t('products.order')}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
