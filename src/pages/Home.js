import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import OrderModal from '../components/OrderModal';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <ContactForm />
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
