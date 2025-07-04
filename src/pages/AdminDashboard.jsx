import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useSupabaseTools } from '../hooks/useSupabaseTools';
import supabase from '../lib/supabase';

const { 
  FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiEye, FiBarChart3, 
  FiUsers, FiTool, FiStar, FiActivity, FiTrendingUp, FiFilter
} = FiIcons;

const AdminDashboard = () => {
  const { tools, categories, loading, addTool, updateTool, deleteTool, fetchTools } = useSupabaseTools();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category_id: '',
    description: '',
    long_description: '',
    website: '',
    affiliate_link: '',
    pricing: {
      free: false,
      startingPrice: 0,
      pricingModel: 'monthly',
      trialAvailable: false,
      trialDuration: 0
    },
    features: {},
    pros: [],
    cons: [],
    best_for: [],
    integrations: [],
    is_featured: false
  });

  useEffect(() => {
    fetchStats();
  }, [tools]);

  const fetchStats = async () => {
    try {
      // Get ratings count
      const { data: ratingsData } = await supabase
        .from('tool_ratings_mc847k')
        .select('id')
        .eq('is_approved', true);

      // Get clicks count for today
      const today = new Date().toISOString().split('T')[0];
      const { data: clicksData } = await supabase
        .from('tool_clicks_mc847k')
        .select('id')
        .gte('created_at', today);

      setStats({
        totalTools: tools.length,
        activeTools: tools.filter(t => t.is_active).length,
        totalRatings: ratingsData?.length || 0,
        todayClicks: clicksData?.length || 0,
        avgRating: tools.length > 0 
          ? (tools.reduce((sum, tool) => sum + (tool.rating || 0), 0) / tools.length).toFixed(1)
          : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      category_id: '',
      description: '',
      long_description: '',
      website: '',
      affiliate_link: '',
      pricing: {
        free: false,
        startingPrice: 0,
        pricingModel: 'monthly',
        trialAvailable: false,
        trialDuration: 0
      },
      features: {},
      pros: [],
      cons: [],
      best_for: [],
      integrations: [],
      is_featured: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingTool) {
        await updateTool(editingTool.id, formData);
      } else {
        await addTool(formData);
      }
      
      resetForm();
      setShowAddForm(false);
      setEditingTool(null);
    } catch (error) {
      console.error('Error saving tool:', error);
      alert('Error saving tool: ' + error.message);
    }
  };

  const handleEdit = (tool) => {
    setFormData({
      ...tool,
      pros: tool.pros || [],
      cons: tool.cons || [],
      best_for: tool.best_for || [],
      integrations: tool.integrations || [],
      features: tool.features || {},
      pricing: tool.pricing || {
        free: false,
        startingPrice: 0,
        pricingModel: 'monthly',
        trialAvailable: false,
        trialDuration: 0
      }
    });
    setEditingTool(tool);
    setShowAddForm(true);
  };

  const handleDelete = async (toolId) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        await deleteTool(toolId);
      } catch (error) {
        console.error('Error deleting tool:', error);
        alert('Error deleting tool: ' + error.message);
      }
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesFilter = filter === 'all' || tool.category_id === filter;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <SafeIcon icon={FiBarChart3} className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Marketing Tools Management</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage marketing tools and monitor performance</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTool} className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tools</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTools}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiActivity} className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Tools</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeTools}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiStar} className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUsers} className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRatings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.todayClicks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Management */}
          <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-bold text-gray-900">Manage Tools</h2>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Filter */}
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  
                  {/* Add Button */}
                  <button
                    onClick={() => {
                      resetForm();
                      setEditingTool(null);
                      setShowAddForm(true);
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="h-4 w-4" />
                    <span>Add Tool</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tools Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tool
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="font-bold text-gray-600">
                              {tool.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                            <div className="text-sm text-gray-500">{tool.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tool.category?.name || tool.category_id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {tool.rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.user_rating_count || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tool.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {tool.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(tool)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <SafeIcon icon={FiEdit} className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tool.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Edit Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingTool ? 'Edit Tool' : 'Add New Tool'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTool(null);
                        resetForm();
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <SafeIcon icon={FiX} className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tool ID
                      </label>
                      <input
                        type="text"
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={editingTool}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tool Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Affiliate Link
                      </label>
                      <input
                        type="url"
                        value={formData.affiliate_link}
                        onChange={(e) => setFormData({...formData, affiliate_link: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        required
                      />
                    </div>

                    {/* Pricing */}
                    <div className="md:col-span-2">
                      <h4 className="font-medium text-gray-900 mb-4">Pricing Information</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.pricing.free}
                              onChange={(e) => setFormData({
                                ...formData,
                                pricing: {...formData.pricing, free: e.target.checked}
                              })}
                              className="mr-2"
                            />
                            Free Version Available
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Starting Price
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.startingPrice}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: {...formData.pricing, startingPrice: parseFloat(e.target.value) || 0}
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.pricing.trialAvailable}
                              onChange={(e) => setFormData({
                                ...formData,
                                pricing: {...formData.pricing, trialAvailable: e.target.checked}
                              })}
                              className="mr-2"
                            />
                            Trial Available
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trial Duration (days)
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.trialDuration}
                            onChange={(e) => setFormData({
                              ...formData,
                              pricing: {...formData.pricing, trialDuration: parseInt(e.target.value) || 0}
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.is_featured}
                          onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                          className="mr-2"
                        />
                        Featured Tool
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <SafeIcon icon={FiSave} className="h-4 w-4" />
                      <span>{editingTool ? 'Update Tool' : 'Add Tool'}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTool(null);
                        resetForm();
                      }}
                      className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;