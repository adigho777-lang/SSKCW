import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaTimes } from 'react-icons/fa';

const LanguagePopup = () => {
  const { t, i18n } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already selected language
    const hasSelectedLanguage = localStorage.getItem('lang');
    const dontShowAgain = localStorage.getItem('lang_popup_dismissed');
    
    if (!hasSelectedLanguage && !dontShowAgain) {
      // Detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      const langCode = browserLang.split('-')[0];
      
      // Show popup if browser is in Marathi or Hindi
      if (langCode === 'mr' || langCode === 'hi') {
        setTimeout(() => setShowPopup(true), 1000);
      } else {
        // For other languages, show popup anyway
        setTimeout(() => setShowPopup(true), 1000);
      }
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setShowPopup(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('lang_popup_dismissed', 'true');
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleDismiss}
          >
            {/* Popup */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes size={24} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-primary to-secondary text-white w-20 h-20 rounded-full flex items-center justify-center">
                  <FaGlobe size={40} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {t('languagePopup.title')}
              </h2>

              {/* Language Buttons */}
              <div className="space-y-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageSelect('mr')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  🇮🇳 {t('languagePopup.marathi')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageSelect('hi')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  🇮🇳 {t('languagePopup.hindi')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageSelect('en')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  🇬🇧 {t('languagePopup.english')}
                </motion.button>
              </div>

              {/* Don't show again */}
              <button
                onClick={handleDismiss}
                className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                {t('languagePopup.dontShowAgain')}
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LanguagePopup;
