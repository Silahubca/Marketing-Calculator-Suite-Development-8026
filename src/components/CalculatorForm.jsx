import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalculator, FiRefreshCw, FiInfo } = FiIcons;

const CalculatorForm = ({ calculator }) => {
  const [inputs, setInputs] = useState(() => {
    const initialInputs = {};
    calculator.inputs.forEach(input => {
      initialInputs[input.key] = '';
    });
    return initialInputs;
  });
  
  const [result, setResult] = useState(null);
  const [showFormula, setShowFormula] = useState(false);

  const handleInputChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = calculator.calculate(inputs);
      setResult(calculatedResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult({ error: 'Please check your inputs and try again.' });
    }
  };

  const handleReset = () => {
    const resetInputs = {};
    calculator.inputs.forEach(input => {
      resetInputs[input.key] = '';
    });
    setInputs(resetInputs);
    setResult(null);
  };

  const isFormValid = calculator.inputs.every(input => {
    const value = inputs[input.key];
    return value !== '' && value !== null && !isNaN(Number(value));
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{calculator.name}</h2>
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <SafeIcon icon={FiInfo} className="h-4 w-4" />
            <span>{showFormula ? 'Hide' : 'Show'} Formula</span>
          </button>
        </div>
        
        {showFormula && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
          >
            <h4 className="font-semibold text-blue-900 mb-2">Formula:</h4>
            <code className="text-sm text-blue-800 bg-blue-100 px-2 py-1 rounded font-mono">
              {calculator.formula}
            </code>
          </motion.div>
        )}
        
        <p className="text-gray-600">{calculator.description}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {calculator.inputs.map((input, index) => (
            <motion.div
              key={input.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {input.label}
                {input.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="relative">
                {input.prefix && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    {input.prefix}
                  </span>
                )}
                <input
                  type="number"
                  value={inputs[input.key]}
                  onChange={(e) => handleInputChange(input.key, e.target.value)}
                  placeholder={input.placeholder}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    input.prefix ? 'pl-8' : ''
                  } ${input.suffix ? 'pr-8' : ''}`}
                  step={input.step || 'any'}
                  min={input.min || 0}
                />
                {input.suffix && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    {input.suffix}
                  </span>
                )}
              </div>
              {input.help && (
                <p className="text-xs text-gray-500 mt-1">{input.help}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            disabled={!isFormValid}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-medium'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <SafeIcon icon={FiCalculator} className="h-5 w-5" />
            <span>Calculate</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="h-5 w-5" />
          </motion.button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl border ${
              result.error
                ? 'bg-red-50 border-red-200'
                : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
            }`}
          >
            {result.error ? (
              <div className="text-red-800">
                <h3 className="font-semibold mb-2">Error</h3>
                <p>{result.error}</p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
                <div className="space-y-3">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {typeof value === 'number' ? 
                          (key.includes('percentage') || key.includes('rate') ? 
                            `${value.toFixed(2)}%` : 
                            value.toLocaleString('en-US', { 
                              style: key.includes('cost') || key.includes('revenue') || key.includes('value') ? 'currency' : 'decimal',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                          ) : value
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CalculatorForm;