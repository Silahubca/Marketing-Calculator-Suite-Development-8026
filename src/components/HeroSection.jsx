import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiUsers, FiTarget, FiBookOpen } = FiIcons;

const HeroSection = () => {
  const stats = [
    { icon: FiTrendingUp, value: '30+', label: 'Free Calculators' },
    { icon: FiUsers, value: '10K+', label: 'Happy Marketers' },
    { icon: FiTarget, value: '99%', label: 'Accuracy Rate' }
  ];

  const scrollToCalculators = () => {
    const calculatorSection = document.querySelector('.calculator-grid');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Free Marketing Calculator Hub
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Calculate ROI, CAC, CLV, conversion rates, and 30+ other essential marketing metrics with our free professional calculators. Make data-driven decisions that grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <button
            onClick={scrollToCalculators}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Calculating Now
          </button>
          
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <SafeIcon icon={FiBookOpen} className="h-5 w-5 mr-2" />
            Read Marketing Guides
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500 mb-6 font-medium">
            Trusted by marketing professionals worldwide • 100% Free Forever
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>Created by</span>
              <a 
                href="https://silahub.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                SilaHub
              </a>
            </div>
            
            <span className="hidden sm:inline text-gray-300">•</span>
            
            <div className="flex items-center gap-2">
              <span>Hosted on</span>
              <span className="text-blue-600 font-medium">
                MarketingStrategyExample.com
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;