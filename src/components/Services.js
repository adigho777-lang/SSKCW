import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaAppleAlt, FaDumbbell, FaPhone, FaUserMd, FaHeart } from 'react-icons/fa';

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <FaAppleAlt className="text-5xl text-primary" />,
      title: t('services.dietPlan'),
      description: t('services.dietPlanDesc')
    },
    {
      icon: <FaDumbbell className="text-5xl text-primary" />,
      title: t('services.onlineWorkout'),
      description: t('services.onlineWorkoutDesc')
    },
    {
      icon: <FaPhone className="text-5xl text-primary" />,
      title: t('services.callSupport'),
      description: t('services.callSupportDesc')
    },
    {
      icon: <FaUserMd className="text-5xl text-primary" />,
      title: t('services.personalGuidance'),
      description: t('services.personalGuidanceDesc')
    },
    {
      icon: <FaHeart className="text-5xl text-primary" />,
      title: t('services.lifestyleImprovement'),
      description: t('services.lifestyleImprovementDesc')
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
