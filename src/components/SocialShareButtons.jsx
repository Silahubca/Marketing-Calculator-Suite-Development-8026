import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiMail, FiCopy } = FiIcons;

const SocialShareButtons = ({ url, title, description, className = "" }) => {
  const shareUrl = encodeURIComponent(url || window.location.href);
  const shareTitle = encodeURIComponent(title || document.title);
  const shareDescription = encodeURIComponent(description || "Check out this amazing marketing calculator!");

  const shareLinks = [
    {
      name: 'Twitter',
      icon: FiTwitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: 'hover:bg-blue-400 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-700'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-800'
    },
    {
      name: 'Email',
      icon: FiMail,
      url: `mailto:?subject=${shareTitle}&body=${shareDescription}%20${shareUrl}`,
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'bg-gray-50 text-gray-600'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || document.title,
        text: description || "Check out this marketing calculator!",
        url: window.location.href
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-500 font-medium">Share:</span>
      
      {/* Native Share Button (Mobile) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className="md:hidden p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        title="Share"
      >
        <SafeIcon icon={FiShare2} className="h-4 w-4" />
      </motion.button>

      {/* Individual Share Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-2">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-all duration-200 ${link.bgColor} ${link.color}`}
            title={`Share on ${link.name}`}
          >
            <SafeIcon icon={link.icon} className="h-4 w-4" />
          </motion.a>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200"
          title="Copy link"
        >
          <SafeIcon icon={FiCopy} className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default SocialShareButtons;