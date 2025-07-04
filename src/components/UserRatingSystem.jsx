import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useToolRatings } from '../hooks/useSupabaseTools';

const { FiStar, FiUser, FiMessageCircle, FiThumbsUp, FiCheck, FiX } = FiIcons;

const UserRatingSystem = ({ toolId, toolName }) => {
  const { ratings, userRating, loading, submitRating } = useToolRatings(toolId);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (selectedRating === 0) return;

    setSubmitting(true);
    try {
      await submitRating(selectedRating, reviewText);
      setShowSuccess(true);
      setShowRatingForm(false);
      setSelectedRating(0);
      setReviewText('');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: ratings.filter(r => r.rating === stars).length,
    percentage: ratings.length > 0 ? (ratings.filter(r => r.rating === stars).length / ratings.length) * 100 : 0
  }));

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">User Reviews & Ratings</h3>
          {!userRating && (
            <button
              onClick={() => setShowRatingForm(!showRatingForm)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <SafeIcon icon={FiStar} className="h-4 w-4" />
              <span>Rate This Tool</span>
            </button>
          )}
        </div>

        {/* Overall Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <div className="text-4xl font-bold text-gray-900">
                {averageRating > 0 ? averageRating.toFixed(1) : '—'}
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <SafeIcon
                      key={star}
                      icon={FiStar}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {ratings.length} review{ratings.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-8">
                  {stars}★
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border-b border-green-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Thank you! Your rating has been submitted successfully.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User's Current Rating */}
      {userRating && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiUser} className="h-5 w-5 text-blue-600" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-900 font-medium">Your Rating:</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <SafeIcon
                      key={star}
                      icon={FiStar}
                      className={`h-4 w-4 ${
                        star <= userRating.rating
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-blue-900 font-medium">
                  {userRating.rating}/5
                </span>
              </div>
              {userRating.review_text && (
                <p className="text-blue-800 text-sm mt-1">
                  "{userRating.review_text}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rating Form */}
      <AnimatePresence>
        {showRatingForm && !userRating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-200 p-6 bg-gray-50"
          >
            <form onSubmit={handleRatingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate {toolName}
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <SafeIcon
                        icon={FiStar}
                        className={`h-8 w-8 ${
                          star <= selectedRating
                            ? 'text-yellow-500'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                  {selectedRating > 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {selectedRating}/5
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review (Optional)
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this tool..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {reviewText.length}/500 characters
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={selectedRating === 0 || submitting}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedRating === 0 || submitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Rating'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRatingForm(false);
                    setSelectedRating(0);
                    setReviewText('');
                  }}
                  className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="p-6">
        {ratings.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiMessageCircle} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h4>
            <p className="text-gray-600">
              Be the first to share your experience with {toolName}!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900">Recent Reviews</h4>
            {ratings.slice(0, 5).map((rating) => (
              <div key={rating.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <SafeIcon
                            key={star}
                            icon={FiStar}
                            className={`h-4 w-4 ${
                              star <= rating.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {rating.review_text && (
                      <p className="text-gray-700 text-sm">{rating.review_text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {ratings.length > 5 && (
              <div className="text-center pt-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All {ratings.length} Reviews
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRatingSystem;