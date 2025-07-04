import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiExternalLink } = FiIcons;

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border-t border-gray-200 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Marketing Calculator Hub
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              The ultimate collection of free professional marketing calculators designed for business owners and marketers. 
              Calculate ROI, CAC, CLV, conversion rates, and 30+ other essential marketing metrics instantly.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <SafeIcon icon={FiHeart} className="h-4 w-4 text-red-500" />
              <span>by</span>
              <a
                href="https://silahub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-1"
              >
                <span>SilaHub</span>
                <SafeIcon icon={FiExternalLink} className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Popular Calculators</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/calculator/marketing-roi" className="hover:text-blue-600">Marketing ROI Calculator</Link></li>
              <li><Link to="/calculator/cac" className="hover:text-blue-600">CAC Calculator</Link></li>
              <li><Link to="/calculator/clv" className="hover:text-blue-600">CLV Calculator</Link></li>
              <li><Link to="/calculator/conversion-rate" className="hover:text-blue-600">Conversion Rate Calculator</Link></li>
              <li><Link to="/calculator/ltv-cac-ratio" className="hover:text-blue-600">LTV:CAC Ratio Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Marketing Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/blog" className="hover:text-blue-600">Marketing Blog</Link></li>
              <li><Link to="/blog/marketing-roi-guide" className="hover:text-blue-600">ROI Guide</Link></li>
              <li><Link to="/blog/customer-acquisition-cost-guide" className="hover:text-blue-600">CAC Guide</Link></li>
              <li>
                <a
                  href="https://silahub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 inline-flex items-center space-x-1"
                >
                  <span>SilaHub Platform</span>
                  <SafeIcon icon={FiExternalLink} className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 MarketingStrategyExample.com - Free Marketing Calculator Hub. Created by <a href="https://silahub.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">SilaHub</a>. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;