import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { CalculationProvider } from './contexts/CalculationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CalculatorPage from './pages/CalculatorPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import { calculators } from './data/calculators';
import { blogPosts } from './data/blogPosts';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <CalculationProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Header />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blog" element={<BlogPage />} />
                {calculators.map((calculator) => (
                  <Route
                    key={calculator.id}
                    path={`/calculator/${calculator.id}`}
                    element={<CalculatorPage calculator={calculator} />}
                  />
                ))}
                {blogPosts.map((post) => (
                  <Route
                    key={post.id}
                    path={`/blog/${post.id}`}
                    element={<ArticlePage post={post} />}
                  />
                ))}
                {/* Catch all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.main>
            <Footer />
          </div>
        </Router>
      </CalculationProvider>
    </HelmetProvider>
  );
}

// Simple 404 component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;