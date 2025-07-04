import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getUserPreferences, saveUserPreferences, getSavedCalculations } from '../utils/storageUtils';

const { FiTarget, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiFlag, FiTrendingUp, FiAlertCircle } = FiIcons;

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    metric: '',
    targetValue: '',
    currentValue: '',
    deadline: '',
    calculatorId: ''
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const preferences = getUserPreferences();
    const savedGoals = preferences.goals || [];
    
    // Update current values based on recent calculations
    const calculations = getSavedCalculations();
    const updatedGoals = savedGoals.map(goal => {
      if (goal.calculatorId) {
        const recentCalcs = calculations
          .filter(calc => calc.calculatorId === goal.calculatorId)
          .slice(0, 5);
        
        if (recentCalcs.length > 0) {
          const relevantResults = recentCalcs.map(calc => calc.results[goal.metric]).filter(Boolean);
          if (relevantResults.length > 0) {
            const average = relevantResults.reduce((a, b) => a + b, 0) / relevantResults.length;
            goal.currentValue = average;
          }
        }
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  };

  const saveGoals = (updatedGoals) => {
    const preferences = getUserPreferences();
    preferences.goals = updatedGoals;
    saveUserPreferences(preferences);
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetValue) return;
    
    const goal = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: parseFloat(newGoal.currentValue) || 0
    };
    
    saveGoals([...goals, goal]);
    setNewGoal({
      name: '',
      metric: '',
      targetValue: '',
      currentValue: '',
      deadline: '',
      calculatorId: ''
    });
    setShowAddGoal(false);
  };

  const updateGoal = (goalId, updates) => {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );
    saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatValue = (value, metric) => {
    if (metric.includes('rate') || metric.includes('percentage')) {
      return `${value.toFixed(1)}%`;
    }
    if (metric.includes('cost') || metric.includes('revenue') || metric.includes('value')) {
      return `$${value.toLocaleString()}`;
    }
    return value.toFixed(2);
  };

  const availableCalculators = [
    { id: 'marketing-roi', name: 'Marketing ROI', metrics: ['roi', 'profit'] },
    { id: 'cac', name: 'Customer Acquisition Cost', metrics: ['cac'] },
    { id: 'clv', name: 'Customer Lifetime Value', metrics: ['clv', 'annualValue'] },
    { id: 'conversion-rate', name: 'Conversion Rate', metrics: ['conversionRate'] },
    { id: 'email-open-rate', name: 'Email Open Rate', metrics: ['openRate'] },
    { id: 'ctr', name: 'Click-Through Rate', metrics: ['ctr'] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Goal Tracker</h2>
              <p className="text-sm text-gray-500">Set and track your marketing performance goals</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="h-4 w-4" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiFlag} className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Goals Set</h3>
            <p className="text-gray-600 mb-4">
              Start tracking your marketing performance by setting specific, measurable goals.
            </p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4" />
              <span>Set Your First Goal</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => {
              const progress = getProgressPercentage(goal.currentValue, goal.targetValue);
              const daysLeft = getDaysUntilDeadline(goal.deadline);
              
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-medium transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{goal.name}</h3>
                      <p className="text-sm text-gray-500">
                        Target: {formatValue(goal.targetValue, goal.metric)} • 
                        Current: {formatValue(goal.currentValue, goal.metric)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {daysLeft !== null && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          daysLeft < 0 
                            ? 'bg-red-100 text-red-600' 
                            : daysLeft < 7 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-green-100 text-green-600'
                        }`}>
                          {daysLeft < 0 ? 'Overdue' : `${daysLeft} days left`}
                        </span>
                      )}
                      <button
                        onClick={() => setEditingGoal(goal)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <SafeIcon icon={FiEdit} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-2 rounded-full ${getProgressColor(progress)}`}
                      />
                    </div>
                  </div>

                  {goal.deadline && (
                    <div className="text-xs text-gray-500">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Goal Modal */}
      <AnimatePresence>
        {(showAddGoal || editingGoal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddGoal(false);
              setEditingGoal(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingGoal ? 'Edit Goal' : 'Add New Goal'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddGoal(false);
                    setEditingGoal(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                  <input
                    type="text"
                    value={editingGoal ? editingGoal.name : newGoal.name}
                    onChange={(e) => {
                      if (editingGoal) {
                        setEditingGoal({ ...editingGoal, name: e.target.value });
                      } else {
                        setNewGoal({ ...newGoal, name: e.target.value });
                      }
                    }}
                    placeholder="e.g., Increase conversion rate"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calculator</label>
                  <select
                    value={editingGoal ? editingGoal.calculatorId : newGoal.calculatorId}
                    onChange={(e) => {
                      if (editingGoal) {
                        setEditingGoal({ ...editingGoal, calculatorId: e.target.value });
                      } else {
                        setNewGoal({ ...newGoal, calculatorId: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Calculator</option>
                    {availableCalculators.map(calc => (
                      <option key={calc.id} value={calc.id}>{calc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                  <input
                    type="number"
                    value={editingGoal ? editingGoal.targetValue : newGoal.targetValue}
                    onChange={(e) => {
                      if (editingGoal) {
                        setEditingGoal({ ...editingGoal, targetValue: e.target.value });
                      } else {
                        setNewGoal({ ...newGoal, targetValue: e.target.value });
                      }
                    }}
                    placeholder="100"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
                  <input
                    type="date"
                    value={editingGoal ? editingGoal.deadline : newGoal.deadline}
                    onChange={(e) => {
                      if (editingGoal) {
                        setEditingGoal({ ...editingGoal, deadline: e.target.value });
                      } else {
                        setNewGoal({ ...newGoal, deadline: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddGoal(false);
                    setEditingGoal(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingGoal) {
                      updateGoal(editingGoal.id, editingGoal);
                      setEditingGoal(null);
                    } else {
                      addGoal();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingGoal ? 'Update Goal' : 'Add Goal'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GoalTracker;