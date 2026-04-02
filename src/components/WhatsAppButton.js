import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '919270295943'; // Aditya's WhatsApp number
  const message = 'Hi, I want free plan and guidance';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;
