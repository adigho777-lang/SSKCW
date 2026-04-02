import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

const ProductSection = ({ onOrderClick }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">Premium supplements to boost your fitness journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
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
      </section>
    );
  }

  const calculateDiscount = (price, originalPrice) => {
    if (price && originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 mb-6">Premium supplements to boost your fitness journey</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Products
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Product Image with Discount Badge */}
              <div className="relative overflow-hidden">
                {(product.thumbnail || product.imageUrl || product.image) && (
                  <img
                    src={product.thumbnail || product.imageUrl || product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                )}
                {product.original_price && product.original_price > product.price && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    {calculateDiscount(product.price, product.original_price)}% OFF
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                {/* Price Section */}
                {product.price && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-lg text-gray-400 line-through">₹{product.original_price}</span>
                      )}
                    </div>
                    {product.original_price && product.original_price > product.price && (
                      <p className="text-sm text-green-600 font-semibold mt-1">
                        You save ₹{product.original_price - product.price}
                      </p>
                    )}
                  </div>
                )}
                
                {/* Benefits Preview */}
                {product.benefits && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                      {(typeof product.benefits === 'string' 
                        ? product.benefits.split('\n').slice(0, 3) 
                        : product.benefits.slice(0, 3)
                      ).map((benefit, i) => (
                        <li key={i} className="line-clamp-1">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrderClick(product);
                    }}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {products.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              View All {products.length} Products →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
