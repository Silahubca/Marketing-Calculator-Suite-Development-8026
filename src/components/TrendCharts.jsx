import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getSavedCalculations } from '../utils/storageUtils';

const { FiTrendingUp, FiTrendingDown, FiMinus, FiBarChart, FiPieChart, FiActivity } = FiIcons;

const TrendCharts = () => {
  const [trendData, setTrendData] = useState({});
  const [selectedMetric, setSelectedMetric] = useState('roi');
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    analyzeTrends();
  }, [timeRange]);

  const analyzeTrends = () => {
    const calculations = getSavedCalculations();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(timeRange));

    const filteredCalcs = calculations.filter(calc => 
      new Date(calc.timestamp) >= cutoffDate
    );

    // Group by calculator type and analyze trends
    const trends = {};
    
    filteredCalcs.forEach(calc => {
      const type = calc.calculatorId;
      if (!trends[type]) {
        trends[type] = {
          name: calc.calculatorName,
          calculations: [],
          averages: {},
          trends: {}
        };
      }
      trends[type].calculations.push(calc);
    });

    // Calculate trends and averages
    Object.keys(trends).forEach(type => {
      const calcs = trends[type].calculations.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );

      // Calculate averages for key metrics
      const metrics = {};
      calcs.forEach(calc => {
        Object.entries(calc.results).forEach(([key, value]) => {
          if (typeof value === 'number') {
            if (!metrics[key]) metrics[key] = [];
            metrics[key].push(value);
          }
        });
      });

      Object.keys(metrics).forEach(metric => {
        const values = metrics[metric];
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        trends[type].averages[metric] = average;

        // Calculate trend (compare first half vs second half)
        if (values.length >= 4) {
          const midPoint = Math.floor(values.length / 2);
          const firstHalf = values.slice(0, midPoint);
          const secondHalf = values.slice(midPoint);
          
          const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
          const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
          
          const trendPercentage = ((secondAvg - firstAvg) / firstAvg) * 100;
          trends[type].trends[metric] = {
            direction: trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'stable',
            percentage: Math.abs(trendPercentage),
            improving: trendPercentage > 0
          };
        }
      });
    });

    setTrendData(trends);
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up': return FiTrendingUp;
      case 'down': return FiTrendingDown;
      default: return FiMinus;
    }
  };

  const getTrendColor = (direction, improving) => {
    if (direction === 'stable') return 'text-gray-500';
    return improving ? 'text-green-500' : 'text-red-500';
  };

  const formatValue = (key, value) => {
    if (key.includes('percentage') || key.includes('rate') || key.includes('Rate')) {
      return `${value.toFixed(1)}%`;
    }
    if (key.includes('cost') || key.includes('revenue') || key.includes('value')) {
      return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return value.toFixed(2);
  };

  if (Object.keys(trendData).length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiBarChart} className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Trend Data Yet</h3>
        <p className="text-gray-600">
          Use calculators regularly to see trends and insights about your marketing performance.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Trend Analysis</h2>
              <p className="text-sm text-gray-500">Performance insights over time</p>
            </div>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(trendData).map(([type, data]) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiPieChart} className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{data.name}</h3>
                  <p className="text-xs text-gray-500">{data.calculations.length} calculations</p>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(data.averages).slice(0, 3).map(([metric, average]) => {
                  const trend = data.trends[metric];
                  const TrendIcon = trend ? getTrendIcon(trend.direction) : FiMinus;
                  
                  return (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {formatValue(metric, average)}
                        </span>
                        {trend && (
                          <div className="flex items-center space-x-1">
                            <SafeIcon 
                              icon={TrendIcon} 
                              className={`h-3 w-3 ${getTrendColor(trend.direction, trend.improving)}`} 
                            />
                            <span className={`text-xs ${getTrendColor(trend.direction, trend.improving)}`}>
                              {trend.percentage.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendCharts;