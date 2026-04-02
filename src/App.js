import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Solutions from './pages/Solutions';
import UserLogin from './pages/UserLogin';
import UserProfile from './pages/UserProfile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Leads from './pages/admin/Leads';
import ApiSettings from './pages/admin/ApiSettings';
import WhatsAppButton from './components/WhatsAppButton';
import OrderModal from './components/OrderModal';
import ProtectedRoute from './components/ProtectedRoute';
import LanguagePopup from './components/LanguagePopup';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products" element={<Products onOrderClick={setSelectedProduct} />} />
          <Route path="/product/:id" element={<ProductDetail onOrderClick={setSelectedProduct} />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/leads" 
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/api-settings" 
            element={
              <ProtectedRoute>
                <ApiSettings />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <WhatsAppButton />
        <LanguagePopup />
        
        {/* Floating Language Switcher */}
        <div className="fixed bottom-24 right-4 z-40">
          <LanguageSwitcher />
        </div>
        
        {selectedProduct && (
          <OrderModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
