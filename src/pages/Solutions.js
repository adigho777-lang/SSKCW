import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaWhatsapp, FaShoppingBag, FaHeartbeat, FaWeight, FaBolt } from 'react-icons/fa';

const Solutions = () => {
  const navigate = useNavigate();

  const problems = [
    { icon: <FaHeartbeat />, title: "BP (Blood Pressure)", color: "from-red-500 to-red-600" },
    { icon: <FaWeight />, title: "शुगर (Diabetes)", color: "from-blue-500 to-blue-600" },
    { icon: <FaBolt />, title: "थायरॉयड (Thyroid)", color: "from-purple-500 to-purple-600" },
    { icon: <FaWeight />, title: "वजन की समस्या", color: "from-green-500 to-green-600" },
    { icon: <FaBolt />, title: "कमजोरी (Weakness)", color: "from-yellow-500 to-yellow-600" },
    { icon: <FaHeartbeat />, title: "फिटनेस Goal", color: "from-pink-500 to-pink-600" }
  ];

  const openWhatsApp = () => {
    const phoneNumber = '919270295943';
    const message = 'नमस्ते, मुझे health solution के बारे में जानकारी चाहिए';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            आपकी सेहत, हमारी प्राथमिकता
          </motion.h1>

          {/* Main Hindi Content */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-12 mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-2xl md:text-4xl text-gray-800 font-semibold leading-relaxed mb-6">
              अगर आपको <span className="text-red-600">BP</span>, <span className="text-blue-600">शुगर</span>, <span className="text-purple-600">थायरॉयड</span>, <span className="text-yellow-600">कमजोरी</span>, <span className="text-green-600">वजन की समस्या</span>, या <span className="text-pink-600">फिटनेस goal</span> है...
            </p>
            <p className="text-xl md:text-3xl text-gray-700 font-medium leading-relaxed mb-8">
              तो सही solution के लिए आज ही हमसे संपर्क करें।
            </p>
            <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
              आपकी सेहत के हिसाब से सही <span className="text-primary font-bold">guidance</span> और <span className="text-primary font-bold">products</span> उपलब्ध हैं।
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={openWhatsApp}
              className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="text-3xl" />
              <span>Contact Now</span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/products')}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingBag className="text-3xl" />
              <span>View Products</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            हम इन समस्याओं का समाधान करते हैं
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${problem.color} rounded-2xl p-8 text-white text-center shadow-xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-5xl mb-4 flex justify-center">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold">{problem.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mt-20 bg-white rounded-3xl shadow-2xl p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            क्यों चुनें SSKCW?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "100% प्राकृतिक",
                desc: "शुद्ध आयुर्वेदिक उत्पाद",
                icon: "🌿"
              },
              {
                title: "विशेषज्ञ मार्गदर्शन",
                desc: "व्यक्तिगत स्वास्थ्य समाधान",
                icon: "👨‍⚕️"
              },
              {
                title: "सिद्ध परिणाम",
                desc: "हजारों संतुष्ट ग्राहक",
                icon: "⭐"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <p className="text-2xl text-gray-700 mb-6">
            अपनी सेहत को बेहतर बनाने के लिए आज ही शुरुआत करें!
          </p>
          <motion.button
            onClick={openWhatsApp}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            अभी संपर्क करें →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Solutions;
