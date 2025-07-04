import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useSupabaseTools } from '../hooks/useSupabaseTools';

const { FiStar, FiExternalLink, FiCheck, FiPlus, FiDollarSign, FiUsers, FiAward } = FiIcons;

const ToolCard = ({ tool, index, isSelected, onSelect, canSelect }) => {
  const { trackClick } = useSupabaseTools();

  const formatPrice = (pricing) => {
    if (!pricing) return 'Contact for pricing';
    if (pricing.free && pricing.startingPrice === 0) return 'Free';
    if (pricing.free && pricing.startingPrice > 0) return `Free + $${pricing.startingPrice}/mo`;
    if (pricing.startingPrice === 0) return 'Free';
    return `$${pricing.startingPrice}/${pricing.pricingModel}`;
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      'seo': 'green',
      'ppc': 'blue',
      'social-media': 'purple',
      'email-marketing': 'orange',
      'content-marketing': 'indigo',
      'analytics': 'red',
      'conversion-optimization': 'yellow',
      'marketing-automation': 'pink'
    };
    return colors[categoryId] || 'gray';
  };

  const handleAffiliateClick = () => {
    trackClick(tool.id, 'affiliate');
  };

  const handleDetailsClick = () => {
    trackClick(tool.id, 'details');
  };

  const categoryColor = getCategoryColor(tool.category_id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-2xl shadow-soft border-2 transition-all duration-300 hover:shadow-medium group ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">
                {tool.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-800`}>
                {tool.category?.name || tool.category_id.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <button
            onClick={onSelect}
            disabled={!canSelect}
            className={`p-2 rounded-lg transition-colors ${
              isSelected 
                ? 'bg-blue-500 text-white' 
                : canSelect 
                  ? 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
          >
            <SafeIcon icon={isSelected ? FiCheck : FiPlus} className="h-4 w-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiStar}
                  className={`h-4 w-4 ${
                    i < Math.floor(tool.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-gray-900">{(tool.rating || 0).toFixed(1)}</span>
            <span className="text-sm text-gray-500">({tool.user_rating_count || 0})</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <SafeIcon icon={FiUsers} className="h-4 w-4" />
            <span>{tool.user_rating_count || 0}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiDollarSign} className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-gray-900">{formatPrice(tool.pricing)}</span>
          </div>
          
          {tool.pricing?.trialAvailable && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <SafeIcon icon={FiAward} className="h-3 w-3 mr-1" />
              {tool.pricing.trialDuration} day trial
            </span>
          )}
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Best For:</h4>
          <div className="flex flex-wrap gap-1">
            {(tool.best_for || []).slice(0, 2).map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              >
                {feature}
              </span>
            ))}
            {(tool.best_for || []).length > 2 && (
              <span className="text-xs text-gray-500">+{tool.best_for.length - 2} more</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/tools/${tool.id}`}
            onClick={handleDetailsClick}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-center"
          >
            View Details
          </Link>
          
          <a
            href={tool.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAffiliateClick}
            className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            title="Visit website"
          >
            <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;