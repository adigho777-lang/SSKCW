import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import Navbar from '../components/Navbar';
import { FaArrowLeft, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

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
                className="w-full h-96 object-cover"
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
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.original_price}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {calculateDiscount()}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {(typeof product.benefits === 'string'
                    ? product.benefits.split('\n')
                    : product.benefits
                  ).map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage Instructions */}
            {product.usage && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.usage}</p>
              </div>
            )}

            {/* Order Button */}
            <button
              onClick={() => onOrderClick(product)}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Order Now</span>
            </button>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Free Delivery:</strong> On orders above ₹500
              </p>
              <p className="text-sm text-blue-800 mt-2">
                <strong>Cash on Delivery:</strong> Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
