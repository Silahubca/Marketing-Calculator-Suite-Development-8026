import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiAward, FiTrendingUp, FiInfo, FiChevronDown, FiChevronUp } = FiIcons;

const IndustryBenchmarks = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
  const [expandedMetric, setExpandedMetric] = useState(null);

  const industryBenchmarks = {
    saas: {
      name: 'SaaS',
      metrics: {
        'Customer Acquisition Cost': {
          excellent: '< $100',
          good: '$100 - $300',
          average: '$300 - $500',
          poor: '> $500',
          description: 'Cost to acquire a new customer',
          tips: ['Focus on content marketing', 'Optimize conversion funnels', 'Implement referral programs']
        },
        'Customer Lifetime Value': {
          excellent: '> $3,000',
          good: '$1,000 - $3,000',
          average: '$500 - $1,000',
          poor: '< $500',
          description: 'Total value of a customer over their lifetime',
          tips: ['Reduce churn rate', 'Increase pricing', 'Expand product offerings']
        },
        'LTV:CAC Ratio': {
          excellent: '> 5:1',
          good: '3:1 - 5:1',
          average: '2:1 - 3:1',
          poor: '< 2:1',
          description: 'Ratio of lifetime value to acquisition cost',
          tips: ['Increase customer retention', 'Optimize acquisition channels', 'Improve product value']
        },
        'Monthly Churn Rate': {
          excellent: '< 2%',
          good: '2% - 5%',
          average: '5% - 10%',
          poor: '> 10%',
          description: 'Percentage of customers lost per month',
          tips: ['Improve onboarding', 'Enhance customer support', 'Regular feature updates']
        }
      }
    },
    ecommerce: {
      name: 'E-commerce',
      metrics: {
        'Conversion Rate': {
          excellent: '> 5%',
          good: '3% - 5%',
          average: '1% - 3%',
          poor: '< 1%',
          description: 'Percentage of visitors who make a purchase',
          tips: ['Optimize product pages', 'Improve checkout process', 'Add customer reviews']
        },
        'Average Order Value': {
          excellent: '> $150',
          good: '$75 - $150',
          average: '$35 - $75',
          poor: '< $35',
          description: 'Average amount spent per order',
          tips: ['Implement upselling', 'Create product bundles', 'Offer free shipping thresholds']
        },
        'Customer Acquisition Cost': {
          excellent: '< $25',
          good: '$25 - $75',
          average: '$75 - $150',
          poor: '> $150',
          description: 'Cost to acquire a new customer',
          tips: ['Focus on organic traffic', 'Optimize PPC campaigns', 'Leverage social media']
        },
        'Return Customer Rate': {
          excellent: '> 40%',
          good: '25% - 40%',
          average: '15% - 25%',
          poor: '< 15%',
          description: 'Percentage of customers who make repeat purchases',
          tips: ['Email marketing campaigns', 'Loyalty programs', 'Personalized recommendations']
        }
      }
    },
    b2b: {
      name: 'B2B Services',
      metrics: {
        'Lead Conversion Rate': {
          excellent: '> 15%',
          good: '10% - 15%',
          average: '5% - 10%',
          poor: '< 5%',
          description: 'Percentage of leads that become customers',
          tips: ['Improve lead qualification', 'Enhance sales process', 'Provide better demos']
        },
        'Customer Acquisition Cost': {
          excellent: '< $500',
          good: '$500 - $1,500',
          average: '$1,500 - $3,000',
          poor: '> $3,000',
          description: 'Cost to acquire a new customer',
          tips: ['Focus on referrals', 'Content marketing', 'Account-based marketing']
        },
        'Sales Cycle Length': {
          excellent: '< 30 days',
          good: '30 - 60 days',
          average: '60 - 120 days',
          poor: '> 120 days',
          description: 'Average time from lead to customer',
          tips: ['Streamline sales process', 'Provide clear ROI demonstrations', 'Address objections early']
        },
        'Customer Lifetime Value': {
          excellent: '> $50,000',
          good: '$20,000 - $50,000',
          average: '$10,000 - $20,000',
          poor: '< $10,000',
          description: 'Total value of a customer relationship',
          tips: ['Focus on retention', 'Expand service offerings', 'Increase contract values']
        }
      }
    }
  };

  const getPerformanceColor = (level) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const currentIndustry = industryBenchmarks[selectedIndustry];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Industry Benchmarks</h2>
              <p className="text-sm text-gray-500">Compare your performance to industry standards</p>
            </div>
          </div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Object.entries(industryBenchmarks).map(([key, industry]) => (
              <option key={key} value={key}>{industry.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {Object.entries(currentIndustry.metrics).map(([metric, data]) => (
            <motion.div
              key={metric}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedMetric(expandedMetric === metric ? null : metric)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiAward} className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{metric}</h3>
                      <p className="text-sm text-gray-500">{data.description}</p>
                    </div>
                  </div>
                  <SafeIcon 
                    icon={expandedMetric === metric ? FiChevronUp : FiChevronDown} 
                    className="h-5 w-5 text-gray-400" 
                  />
                </div>
              </button>

              {expandedMetric === metric && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 p-4 bg-gray-50"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {Object.entries(data).filter(([key]) => !['description', 'tips'].includes(key)).map(([level, value]) => (
                      <div key={level} className="text-center">
                        <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPerformanceColor(level)}`}>
                          {value}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{level}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <SafeIcon icon={FiInfo} className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Improvement Tips:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {data.tips.map((tip, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-blue-600">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Pro Tip</h3>
              <p className="text-green-800 text-sm">
                Use these benchmarks as guidelines, not absolute targets. Your specific business model, 
                target market, and growth stage will influence what "good" performance looks like for you. 
                Focus on consistent improvement rather than perfect numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryBenchmarks;