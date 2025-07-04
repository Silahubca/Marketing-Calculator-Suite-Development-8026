import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCalculations } from '../contexts/CalculationContext';
import { deleteCalculation, exportCalculationsToCSV, exportCalculationsToPDF } from '../utils/storageUtils';

const { FiHistory, FiTrash2, FiDownload, FiFilter, FiCalendar, FiCalculator } = FiIcons;

const ResultsHistory = ({ onSelectCalculation, selectedCalculatorId = null }) => {
  const { calculations, forceRefresh } = useCalculations();
  const [filteredCalculations, setFilteredCalculations] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    console.log('📋 ResultsHistory: Filtering', calculations.length, 'calculations');
    filterAndSortCalculations();
  }, [calculations, filterType, sortBy, selectedCalculatorId]);

  const filterAndSortCalculations = () => {
    let filtered = [...calculations];

    // Filter by calculator type
    if (filterType !== 'all') {
      filtered = filtered.filter(calc => calc.calculatorId === filterType);
    }

    // Filter by selected calculator if provided
    if (selectedCalculatorId) {
      filtered = filtered.filter(calc => calc.calculatorId === selectedCalculatorId);
    }

    // Sort calculations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'calculator':
          return a.calculatorName.localeCompare(b.calculatorName);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

    setFilteredCalculations(filtered);
    console.log('✅ ResultsHistory: Filtered to', filtered.length, 'calculations');
  };

  const handleDeleteCalculation = (calculationId) => {
    try {
      deleteCalculation(calculationId);
      forceRefresh();
    } catch (error) {
      console.error('Error deleting calculation:', error);
    }
  };

  const handleExport = (format) => {
    if (format === 'csv') {
      exportCalculationsToCSV(filteredCalculations);
    } else if (format === 'pdf') {
      exportCalculationsToPDF(filteredCalculations);
    }
  };

  const getUniqueCalculatorTypes = () => {
    const types = [...new Set(calculations.map(calc => calc.calculatorId))];
    return types.map(type => {
      const calc = calculations.find(c => c.calculatorId === type);
      return {
        id: type,
        name: calc?.calculatorName || type
      };
    });
  };

  const formatResultValue = (key, value) => {
    if (typeof value === 'number') {
      if (key.includes('percentage') || key.includes('rate') || key.includes('Rate')) {
        return `${value.toFixed(2)}%`;
      }
      if (key.includes('cost') || key.includes('revenue') || key.includes('value') || key.includes('Revenue') || key.includes('Cost')) {
        return `$${value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
      }
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return value;
  };

  if (calculations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-gray-100 text-center"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiHistory} className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Calculations Yet</h3>
        <p className="text-gray-600 mb-4">
          Your calculation history will appear here once you start using the calculators.
        </p>
        <p className="text-sm text-gray-500">
          All calculations are saved automatically and stored locally in your browser.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiHistory} className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Calculation History</h2>
              <p className="text-sm text-gray-500">
                {filteredCalculations.length} calculation{filteredCalculations.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Filter & Sort"
            >
              <SafeIcon icon={FiFilter} className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <div className="relative">
              <select
                onChange={(e) => handleExport(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                value=""
              >
                <option value="" disabled>Export</option>
                <option value="csv">Export as CSV</option>
                <option value="pdf">Export as Text</option>
              </select>
              <SafeIcon icon={FiDownload} className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4 mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Calculators</option>
                    {getUniqueCalculatorTypes().map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="calculator">By Calculator</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calculations List */}
      <div className="max-h-96 md:max-h-[32rem] overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {filteredCalculations.map((calculation, index) => (
            <motion.div
              key={`${calculation.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-3 md:p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              onClick={() => onSelectCalculation && onSelectCalculation(calculation)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiCalculator} className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm md:text-base truncate">
                        {calculation.calculatorName}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                        <SafeIcon icon={FiCalendar} className="h-3 w-3" />
                        <span>{calculation.date}</span>
                        <span>•</span>
                        <span>{new Date(calculation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Results Preview */}
                  <div className="ml-9 md:ml-11 space-y-1">
                    {Object.entries(calculation.results).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-600 capitalize truncate mr-2">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-gray-900 whitespace-nowrap">
                          {formatResultValue(key, value)}
                        </span>
                      </div>
                    ))}
                    {Object.keys(calculation.results).length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{Object.keys(calculation.results).length - 2} more results
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCalculation(calculation.id);
                  }}
                  className="p-1 md:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete calculation"
                >
                  <SafeIcon icon={FiTrash2} className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* No Results State */}
      {filteredCalculations.length === 0 && calculations.length > 0 && (
        <div className="p-6 md:p-8 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiFilter} className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more calculations.
          </p>
          <button
            onClick={() => {
              setFilterType('all');
              setSortBy('date');
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsHistory;