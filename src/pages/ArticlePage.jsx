import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialShareButtons from '../components/SocialShareButtons';

const { FiArrowLeft, FiCalendar, FiClock, FiList } = FiIcons;

const ArticlePage = ({ post }) => {
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isToggledTOC, setIsToggledTOC] = useState(false);

  useEffect(() => {
    // Generate table of contents from the post content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    
    const headings = tempDiv.querySelectorAll('h2, h3, h4');
    const tocItems = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent;
      const level = parseInt(heading.tagName.charAt(1));
      
      return {
        id,
        text,
        level,
        originalTag: heading.tagName.toLowerCase()
      };
    });
    
    setTableOfContents(tocItems);
  }, [post.content]);

  // Enhanced content with proper IDs for navigation
  const enhancedContent = React.useMemo(() => {
    let content = post.content;
    let headingIndex = 0;
    
    // Add IDs to headings for navigation
    content = content.replace(/<(h[2-4])[^>]*>/g, (match, tag) => {
      const id = `heading-${headingIndex}`;
      headingIndex++;
      return `<${tag} id="${id}">`;
    });
    
    return content;
  }, [post.content]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | MarketingStrategyExample.com</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://marketingstrategyexample.com/blog/${post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://marketingstrategyexample.com/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedDate} />
        <meta property="article:author" content="MarketingStrategyExample.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Organization",
              "name": "MarketingStrategyExample.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MarketingStrategyExample.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://marketingstrategyexample.com/calculator-icon.svg"
              }
            },
            "datePublished": post.publishedDate,
            "dateModified": post.publishedDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://marketingstrategyexample.com/blog/${post.id}`
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
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              <SafeIcon icon={FiArrowLeft} className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <SafeIcon icon={post.icon} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <SocialShareButtons 
                    title={post.title}
                    description={post.excerpt}
                    className="hidden md:flex"
                  />
                </div>

                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiClock} className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <SocialShareButtons 
                      title={post.title}
                      description={post.excerpt}
                      className="md:hidden"
                    />
                  </div>
                </div>

                {/* Enhanced Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="bg-blue-50 rounded-xl p-6 mb-10 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                        <SafeIcon icon={FiList} className="h-5 w-5 mr-2" />
                        Table of Contents
                      </h3>
                      <button
                        onClick={() => setIsToggledTOC(!isToggledTOC)}
                        className="md:hidden text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {isToggledTOC ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    <div className={`space-y-3 ${isToggledTOC ? 'block' : 'hidden md:block'}`}>
                      {tableOfContents.map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors ${
                            item.level === 2 ? 'font-semibold text-base' : 
                            item.level === 3 ? 'font-medium text-sm ml-4' : 
                            'text-sm ml-8'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="flex items-start">
                            <span className="mr-2 text-blue-500">
                              {item.level === 2 ? '📋' : item.level === 3 ? '📝' : '📌'}
                            </span>
                            <span className="leading-relaxed">{item.text}</span>
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-xs text-blue-700 italic">
                        Click any section to jump directly to that part of the article
                      </p>
                    </div>
                  </div>
                )}

                {/* Enhanced Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: enhancedContent }} />
                </div>

                {/* Call to Action */}
                <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Calculate Your Marketing Metrics?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Use our free professional calculators to measure your marketing performance and make data-driven decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      >
                        View All Calculators
                      </Link>
                      <Link
                        to="/blog"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      >
                        Read More Guides
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Share Again */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Found this helpful?</h4>
                      <p className="text-gray-600 text-sm">Share this guide with your marketing team</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <SocialShareButtons 
                        title={post.title}
                        description={post.excerpt}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;