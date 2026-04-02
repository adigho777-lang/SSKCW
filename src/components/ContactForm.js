import React, { useState } from 'react';
import { createLead } from '../services/api';
import { FaQrcode, FaWhatsapp } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: 'Weight Loss'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const sendLeadViaWhatsApp = (leadData) => {
    const phoneNumber = '919270295943';
    const message = `
🎯 *NEW LEAD* 🎯

👤 *Customer Details:*
Name: ${leadData.name}
Phone: ${leadData.phone}
Goal: ${leadData.goal}

⏰ *Time:*
${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
SSKCW - Free Plan Request
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const leadData = {
      name: formData.name,
      phone: formData.phone,
      goal: formData.goal,
      source: 'website'
    };

    try {
      await createLead(leadData);
      setSuccess(true);
      setFormData({ name: '', phone: '', goal: 'Weight Loss' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting lead via API:', error);
      
      // API failed - Send via WhatsApp as backup
      console.log('🔄 API failed, sending via WhatsApp...');
      sendLeadViaWhatsApp(leadData);
      
      setSuccess(true);
      setFormData({ name: '', phone: '', goal: 'Weight Loss' });
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-xl text-gray-600">Fill the form and start your transformation journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Form</h3>
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <div className="flex items-center">
                  <FaWhatsapp className="mr-2" />
                  <span>Thank you! We'll contact you soon.</span>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Energy">Energy</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Get Free Plan'}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl shadow-lg animate-fade-in flex flex-col items-center justify-center">
            <FaQrcode className="text-8xl text-primary mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan QR Code</h3>
            <p className="text-gray-600 text-center mb-6">
              Scan this QR code to chat with us instantly on WhatsApp
            </p>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/919270295943?text=Hi,%20I%20want%20free%20plan%20and%20guidance"
                alt="WhatsApp QR Code"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Or click the WhatsApp button below</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
