import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
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
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;