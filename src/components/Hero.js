import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=600&fit=crop"
    },
    {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop"
    },
    {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop"
    }
  ];

  const benefits = [
    { icon: "🌿", title: t('hero.natural'), desc: t('hero.naturalDesc') },
    { icon: "✅", title: t('hero.certified'), desc: t('hero.certifiedDesc') },
    { icon: "🚚", title: t('hero.fastDelivery'), desc: t('hero.fastDeliveryDesc') },
    { icon: "💪", title: t('hero.provenResults'), desc: t('hero.provenResultsDesc') }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-16 min-h-screen overflow-hidden">
      {/* Animated Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-blue-900/80 to-purple-900/90" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <div className="w-full">
          {/* Main Hero Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-3xl text-green-100 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => navigate('/products')}
                  className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('hero.exploreProducts')}</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={scrollToContact}
                  className="bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full text-lg font-bold border-2 border-white/50 hover:bg-white/30 transition-all shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.startNow')}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3 mb-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Animated Benefits Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-5xl mb-3">{benefit.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-green-100 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Customer Transformation Section */}
          <motion.div
            className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {t('hero.whyChoose')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t('hero.expertGuidance'), desc: t('hero.expertGuidanceDesc') },
                { title: t('hero.qualityProducts'), desc: t('hero.qualityProductsDesc') },
                { title: t('hero.provenResultsTitle'), desc: t('hero.provenResultsDesc2') }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-green-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
