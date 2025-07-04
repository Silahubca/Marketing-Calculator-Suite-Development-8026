import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ToolCard from '../components/ToolCard';
import ToolComparison from '../components/ToolComparison';
import { useSupabaseTools } from '../hooks/useSupabaseTools';

const { 
  FiSearch, FiFilter, FiGrid, FiBarChart2, FiTool, 
  FiStar, FiExternalLink, FiInfo, FiTrendingUp 
} = FiIcons;

const ToolsPage = () => {
  const { tools, categories, loading } = useSupabaseTools();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price':
          return (a.pricing?.startingPrice || 0) - (b.pricing?.startingPrice || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          return (b.user_rating_count || 0) - (a.user_rating_count || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tools, searchTerm, selectedCategory, sortBy]);

  const handleToolSelect = (tool) => {
    setSelectedTools(prev => {
      const isSelected = prev.find(t => t.id === tool.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tool.id);
      } else if (prev.length < 3) {
        return [...prev, tool];
      }
      return prev;
    });
  };

  const categoryStats = useMemo(() => {
    return categories.map(category => {
      const toolsInCategory = tools.filter(tool => tool.category_id === category.id);
      const avgRating = toolsInCategory.length > 0 
        ? toolsInCategory.reduce((sum, tool) => sum + (tool.rating || 0), 0) / toolsInCategory.length 
        : 0;
      
      return {
        ...category,
        toolCount: toolsInCategory.length,
        avgRating: avgRating || 0,
        freeOptions: toolsInCategory.filter(tool => tool.pricing?.free).length
      };
    });
  }, [categories, tools]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <SafeIcon icon={FiTool} className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading tools...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Best Marketing Tools Comparison 2024 | MarketingStrategyExample.com</title>
        <meta name="description" content="Compare the best marketing tools for SEO, PPC, social media, email marketing, and more. Find the perfect tools for your business with detailed comparisons and user reviews." />
        <meta name="keywords" content="marketing tools, SEO tools, PPC tools, social media marketing, email marketing, marketing software comparison" />
        <link rel="canonical" href="https://marketingstrategyexample.com/tools" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Best Marketing Tools 2024
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Compare and find the perfect marketing tools for your business. 
              From SEO to social media, we've analyzed the top platforms to help you make informed decisions.
            </p>
            
            {/* Affiliate Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-4xl mx-auto mb-8">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiInfo} className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-1">Affiliate Disclosure</h3>
                  <p className="text-sm text-blue-800">
                    Some links on this page are affiliate links. We may earn a commission when you purchase through these links, 
                    at no additional cost to you. This helps us keep our platform free and continue providing valuable marketing resources. 
                    Our reviews and comparisons remain unbiased and based on thorough research.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiTool} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{tools.length}+</div>
              <div className="text-sm text-gray-600">Tools Reviewed</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiGrid} className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiStar} className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {tools.filter(tool => tool.pricing?.free).length}
              </div>
              <div className="text-sm text-gray-600">Free Options</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Search */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Tools
                </label>
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or feature..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Rating</option>
                  <option value="popular">Most Popular</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 p-3 rounded-lg border transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiGrid} className="h-4 w-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => setViewMode('comparison')}
                    className={`flex-1 p-3 rounded-lg border transition-colors ${
                      viewMode === 'comparison' 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiBarChart2} className="h-4 w-4 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Compare Button */}
              <div className="md:col-span-1">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  disabled={selectedTools.length < 2}
                  className={`w-full p-3 rounded-lg font-medium transition-colors ${
                    selectedTools.length >= 2
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Compare ({selectedTools.length})
                </button>
              </div>
            </div>
          </motion.div>

          {/* Category Overview */}
          {selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryStats.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all text-left group"
                  >
                    <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <SafeIcon icon={FiIcons[category.icon]} className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{category.toolCount} tools</span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiStar} className="h-3 w-3 text-yellow-500" />
                        <span>{category.avgRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' 
                  ? 'All Marketing Tools' 
                  : categories.find(c => c.id === selectedCategory)?.name
                }
              </h2>
              <span className="text-gray-500">
                {filteredAndSortedTools.length} tools found
              </span>
            </div>

            {filteredAndSortedTools.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <SafeIcon icon={FiSearch} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    index={index}
                    isSelected={selectedTools.some(t => t.id === tool.id)}
                    onSelect={() => handleToolSelect(tool)}
                    canSelect={selectedTools.length < 3 || selectedTools.some(t => t.id === tool.id)}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Comparison View */}
          {showComparison && selectedTools.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <ToolComparison 
                tools={selectedTools} 
                onRemoveTool={(toolId) => setSelectedTools(prev => prev.filter(t => t.id !== toolId))}
              />
            </motion.div>
          )}

          {/* Popular Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular This Month</h2>
              <p className="text-gray-600">The most reviewed marketing tools</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools
                .sort((a, b) => (b.user_rating_count || 0) - (a.user_rating_count || 0))
                .slice(0, 3)
                .map((tool, index) => (
                  <div key={tool.id} className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-gray-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.category?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{(tool.rating || 0).toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({tool.user_rating_count || 0})</span>
                      </div>
                      <Link
                        to={`/tools/${tool.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Admin Link (for development) */}
          <div className="text-center mt-8">
            <Link
              to="/admin"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsPage;