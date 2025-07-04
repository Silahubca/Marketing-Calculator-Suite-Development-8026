import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getSavedCalculations } from '../utils/storageUtils';

const { FiBrain, FiLightbulb, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiInfo } = FiIcons;

const PerformanceInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = () => {
    setLoading(true);
    const calculations = getSavedCalculations();
    
    if (calculations.length === 0) {
      setLoading(false);
      return;
    }

    const generatedInsights = [];

    // Analyze calculation frequency
    const calculationFrequency = analyzeCalculationFrequency(calculations);
    if (calculationFrequency.insight) {
      generatedInsights.push(calculationFrequency);
    }

    // Analyze performance trends
    const trendInsights = analyzeTrends(calculations);
    generatedInsights.push(...trendInsights);

    // Analyze metric correlations
    const correlationInsights = analyzeCorrelations(calculations);
    generatedInsights.push(...correlationInsights);

    // Analyze goal progress
    const goalInsights = analyzeGoalProgress(calculations);
    generatedInsights.push(...goalInsights);

    // Sort by priority (critical, warning, success, info)
    generatedInsights.sort((a, b) => {
      const priorityOrder = { critical: 0, warning: 1, success: 2, info: 3 };
      return priorityOrder[a.type] - priorityOrder[b.type];
    });

    setInsights(generatedInsights.slice(0, 8)); // Show top 8 insights
    setLoading(false);
  };

  const analyzeCalculationFrequency = (calculations) => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentCalcs = calculations.filter(calc => new Date(calc.timestamp) >= lastWeek);
    
    if (recentCalcs.length === 0) {
      return {
        type: 'warning',
        title: 'Low Activity',
        description: 'You haven\'t used any calculators in the past week.',
        recommendation: 'Regular metric tracking helps identify trends and opportunities.',
        icon: FiAlertTriangle
      };
    }

    if (recentCalcs.length >= 10) {
      return {
        type: 'success',
        title: 'High Engagement',
        description: `You've made ${recentCalcs.length} calculations this week.`,
        recommendation: 'Great job staying on top of your metrics!',
        icon: FiCheckCircle
      };
    }

    return null;
  };

  const analyzeTrends = (calculations) => {
    const insights = [];
    const calculatorGroups = {};
    
    // Group by calculator type
    calculations.forEach(calc => {
      if (!calculatorGroups[calc.calculatorId]) {
        calculatorGroups[calc.calculatorId] = [];
      }
      calculatorGroups[calc.calculatorId].push(calc);
    });

    Object.entries(calculatorGroups).forEach(([calcId, calcs]) => {
      if (calcs.length < 3) return; // Need at least 3 data points

      const sortedCalcs = calcs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const recentCalcs = sortedCalcs.slice(-5); // Last 5 calculations

      Object.keys(recentCalcs[0].results).forEach(metric => {
        const values = recentCalcs.map(calc => calc.results[metric]).filter(v => typeof v === 'number');
        
        if (values.length >= 3) {
          const trend = calculateTrend(values);
          
          if (Math.abs(trend.slope) > 0.1) { // Significant trend
            const isImproving = isMetricImproving(metric, trend.slope > 0);
            
            insights.push({
              type: isImproving ? 'success' : 'warning',
              title: `${metric.replace(/([A-Z])/g, ' $1').trim()} Trend`,
              description: `${trend.slope > 0 ? 'Increasing' : 'Decreasing'} by ${Math.abs(trend.percentage).toFixed(1)}%`,
              recommendation: isImproving 
                ? 'Keep up the great work on this metric!' 
                : 'Consider reviewing your strategy for this metric.',
              icon: trend.slope > 0 ? FiTrendingUp : FiAlertTriangle
            });
          }
        }
      });
    });

    return insights.slice(0, 3); // Return top 3 trend insights
  };

  const analyzeCorrelations = (calculations) => {
    const insights = [];
    
    // Simple correlation analysis between CAC and CLV
    const cacCalcs = calculations.filter(calc => calc.calculatorId === 'cac');
    const clvCalcs = calculations.filter(calc => calc.calculatorId === 'clv');
    
    if (cacCalcs.length > 0 && clvCalcs.length > 0) {
      const avgCAC = cacCalcs.reduce((sum, calc) => sum + calc.results.cac, 0) / cacCalcs.length;
      const avgCLV = clvCalcs.reduce((sum, calc) => sum + calc.results.clv, 0) / clvCalcs.length;
      const ratio = avgCLV / avgCAC;
      
      if (ratio < 3) {
        insights.push({
          type: 'critical',
          title: 'Low LTV:CAC Ratio',
          description: `Your LTV:CAC ratio is ${ratio.toFixed(1)}:1, below the healthy 3:1 threshold.`,
          recommendation: 'Focus on increasing customer lifetime value or reducing acquisition costs.',
          icon: FiAlertTriangle
        });
      } else if (ratio > 5) {
        insights.push({
          type: 'info',
          title: 'High LTV:CAC Ratio',
          description: `Your LTV:CAC ratio is ${ratio.toFixed(1)}:1, which is excellent.`,
          recommendation: 'Consider increasing marketing spend to accelerate growth.',
          icon: FiCheckCircle
        });
      }
    }

    return insights;
  };

  const analyzeGoalProgress = (calculations) => {
    // This would integrate with the goal tracker
    // For now, return sample insights
    return [];
  };

  const calculateTrend = (values) => {
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumXX = values.reduce((sum, _, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const percentage = (slope / values[0]) * 100;
    
    return { slope, percentage };
  };

  const isMetricImproving = (metric, increasing) => {
    const goodWhenHigh = ['roi', 'clv', 'conversionRate', 'openRate', 'ctr', 'revenue'];
    const goodWhenLow = ['cac', 'cpl', 'cpc', 'churnRate', 'bounceRate'];
    
    if (goodWhenHigh.some(m => metric.toLowerCase().includes(m))) {
      return increasing;
    }
    if (goodWhenLow.some(m => metric.toLowerCase().includes(m))) {
      return !increasing;
    }
    return increasing; // Default assumption
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'critical': return FiAlertTriangle;
      case 'warning': return FiAlertTriangle;
      case 'success': return FiCheckCircle;
      case 'info': return FiInfo;
      default: return FiLightbulb;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
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
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBrain} className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
            <p className="text-sm text-gray-500">Automated analysis of your marketing performance</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiBrain} className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Insights Yet</h3>
            <p className="text-gray-600">
              Use calculators regularly to get personalized insights about your marketing performance.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon || getInsightIcon(insight.type);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-xl p-4 ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getInsightColor(insight.type)}`}>
                      <SafeIcon icon={Icon} className={`h-4 w-4 ${getIconColor(insight.type)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <p className="text-xs text-gray-500">{insight.recommendation}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiLightbulb} className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-900 mb-1">How AI Insights Work</h3>
              <p className="text-xs text-purple-800">
                Our AI analyzes your calculation patterns, identifies trends, and provides actionable 
                recommendations to improve your marketing performance. The more you use our calculators, 
                the better insights you'll receive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceInsights;