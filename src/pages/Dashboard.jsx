import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DashboardStats from '../components/DashboardStats';
import ResultsHistory from '../components/ResultsHistory';
import TrendCharts from '../components/TrendCharts';
import IndustryBenchmarks from '../components/IndustryBenchmarks';
import GoalTracker from '../components/GoalTracker';
import PerformanceInsights from '../components/PerformanceInsights';
import SavedCalculationModal from '../components/SavedCalculationModal';
import { getSavedCalculations, clearAllCalculations } from '../utils/storageUtils';

const { FiHome, FiTrash2, FiGrid, FiList, FiHelpCircle, FiMenu, FiX, FiRefreshCw } = FiIcons;

const Dashboard = () => {
  const [selectedCalculation, setSelectedCalculation] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [calculations, setCalculations] = useState([]);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mountedRef = useRef(false);
  const lastLoadTimeRef = useRef(0);

  // Force refresh function
  const forceRefresh = useCallback(() => {
    console.log('Force refreshing dashboard...');
    setRefreshKey(prev => prev + 1);
  }, []);

  // Enhanced data loading with debugging
  const loadCalculations = useCallback(() => {
    const now = Date.now();
    
    // Prevent rapid successive calls
    if (now - lastLoadTimeRef.current < 100) {
      console.log('Skipping rapid successive load call');
      return;
    }
    
    lastLoadTimeRef.current = now;
    
    console.log('Loading calculations - Start');
    setIsLoading(true);
    setError(null);
    
    try {
      // Immediate load attempt
      const savedCalculations = getSavedCalculations();
      console.log('Calculations loaded:', savedCalculations.length, savedCalculations);
      
      if (mountedRef.current) {
        setCalculations([...savedCalculations]);
        setIsLoading(false);
        console.log('State updated with calculations');
      }
    } catch (loadError) {
      console.error('Error loading calculations:', loadError);
      if (mountedRef.current) {
        setError('Failed to load calculations');
        setCalculations([]);
        setIsLoading(false);
      }
    }
  }, []);

  // Mount tracking
  useEffect(() => {
    mountedRef.current = true;
    console.log('Dashboard mounted');
    
    return () => {
      mountedRef.current = false;
      console.log('Dashboard unmounted');
    };
  }, []);

  // Initial load
  useEffect(() => {
    console.log('Dashboard initial effect triggered');
    loadCalculations();
  }, [loadCalculations]);

  // Refresh on key change
  useEffect(() => {
    if (refreshKey > 0) {
      console.log('Refresh key changed:', refreshKey);
      loadCalculations();
    }
  }, [refreshKey, loadCalculations]);

  // Window focus handler
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, refreshing data...');
      if (mountedRef.current) {
        loadCalculations();
      }
    };
    
    const handleStorageChange = (e) => {
      console.log('Storage changed:', e.key);
      if (e.key === 'marketing_calculations' && mountedRef.current) {
        loadCalculations();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && mountedRef.current) {
        console.log('Page became visible, refreshing...');
        setTimeout(loadCalculations, 100);
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadCalculations]);

  const handleSelectCalculation = (calculation) => {
    setSelectedCalculation(calculation);
  };

  const handleLoadCalculation = (calculation) => {
    window.location.href = `/calculator/${calculation.calculatorId}?load=${calculation.id}`;
  };

  const handleClearAll = () => {
    if (showClearConfirm) {
      try {
        clearAllCalculations();
        setCalculations([]);
        setShowClearConfirm(false);
        forceRefresh();
      } catch (error) {
        console.error('Error clearing calculations:', error);
        setError('Failed to clear calculations');
      }
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 5000);
    }
  };

  const handleManualRefresh = () => {
    console.log('Manual refresh triggered');
    forceRefresh();
  };

  // Debug info
  console.log('Dashboard render:', {
    isLoading,
    calculationsCount: calculations.length,
    error,
    refreshKey,
    mounted: mountedRef.current
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <SafeIcon icon={FiGrid} className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Dashboard...</h3>
          <p className="text-gray-600">Getting your analytics ready</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiGrid} className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadCalculations}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Marketing Calculator Hub | MarketingStrategyExample.com</title>
        <meta name="description" content="Advanced marketing dashboard with trend analysis, industry benchmarks, goal tracking, and AI-powered insights for data-driven marketing decisions." />
        <meta name="keywords" content="marketing dashboard, analytics, trend analysis, industry benchmarks, goal tracking, marketing insights" />
        <link rel="canonical" href="https://marketingstrategyexample.com/dashboard" />
      </Helmet>

      <div className="min-h-screen py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile-Optimized Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              
              {/* Title Section */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                  Marketing Dashboard
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Advanced analytics and insights for data-driven marketing
                </p>
                {/* Debug info in development */}
                {process.env.NODE_ENV === 'development' && (
                  <p className="text-xs text-gray-400">
                    Debug: {calculations.length} calculations loaded, key: {refreshKey}
                  </p>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="h-5 w-5" />
                </button>
              </div>

              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiGrid} className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'detailed' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiList} className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={handleManualRefresh}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh data"
                >
                  <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
                </button>
                
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiHome} className="h-4 w-4" />
                  <span>Back to Calculators</span>
                </Link>
                
                {calculations.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className={`px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2 ${
                      showClearConfirm 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    <span className="hidden lg:inline">
                      {showClearConfirm ? 'Click to Confirm' : 'Clear All'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Controls Menu */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">View Mode:</span>
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      <SafeIcon icon={FiGrid} className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('detailed')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'detailed' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      <SafeIcon icon={FiList} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleManualRefresh}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
                    <span>Refresh Data</span>
                  </button>
                  
                  <Link
                    to="/"
                    className="inline-flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiHome} className="h-4 w-4" />
                    <span>Back to Calculators</span>
                  </Link>
                  
                  {calculations.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        showClearConfirm 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      <span>{showClearConfirm ? 'Click to Confirm' : 'Clear All Data'}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Dashboard Content */}
          {viewMode === 'grid' ? (
            // Grid View - Mobile Optimized
            <>
              {/* Stats Overview */}
              <div className="mb-6 md:mb-8">
                <DashboardStats key={`stats-${refreshKey}-${calculations.length}`} />
              </div>

              {/* Main Analytics - Mobile Stack */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <TrendCharts key={`trends-${refreshKey}-${calculations.length}`} />
                <PerformanceInsights key={`insights-${refreshKey}-${calculations.length}`} />
              </div>

              {/* Goals and Benchmarks - Mobile Stack */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <GoalTracker key={`goals-${refreshKey}-${calculations.length}`} />
                <IndustryBenchmarks key={`benchmarks-${refreshKey}-${calculations.length}`} />
              </div>

              {/* Calculation History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ResultsHistory 
                  key={`history-${refreshKey}-${calculations.length}`}
                  onSelectCalculation={handleSelectCalculation} 
                />
              </motion.div>
            </>
          ) : (
            // Detailed View - Mobile Optimized
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2">
                  <ResultsHistory 
                    key={`history-detailed-${refreshKey}-${calculations.length}`}
                    onSelectCalculation={handleSelectCalculation} 
                  />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <DashboardStats key={`stats-detailed-${refreshKey}-${calculations.length}`} />
                  <PerformanceInsights key={`insights-detailed-${refreshKey}-${calculations.length}`} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
                <TrendCharts key={`trends-detailed-${refreshKey}-${calculations.length}`} />
                <div className="space-y-4 md:space-y-6">
                  <GoalTracker key={`goals-detailed-${refreshKey}-${calculations.length}`} />
                  <IndustryBenchmarks key={`benchmarks-detailed-${refreshKey}-${calculations.length}`} />
                </div>
              </div>
            </div>
          )}

          {/* Mobile-Optimized Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 md:mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 md:p-8 border border-blue-200"
          >
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <SafeIcon icon={FiHelpCircle} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Dashboard Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-blue-800">
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">📊 Trend Analysis</h4>
                    <p className="text-sm">Track performance changes over time with intelligent trend detection.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">🎯 Goal Tracking</h4>
                    <p className="text-sm">Set specific targets and monitor progress toward your objectives.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">🏆 Industry Benchmarks</h4>
                    <p className="text-sm">Compare your metrics against industry standards.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">🧠 AI Insights</h4>
                    <p className="text-sm">Get automated recommendations based on your patterns.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">📈 Performance Analytics</h4>
                    <p className="text-sm">Comprehensive analysis of your marketing metrics.</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold mb-2">🔒 Privacy First</h4>
                    <p className="text-sm">All data stored locally - completely private and secure.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calculation Modal */}
      {selectedCalculation && (
        <SavedCalculationModal
          calculation={selectedCalculation}
          onClose={() => setSelectedCalculation(null)}
          onLoadCalculation={handleLoadCalculation}
        />
      )}
    </>
  );
};

export default Dashboard;