import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiStar, FiCheck, FiMinus, FiExternalLink, FiDollarSign } = FiIcons;

const ToolComparison = ({ tools, onRemoveTool }) => {
  const comparisonCategories = [
    { key: 'pricing', label: 'Pricing', icon: FiDollarSign },
    { key: 'rating', label: 'Overall Rating', icon: FiStar },
    { key: 'features', label: 'Key Features', icon: FiCheck },
    { key: 'bestFor', label: 'Best For', icon: FiCheck },
    { key: 'pros', label: 'Pros', icon: FiCheck },
    { key: 'cons', label: 'Cons', icon: FiMinus }
  ];

  const formatPrice = (pricing) => {
    if (pricing.free && pricing.startingPrice === 0) return 'Free';
    if (pricing.free && pricing.startingPrice > 0) return `Free + $${pricing.startingPrice}/mo`;
    if (pricing.startingPrice === 0) return 'Free';
    return `$${pricing.startingPrice}/${pricing.pricingModel}`;
  };

  const renderFeatureScore = (tool, featureKey) => {
    const score = tool.features?.[featureKey];
    if (!score) return null;
    
    return (
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < score ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">{score}/10</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tool Comparison</h2>
            <p className="text-gray-600">Compare features, pricing, and ratings side by side</p>
          </div>
          <div className="text-sm text-gray-500">
            {tools.length} tools selected
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Tool Headers */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left font-medium text-gray-700 w-48">Feature</th>
              {tools.map(tool => (
                <th key={tool.id} className="p-4 text-center min-w-64">
                  <div className="flex items-center justify-between mb-2">
                    <div></div>
                    <button
                      onClick={() => onRemoveTool(tool.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from comparison"
                    >
                      <SafeIcon icon={FiX} className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-gray-600">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tool.category.replace('-', ' ')}</p>
                    
                    <a
                      href={tool.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                    >
                      <span>Visit Site</span>
                      <SafeIcon icon={FiExternalLink} className="h-3 w-3" />
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Pricing */}
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiDollarSign} className="h-4 w-4 text-green-600" />
                  <span>Pricing</span>
                </div>
              </td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4 text-center">
                  <div className="font-semibold text-gray-900 text-lg mb-1">
                    {formatPrice(tool.pricing)}
                  </div>
                  {tool.pricing.trialAvailable && (
                    <div className="text-sm text-green-600">
                      {tool.pricing.trialDuration} day trial
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Overall Rating */}
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-500" />
                  <span>Overall Rating</span>
                </div>
              </td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <SafeIcon
                          key={i}
                          icon={FiStar}
                          className={`h-4 w-4 ${
                            i < Math.floor(tool.rating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{tool.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {tool.reviewCount} reviews
                  </div>
                </td>
              ))}
            </tr>

            {/* Feature Scores */}
            {Object.keys(tools[0].features || {}).map(featureKey => (
              <tr key={featureKey} className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  <span className="capitalize">
                    {featureKey.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </td>
                {tools.map(tool => (
                  <td key={tool.id} className="p-4 text-center">
                    {renderFeatureScore(tool, featureKey)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Best For */}
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-600" />
                  <span>Best For</span>
                </div>
              </td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4">
                  <div className="space-y-1">
                    {tool.bestFor.map((item, i) => (
                      <div key={i} className="text-sm bg-gray-100 rounded-md px-2 py-1">
                        {item}
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Pros */}
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-600" />
                  <span>Pros</span>
                </div>
              </td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4">
                  <ul className="space-y-1 text-sm">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons */}
            <tr>
              <td className="p-4 font-medium text-gray-900 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMinus} className="h-4 w-4 text-red-600" />
                  <span>Cons</span>
                </div>
              </td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4">
                  <ul className="space-y-1 text-sm">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <SafeIcon icon={FiMinus} className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Ready to choose? Click "Visit Site" to get started with your preferred tool.
          </p>
          <div className="flex justify-center space-x-4">
            {tools.map(tool => (
              <a
                key={tool.id}
                href={tool.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <span>Try {tool.name}</span>
                <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolComparison;