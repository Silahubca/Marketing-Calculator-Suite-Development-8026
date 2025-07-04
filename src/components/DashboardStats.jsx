import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCalculations } from '../contexts/CalculationContext';

const { FiTrendingUp, FiCalculator, FiClock, FiTarget, FiBarChart, FiPieChart } = FiIcons;

const DashboardStats = () => {
  const { calculations } = useCalculations();
  const [stats, setStats] = useState({
    totalCalculations: 0,
    uniqueCalculators: 0,
    thisWeek: 0,
    mostUsed: null,
    recentActivity: []
  });

  useEffect(() => {
    console.log('📊 DashboardStats: Calculating stats for', calculations.length, 'calculations');
    calculateStats();
  }, [calculations]);

  const calculateStats = () => {
    try {
      // Total calculations
      const totalCalculations = calculations.length;

      // Unique calculators used
      const uniqueCalculators = new Set(calculations.map(calc => calc.calculatorId)).size;

      // Calculations this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeek = calculations.filter(calc => 
        new Date(calc.timestamp) >= oneWeekAgo
      ).length;

      // Most used calculator
      const calculatorCounts = {};
      calculations.forEach(calc => {
        calculatorCounts[calc.calculatorId] = (calculatorCounts[calc.calculatorId] || 0) + 1;
      });

      const mostUsed = Object.keys(calculatorCounts).length > 0 
        ? Object.entries(calculatorCounts).reduce((a, b) => 
            calculatorCounts[a[0]] > calculatorCounts[b[0]] ? a : b
          )
        : null;

      // Recent activity (last 5 calculations)
      const recentActivity = calculations.slice(0, 5);

      const newStats = {
        totalCalculations,
        uniqueCalculators,
        thisWeek,
        mostUsed: mostUsed ? {
          id: mostUsed[0],
          name: calculations.find(c => c.calculatorId === mostUsed[0])?.calculatorName,
          count: mostUsed[1]
        } : null,
        recentActivity
      };

      setStats(newStats);
      console.log('✅ DashboardStats: Stats calculated', newStats);
    } catch (error) {
      console.error('❌ DashboardStats: Error calculating stats:', error);
      setStats({
        totalCalculations: 0,
        uniqueCalculators: 0,
        thisWeek: 0,
        mostUsed: null,
        recentActivity: []
      });
    }
  };

  const statCards = [
    {
      icon: FiCalculator,
      label: 'Total Calculations',
      value: stats.totalCalculations,
      color: 'blue',
      description: 'All time'
    },
    {
      icon: FiTrendingUp,
      label: 'This Week',
      value: stats.thisWeek,
      color: 'green',
      description: 'Last 7 days'
    },
    {
      icon: FiTarget,
      label: 'Unique Tools',
      value: stats.uniqueCalculators,
      color: 'purple',
      description: 'Different calculators used'
    },
    {
      icon: FiBarChart,
      label: 'Most Used',
      value: stats.mostUsed?.name || 'None',
      color: 'orange',
      description: stats.mostUsed ? `${stats.mostUsed.count} times` : 'Start calculating'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-3 md:p-6 shadow-soft border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{stat.label}</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                <p className="text-xs text-gray-500 truncate">{stat.description}</p>
              </div>
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 mt-2 md:mt-0 mx-auto md:mx-0`}>
                <SafeIcon icon={stat.icon} className={`h-4 w-4 md:h-6 md:w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-4 md:p-6 shadow-soft border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={`${activity.id}-${index}`} className="flex items-center space-x-3 p-2 md:p-3 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiPieChart} className="h-2 w-2 md:h-3 md:w-3 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.calculatorName}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.date}</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardStats;