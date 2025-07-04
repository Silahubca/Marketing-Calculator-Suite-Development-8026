import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiCalendar, FiCalculator, FiCopy, FiExternalLink } = FiIcons;

const SavedCalculationModal = ({ calculation, onClose, onLoadCalculation }) => {
  if (!calculation) return null;

  const formatResultValue = (key, value) => {
    if (typeof value === 'number') {
      if (key.includes('percentage') || key.includes('rate') || key.includes('Rate')) {
        return `${value.toFixed(2)}%`;
      }
      if (key.includes('cost') || key.includes('revenue') || key.includes('value') || key.includes('Revenue') || key.includes('Cost')) {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return value;
  };

  const copyToClipboard = () => {
    const text = `${calculation.calculatorName} - ${calculation.date}
    
Inputs:
${Object.entries(calculation.inputs).map(([key, value]) => `${key}: ${value}`).join('\n')}

Results:
${Object.entries(calculation.results).map(([key, value]) => `${key}: ${formatResultValue(key, value)}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    alert('Calculation copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCalculator} className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{calculation.calculatorName}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                  <span>{calculation.date}</span>
                  <span>•</span>
                  <span>{new Date(calculation.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy calculation"
              >
                <SafeIcon icon={FiCopy} className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiX} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Inputs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inputs Used</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(calculation.inputs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <div className="space-y-3">
                  {Object.entries(calculation.results).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-bold text-gray-900 text-lg">
                        {formatResultValue(key, value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Click "Load in Calculator" to use these values again
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => onLoadCalculation(calculation)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
                <span>Load in Calculator</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SavedCalculationModal;