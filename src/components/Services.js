import React from 'react';
import { FaAppleAlt, FaDumbbell, FaPhone, FaUserMd, FaHeart } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaAppleAlt className="text-5xl text-primary" />,
      title: 'Free Diet Plan',
      description: 'Personalized nutrition plans tailored to your goals and lifestyle'
    },
    {
      icon: <FaDumbbell className="text-5xl text-primary" />,
      title: 'Free Online Workout',
      description: 'Expert-designed workout routines you can do anywhere, anytime'
    },
    {
      icon: <FaPhone className="text-5xl text-primary" />,
      title: 'Daily Call Support',
      description: 'Regular follow-ups and motivation to keep you on track'
    },
    {
      icon: <FaUserMd className="text-5xl text-primary" />,
      title: 'Personal Guidance',
      description: 'One-on-one coaching from certified fitness professionals'
    },
    {
      icon: <FaHeart className="text-5xl text-primary" />,
      title: 'Lifestyle Improvement',
      description: 'Holistic approach to transform your overall health and wellness'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Everything you need to achieve your fitness goals</p>
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
