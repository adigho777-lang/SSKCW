import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../services/api';
import Navbar from '../components/Navbar';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaHeartbeat, 
  FaStethoscope,
  FaUserMd,
  FaLeaf,
  FaShieldAlt,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaStar,
  FaChevronDown
} from 'react-icons/fa';

const ProductDetail = ({ onOrderClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      await fetchProduct();
    };
    loadProduct();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-300 rounded-xl h-96"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
            <p className="text-xl mb-4">⚠️ {error || 'Product not found'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images || [product.thumbnail || product.imageUrl || product.image];
  const calculateDiscount = () => {
    if (product.price && product.original_price && product.original_price > product.price) {
      return Math.round(((product.original_price - product.price) / product.original_price) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-primary hover:text-secondary mb-8 transition"
        >
          <FaArrowLeft className="mr-2" />
          <span className="font-semibold">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-[500px] object-contain bg-white p-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-contain p-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title & Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                {product.category && (
                  <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                )}
                {product.sub_category && (
                  <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {product.sub_category}
                  </span>
                )}
                {product.is_bestseller && (
                  <span className="inline-block bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Bestseller
                  </span>
                )}
                {product.is_featured && (
                  <span className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ✨ Featured
                  </span>
                )}
                {product.is_trending && (
                  <span className="inline-block bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    🔥 Trending
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              {product.short_description && (
                <p className="text-lg text-gray-600">{product.short_description}</p>
              )}
              {product.availability && (
                <p className="text-sm mt-2">
                  <span className={`font-semibold ${product.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.availability}
                  </span>
                </p>
              )}
            </motion.div>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.discount_price || product.price}
                </span>
                {product.price && product.discount_price && product.price > product.discount_price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      {product.discount_percent || calculateDiscount()}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              {product.free_shipping && (
                <p className="text-sm text-green-600 font-semibold mt-2">✓ Free Shipping</p>
              )}
            </motion.div>

            {/* Diseases Treated */}
            {product.diseases_treated && product.diseases_treated.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaStethoscope className="mr-3 text-red-500" />
                  Diseases Treated
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.diseases_treated.map((disease, i) => (
                    <span
                      key={i}
                      className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Symptoms Relief */}
            {product.symptoms_relief && product.symptoms_relief.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaHeartbeat className="mr-3 text-pink-500" />
                  Symptoms Relief
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.symptoms_relief.map((symptom, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Body Parts Affected */}
            {product.body_parts_affected && product.body_parts_affected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaUserMd className="mr-3 text-blue-500" />
                  Body Parts Affected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.body_parts_affected.map((part, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOrderClick(product)}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Order Now</span>
            </motion.button>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
              {product.free_shipping && (
                <p className="text-sm text-blue-800 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  <strong>Free Delivery</strong>
                </p>
              )}
              {product.cash_on_delivery && (
                <p className="text-sm text-blue-800 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  <strong>Cash on Delivery Available</strong>
                </p>
              )}
              {product.delivery_time && (
                <p className="text-sm text-blue-800">
                  <strong>Delivery Time:</strong> {product.delivery_time}
                </p>
              )}
              {product.return_policy && (
                <p className="text-sm text-blue-800">
                  <strong>Return Policy:</strong> {product.return_policy}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-center mt-8 mb-4"
        >
          <p className="text-gray-600 font-semibold mb-2">Scroll down for more information</p>
          <FaChevronDown className="mx-auto text-primary text-2xl animate-bounce" />
        </motion.div>

        {/* Additional Information Sections */}
        <div className="mt-12 space-y-8">
          {/* What Is It */}
          {product.what_is_it && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is It?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{product.what_is_it}</p>
            </motion.div>
          )}

          {/* Works For / Target Conditions */}
          {(product.works_for || (product.target_conditions && product.target_conditions.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Works Best For</h2>
              {product.works_for && (
                <p className="text-gray-700 mb-4 leading-relaxed">{product.works_for}</p>
              )}
              {product.target_conditions && product.target_conditions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.target_conditions.map((condition, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Benefits Array */}
          {product.benefits && product.benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Benefits</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Trigger */}
          {product.trigger && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Important Note</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{product.trigger}</p>
            </motion.div>
          )}

          {/* Description */}
          {(product.description_en || product.description) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Description</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.description_en || product.description}
              </p>
            </motion.div>
          )}

          {/* Health Benefits */}
          {product.health_benefits && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHeartbeat className="mr-3 text-red-500" />
                Health Benefits
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.health_benefits}
              </p>
            </motion.div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaLeaf className="mr-3 text-green-500" />
                Natural Ingredients
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {product.ingredients.map((ingredient, i) => (
                  <div
                    key={i}
                    className="bg-green-50 border border-green-200 rounded-lg p-3 text-center"
                  >
                    <span className="text-green-800 font-semibold">{ingredient}</span>
                  </div>
                ))}
              </div>
              {product.composition && (
                <p className="text-gray-600 mt-4 text-sm">{product.composition}</p>
              )}
            </motion.div>
          )}

          {/* Who Should Use */}
          {(product.who_should_use || product.who_should_not_use) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-500" />
                Usage Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.who_should_use && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-3">✓ Who Should Use</h3>
                    <p className="text-gray-700">{product.who_should_use}</p>
                  </div>
                )}
                {product.who_should_not_use && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-red-800 mb-3">✗ Who Should Not Use</h3>
                    <p className="text-gray-700">{product.who_should_not_use}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Precautions & Side Effects */}
          {(product.precautions || product.side_effects) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaExclamationTriangle className="mr-3 text-yellow-600" />
                Important Information
              </h2>
              {product.precautions && (
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Precautions:</h3>
                  <p className="text-gray-700">{product.precautions}</p>
                </div>
              )}
              {product.side_effects && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Side Effects:</h3>
                  <p className="text-gray-700">{product.side_effects}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* FAQ */}
          {product.faq && product.faq.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaQuestionCircle className="mr-3 text-purple-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {product.faq.map((item, i) => (
                  <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Q: {item.question}
                    </h3>
                    <p className="text-gray-700">A: {item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Customer Reviews */}
          {product.customer_reviews && product.customer_reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FaStar className="mr-3 text-yellow-500" />
                Customer Reviews
              </h2>
              <div className="space-y-6">
                {product.customer_reviews.map((review, i) => (
                  <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{review.name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar
                              key={idx}
                              className={idx < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                          {review.verified && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Product Specifications */}
          {(product.weight || product.shelf_life || product.certifications) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.weight && (
                  <div>
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">{product.weight}</span>
                  </div>
                )}
                {product.shelf_life && (
                  <div>
                    <span className="font-semibold text-gray-700">Shelf Life:</span>
                    <span className="ml-2 text-gray-600">{product.shelf_life}</span>
                  </div>
                )}
                {product.package_contents && (
                  <div>
                    <span className="font-semibold text-gray-700">Package Contents:</span>
                    <span className="ml-2 text-gray-600">{product.package_contents}</span>
                  </div>
                )}
                {product.storage_instructions && (
                  <div>
                    <span className="font-semibold text-gray-700">Storage:</span>
                    <span className="ml-2 text-gray-600">{product.storage_instructions}</span>
                  </div>
                )}
              </div>
              {product.certifications && product.certifications.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Certifications:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Marathi Description */}
          {product.description_mr && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">उत्पादन वर्णन (मराठी)</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                {product.description_mr}
              </p>
            </motion.div>
          )}

          {/* Related Products */}
          {product.related_products && product.related_products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.related_products.map((relatedId, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/product/${relatedId}`)}
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition"
                  >
                    <p className="text-sm text-blue-800 font-semibold">View Product</p>
                    <p className="text-xs text-gray-600 mt-1">{relatedId}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Analytics & Stats */}
          {(product.view_count || product.sales_count || product.wishlist_count) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Stats</h2>
              <div className="grid grid-cols-3 gap-6">
                {product.view_count && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-600">{product.view_count}</p>
                    <p className="text-gray-600 mt-2">Views</p>
                  </div>
                )}
                {product.sales_count && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{product.sales_count}</p>
                    <p className="text-gray-600 mt-2">Sales</p>
                  </div>
                )}
                {product.wishlist_count && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-pink-600">{product.wishlist_count}</p>
                    <p className="text-gray-600 mt-2">Wishlisted</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
