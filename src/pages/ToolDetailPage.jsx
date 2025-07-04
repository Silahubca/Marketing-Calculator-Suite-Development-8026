import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import UserRatingSystem from '../components/UserRatingSystem';
import { useSupabaseTools } from '../hooks/useSupabaseTools';
import supabase from '../lib/supabase';

const { 
  FiArrowLeft, FiStar, FiExternalLink, FiCheck, FiMinus, FiDollarSign,
  FiUsers, FiCalendar, FiAward, FiBarChart3, FiInfo, FiHeart
} = FiIcons;

const ToolDetailPage = () => {
  const { toolId } = useParams();
  const { tools, trackClick } = useSupabaseTools();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const fetchTool = async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_tools_mc847k')
          .select(`
            *,
            category:tool_categories_mc847k(*)
          `)
          .eq('id', toolId)
          .eq('is_active', true)
          .single();
        
        if (error) throw error;
        setTool(data);
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [toolId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <SafeIcon icon={FiBarChart3} className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading tool details...</h3>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <Link to="/tools" className="text-blue-600 hover:text-blue-700">
            ← Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (pricing) => {
    if (pricing.free && pricing.startingPrice === 0) return 'Free';
    if (pricing.free && pricing.startingPrice > 0) return `Free + $${pricing.startingPrice}/mo`;
    if (pricing.startingPrice === 0) return 'Free';
    return `$${pricing.startingPrice}/${pricing.pricingModel}`;
  };

  const renderFeatureScore = (score, label) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-700 font-medium">{label}</span>
      <div className="flex items-center space-x-3">
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
        <span className="text-sm font-bold text-gray-900 w-8">{score}/10</span>
      </div>
    </div>
  );

  const handleAffiliateClick = () => {
    trackClick(tool.id, 'affiliate');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'features', label: 'Features', icon: FiBarChart3 },
    { id: 'pricing', label: 'Pricing', icon: FiDollarSign },
    { id: 'reviews', label: 'Reviews', icon: FiStar }
  ];

  return (
    <>
      <Helmet>
        <title>{tool.name} Review 2024 - Features, Pricing & Comparison | MarketingStrategyExample.com</title>
        <meta name="description" content={`Detailed review of ${tool.name}: ${tool.description} Compare features, pricing, pros and cons.`} />
        <meta name="keywords" content={`${tool.name}, ${tool.category?.name}, marketing tools, review, pricing, features`} />
        <link rel="canonical" href={`https://marketingstrategyexample.com/tools/${tool.id}`} />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link 
              to="/tools" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <SafeIcon icon={FiArrowLeft} className="h-4 w-4" />
              <span>Back to Tools</span>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{tool.description}</p>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <SafeIcon
                              key={i}
                              icon={FiStar}
                              className={`h-5 w-5 ${
                                i < Math.floor(tool.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900">{(tool.rating || 0).toFixed(1)}</span>
                        <span className="text-gray-500">({tool.user_rating_count || 0} reviews)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <SafeIcon icon={FiUsers} className="h-4 w-4" />
                        <span>{tool.user_rating_count || 0} users</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                        <span>Updated {new Date(tool.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">{formatPrice(tool.pricing)}</div>
                    <div className="text-sm text-green-700">Starting Price</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{(tool.rating || 0).toFixed(1)}/5</div>
                    <div className="text-sm text-blue-700">User Rating</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {tool.pricing.trialAvailable ? `${tool.pricing.trialDuration}d` : 'No'}
                    </div>
                    <div className="text-sm text-purple-700">Free Trial</div>
                  </div>
                </div>
              </div>

              {/* CTA Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {formatPrice(tool.pricing)}
                    </div>
                    {tool.pricing.trialAvailable && (
                      <div className="text-green-600 font-medium mb-4">
                        {tool.pricing.trialDuration} Day Free Trial
                      </div>
                    )}
                  </div>

                  <a
                    href={tool.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAffiliateClick}
                    className="w-full bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 mb-4"
                  >
                    <span>Get Started</span>
                    <SafeIcon icon={FiExternalLink} className="h-5 w-5" />
                  </a>

                  <div className="text-center text-sm text-gray-600 mb-4">
                    ✓ No setup fees • ✓ Cancel anytime
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">What's Included:</h4>
                    {(tool.pros || []).slice(0, 3).map((pro, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-700">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <SafeIcon icon={tab.icon} className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pros & Cons */}
                <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Pros & Cons</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                        <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500" />
                        <span>Pros</span>
                      </h4>
                      <ul className="space-y-2">
                        {(tool.pros || []).map((pro, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                        <SafeIcon icon={FiMinus} className="h-4 w-4 text-red-500" />
                        <span>Cons</span>
                      </h4>
                      <ul className="space-y-2">
                        {(tool.cons || []).map((con, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <SafeIcon icon={FiMinus} className="h-4 w-4 text-red-500 mt-0.5" />
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Best For */}
                <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Best For</h3>
                  
                  <div className="space-y-3">
                    {(tool.best_for || []).map((item, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <SafeIcon icon={FiAward} className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {(tool.integrations || []).map((integration, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Feature Breakdown</h3>
                
                <div className="space-y-1">
                  {Object.entries(tool.features || {}).map(([key, score]) => 
                    renderFeatureScore(score, key.replace(/([A-Z])/g, ' $1').trim())
                  )}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiInfo} className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">How We Rate Features</h4>
                      <p className="text-sm text-blue-800">
                        Our feature scores are based on comprehensive testing, user feedback, and comparison 
                        with industry standards. Scores range from 1-10, with 10 being exceptional performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Pricing Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 border-2 border-gray-200 rounded-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Starting Price</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(tool.pricing)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tool.pricing.pricingModel === 'monthly' ? 'per month' : tool.pricing.pricingModel}
                    </div>
                  </div>

                  <div className="text-center p-6 border-2 border-green-200 rounded-xl bg-green-50">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Free Trial</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {tool.pricing.trialAvailable ? `${tool.pricing.trialDuration} Days` : 'No Trial'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tool.pricing.trialAvailable ? 'No credit card required' : 'Contact for demo'}
                    </div>
                  </div>

                  <div className="text-center p-6 border-2 border-purple-200 rounded-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Free Version</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {tool.pricing.free ? 'Yes' : 'No'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tool.pricing.free ? 'Limited features' : 'Paid plans only'}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href={tool.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAffiliateClick}
                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors"
                  >
                    <span>Get Started with {tool.name}</span>
                    <SafeIcon icon={FiExternalLink} className="h-5 w-5" />
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <UserRatingSystem toolId={tool.id} toolName={tool.name} />
            )}
          </motion.div>

          {/* Related Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools
                .filter(t => t.category_id === tool.category_id && t.id !== tool.id)
                .slice(0, 3)
                .map(relatedTool => (
                  <Link
                    key={relatedTool.id}
                    to={`/tools/${relatedTool.id}`}
                    className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-gray-600">
                          {relatedTool.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedTool.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiStar} className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm text-gray-600">{(relatedTool.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedTool.description}</p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ToolDetailPage;