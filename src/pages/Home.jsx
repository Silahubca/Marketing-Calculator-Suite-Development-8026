import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import CalculatorCard from '../components/CalculatorCard';
import FAQSection from '../components/FAQSection';
import { calculators } from '../data/calculators';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calculator => {
      const matchesSearch = calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           calculator.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || 
                             calculator.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const categoryCount = {};
    calculators.forEach(calc => {
      categoryCount[calc.category] = (categoryCount[calc.category] || 0) + 1;
    });
    return categoryCount;
  }, []);

  const faqData = [
    {
      question: "What is a marketing calculator?",
      answer: "A marketing calculator is a tool that helps businesses and marketers calculate important metrics like ROI, CAC, CLV, and conversion rates. These calculators provide instant, accurate results to help make data-driven marketing decisions."
    },
    {
      question: "Are these marketing calculators free to use?",
      answer: "Yes, all our marketing calculators are completely free to use. No registration, no hidden fees, no limits. Simply enter your data and get instant professional results."
    },
    {
      question: "How accurate are these marketing calculations?",
      answer: "Our calculators use industry-standard formulas and are designed by marketing professionals. They provide accurate results based on the data you input, following best practices used by top marketing agencies."
    },
    {
      question: "Can I use these calculators for my business?",
      answer: "Absolutely! These calculators are designed for businesses of all sizes, from startups to enterprises. Whether you're a solo entrepreneur or part of a large marketing team, these tools will help you make better decisions."
    },
    {
      question: "What's the difference between ROI and ROAS?",
      answer: "ROI (Return on Investment) measures the overall profitability of an investment, while ROAS (Return on Ad Spend) specifically measures revenue generated from advertising spend. ROI considers profit, while ROAS focuses on revenue."
    },
    {
      question: "How often should I calculate my marketing metrics?",
      answer: "We recommend calculating key metrics like ROI, CAC, and CLV monthly for ongoing campaigns, and quarterly for overall business performance. Real-time metrics like conversion rates should be monitored weekly or even daily."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free Marketing Calculator Hub - ROI, CAC, CLV & More | MarketingStrategyExample.com</title>
        <meta name="description" content="Free marketing calculators for ROI, CAC, CLV, conversion rates & 30+ metrics. Professional tools for marketers & business owners. Calculate marketing performance instantly." />
        <meta name="keywords" content="marketing calculator, ROI calculator, CAC calculator, CLV calculator, conversion rate calculator, marketing metrics, digital marketing tools, free marketing calculators" />
        <link rel="canonical" href="https://marketingstrategyexample.com" />
        <meta property="og:title" content="Free Marketing Calculator Hub - ROI, CAC, CLV & More" />
        <meta property="og:description" content="Free marketing calculators for ROI, CAC, CLV, conversion rates & 30+ metrics. Professional tools for marketers & business owners." />
        <meta property="og:url" content="https://marketingstrategyexample.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Marketing Calculator Hub",
            "description": "Free professional marketing calculators for ROI, CAC, CLV, conversion rates and more",
            "url": "https://marketingstrategyexample.com",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": faqData.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="mb-12 calculator-grid">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'All Categories' ? 'All Marketing Calculators' : selectedCategory}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredCalculators.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">No calculators found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators.map((calculator, index) => (
                  <CalculatorCard
                    key={calculator.id}
                    calculator={calculator}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 mb-12"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Calculator Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(categories).map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div>{category}</div>
                  <div className="text-xs opacity-75">{count} tools</div>
                </button>
              ))}
            </div>
          </motion.div>

          <FAQSection faqData={faqData} />
        </div>
      </div>
    </>
  );
};

export default Home;