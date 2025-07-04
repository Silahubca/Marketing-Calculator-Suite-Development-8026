import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CalculatorForm from '../components/CalculatorForm';
import FAQSection from '../components/FAQSection';
import SocialShareButtons from '../components/SocialShareButtons';

const { FiArrowLeft, FiBookmark } = FiIcons;

const CalculatorPage = ({ calculator }) => {
  const calculatorFAQs = {
    'marketing-roi': [
      {
        question: "What is a good marketing ROI?",
        answer: "A good marketing ROI is typically 5:1 or 500%, meaning you earn $5 for every $1 spent. However, this varies by industry and campaign type. Brand awareness campaigns may have lower immediate ROI but provide long-term value."
      },
      {
        question: "How do I calculate marketing ROI?",
        answer: "Marketing ROI = (Revenue Generated - Marketing Cost) / Marketing Cost × 100. Include all marketing costs: ad spend, creative development, staff time, and tools for accurate calculation."
      },
      {
        question: "What costs should be included in marketing ROI calculation?",
        answer: "Include all marketing expenses: advertising spend, content creation, design costs, marketing software subscriptions, staff salaries, and any other resources dedicated to the campaign."
      }
    ],
    'cac': [
      {
        question: "What is Customer Acquisition Cost (CAC)?",
        answer: "CAC is the total cost of acquiring a new customer, including marketing and sales expenses. It's calculated by dividing total acquisition costs by the number of new customers acquired."
      },
      {
        question: "What's a good CAC for my business?",
        answer: "A good CAC depends on your Customer Lifetime Value (CLV). The ideal LTV:CAC ratio is 3:1 or higher. If your CLV is $300, your CAC should be $100 or less."
      },
      {
        question: "How can I reduce my CAC?",
        answer: "Reduce CAC by improving conversion rates, targeting better audiences, optimizing ad creative, focusing on high-performing channels, and implementing referral programs."
      }
    ],
    'clv': [
      {
        question: "What is Customer Lifetime Value (CLV)?",
        answer: "CLV is the total revenue a business can expect from a customer throughout their relationship. It's calculated using average purchase value, frequency, and customer lifespan."
      },
      {
        question: "How do I increase CLV?",
        answer: "Increase CLV by improving customer retention, increasing purchase frequency, upselling/cross-selling, enhancing customer experience, and building loyalty programs."
      },
      {
        question: "What's the difference between CLV and LTV?",
        answer: "CLV and LTV are the same metric - Customer Lifetime Value and Lifetime Value refer to the same calculation. Some companies use LTV as shorthand for CLV."
      }
    ]
  };

  const defaultFAQs = [
    {
      question: `How do I use the ${calculator.name}?`,
      answer: `Simply enter your data into the input fields above and click 'Calculate'. The ${calculator.name} will instantly provide accurate results based on industry-standard formulas.`
    },
    {
      question: "Is this calculator accurate?",
      answer: "Yes, our calculators use industry-standard formulas and are designed by marketing professionals. The accuracy depends on the quality of data you input."
    },
    {
      question: "Can I save my calculations?",
      answer: "Currently, calculations are not saved automatically. We recommend taking a screenshot or noting down your results for future reference."
    }
  ];

  const faqData = calculatorFAQs[calculator.id] || defaultFAQs;

  return (
    <>
      <Helmet>
        <title>{calculator.name} - Free Marketing Calculator | MarketingStrategyExample.com</title>
        <meta name="description" content={`${calculator.description} Use our free ${calculator.name} to calculate marketing metrics instantly. Professional tool for marketers and business owners.`} />
        <meta name="keywords" content={`${calculator.name}, ${calculator.category}, marketing calculator, ${calculator.name.toLowerCase()}, marketing metrics`} />
        <link rel="canonical" href={`https://marketingstrategyexample.com/calculator/${calculator.id}`} />
        <meta property="og:title" content={`${calculator.name} - Free Marketing Calculator`} />
        <meta property="og:description" content={calculator.description} />
        <meta property="og:url" content={`https://marketingstrategyexample.com/calculator/${calculator.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": calculator.name,
            "description": calculator.description,
            "url": `https://marketingstrategyexample.com/calculator/${calculator.id}`,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              <SafeIcon icon={FiArrowLeft} className="h-4 w-4" />
              <span>Back to All Calculators</span>
            </Link>

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <SafeIcon icon={calculator.icon} className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{calculator.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {calculator.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Free Professional Tool
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <SocialShareButtons 
                  title={calculator.name}
                  description={calculator.description}
                  className="hidden md:flex"
                />
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Bookmark calculator"
                >
                  <SafeIcon icon={FiBookmark} className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="md:hidden mb-4">
              <SocialShareButtons 
                title={calculator.name}
                description={calculator.description}
              />
            </div>
          </motion.div>

          <CalculatorForm calculator={calculator} />

          {calculator.tips && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Pro Tips</h3>
              <ul className="space-y-2 text-blue-800">
                {calculator.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-gray-50 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Calculator</h3>
            <p className="text-gray-600 mb-4">{calculator.longDescription || calculator.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Free tool by</span>
              <a
                href="https://marketingstrategyexample.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                MarketingStrategyExample.com
              </a>
              <span>•</span>
              <span>Created by</span>
              <a
                href="https://silahub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                SilaHub
              </a>
            </div>
          </motion.div>

          <FAQSection faqData={faqData} />
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;