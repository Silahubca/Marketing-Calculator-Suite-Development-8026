// Marketing Tools Database - Ready for Supabase backend integration
export const toolCategories = [
  {
    id: 'seo',
    name: 'SEO Tools',
    description: 'Search engine optimization and keyword research tools',
    icon: 'FiSearch',
    color: 'green'
  },
  {
    id: 'ppc',
    name: 'PPC & Advertising',
    description: 'Pay-per-click and advertising campaign tools',
    icon: 'FiTarget',
    color: 'blue'
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    description: 'Social media management and analytics tools',
    icon: 'FiShare2',
    color: 'purple'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Email campaign and automation tools',
    icon: 'FiMail',
    color: 'orange'
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    description: 'Content creation and optimization tools',
    icon: 'FiEdit',
    color: 'indigo'
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    description: 'Data analytics and reporting platforms',
    icon: 'FiBarChart',
    color: 'red'
  },
  {
    id: 'conversion-optimization',
    name: 'Conversion Optimization',
    description: 'CRO and landing page optimization tools',
    icon: 'FiTrendingUp',
    color: 'yellow'
  },
  {
    id: 'marketing-automation',
    name: 'Marketing Automation',
    description: 'Workflow automation and lead nurturing tools',
    icon: 'FiZap',
    color: 'pink'
  }
];

// Sample tools data - This will be managed via Supabase
export const marketingTools = [
  // SEO Tools
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    category: 'seo',
    description: 'Complete SEO toolset with backlink analysis, keyword research, and rank tracking.',
    logo: '/tool-logos/ahrefs.svg',
    website: 'https://ahrefs.com',
    affiliateLink: 'https://ahrefs.com/?ref=marketingstrategy',
    pricing: {
      free: false,
      startingPrice: 99,
      pricingModel: 'monthly',
      trialAvailable: true,
      trialDuration: 7
    },
    features: {
      keywordResearch: 10,
      backlinksAnalysis: 10,
      rankTracking: 9,
      siteAudit: 8,
      competitorAnalysis: 9,
      reporting: 8,
      easeOfUse: 7,
      customerSupport: 8
    },
    pros: [
      'Most comprehensive backlink database',
      'Excellent keyword research capabilities',
      'Advanced competitor analysis',
      'Regular database updates'
    ],
    cons: [
      'Expensive for small businesses',
      'Steep learning curve',
      'Limited social media features'
    ],
    bestFor: ['SEO Agencies', 'Enterprise Companies', 'Advanced SEO Professionals'],
    integrations: ['Google Analytics', 'Google Search Console', 'WordPress', 'Zapier'],
    rating: 4.5,
    reviewCount: 1250,
    lastUpdated: '2024-12-15'
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    category: 'seo',
    description: 'All-in-one digital marketing suite with SEO, PPC, content, and social media tools.',
    logo: '/tool-logos/semrush.svg',
    website: 'https://semrush.com',
    affiliateLink: 'https://semrush.com/?ref=marketingstrategy',
    pricing: {
      free: true,
      startingPrice: 119.95,
      pricingModel: 'monthly',
      trialAvailable: true,
      trialDuration: 14
    },
    features: {
      keywordResearch: 9,
      backlinksAnalysis: 8,
      rankTracking: 9,
      siteAudit: 9,
      competitorAnalysis: 10,
      reporting: 9,
      easeOfUse: 8,
      customerSupport: 9
    },
    pros: [
      'All-in-one marketing platform',
      'Excellent PPC research tools',
      'Comprehensive competitor analysis',
      'Great reporting features'
    ],
    cons: [
      'Can be overwhelming for beginners',
      'Expensive for full features',
      'Limited free version'
    ],
    bestFor: ['Digital Marketing Agencies', 'In-house Marketing Teams', 'PPC Specialists'],
    integrations: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Zapier', 'Salesforce'],
    rating: 4.4,
    reviewCount: 2100,
    lastUpdated: '2024-12-15'
  },
  
  // PPC Tools
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'ppc',
    description: 'Google\'s advertising platform for search, display, video, and shopping ads.',
    logo: '/tool-logos/google-ads.svg',
    website: 'https://ads.google.com',
    affiliateLink: 'https://ads.google.com/?ref=marketingstrategy',
    pricing: {
      free: true,
      startingPrice: 0,
      pricingModel: 'pay-per-click',
      trialAvailable: false,
      trialDuration: 0
    },
    features: {
      searchAds: 10,
      displayAds: 9,
      videoAds: 9,
      shoppingAds: 10,
      audienceTargeting: 9,
      reporting: 8,
      easeOfUse: 7,
      customerSupport: 7
    },
    pros: [
      'Largest search advertising network',
      'Advanced targeting options',
      'Comprehensive ad formats',
      'Detailed analytics'
    ],
    cons: [
      'Complex interface',
      'High competition drives up costs',
      'Requires ongoing optimization'
    ],
    bestFor: ['All Business Sizes', 'E-commerce', 'Lead Generation', 'Brand Awareness'],
    integrations: ['Google Analytics', 'Google Tag Manager', 'YouTube', 'Google Merchant Center'],
    rating: 4.2,
    reviewCount: 5000,
    lastUpdated: '2024-12-15'
  },
  
  // Social Media Tools
  {
    id: 'hootsuite',
    name: 'Hootsuite',
    category: 'social-media',
    description: 'Social media management platform for scheduling, monitoring, and analytics.',
    logo: '/tool-logos/hootsuite.svg',
    website: 'https://hootsuite.com',
    affiliateLink: 'https://hootsuite.com/?ref=marketingstrategy',
    pricing: {
      free: true,
      startingPrice: 49,
      pricingModel: 'monthly',
      trialAvailable: true,
      trialDuration: 30
    },
    features: {
      scheduling: 9,
      analytics: 8,
      monitoring: 9,
      teamCollaboration: 9,
      contentCuration: 7,
      reporting: 8,
      easeOfUse: 8,
      customerSupport: 8
    },
    pros: [
      'Supports multiple social networks',
      'Excellent team collaboration features',
      'Comprehensive analytics',
      'Strong third-party integrations'
    ],
    cons: [
      'Can be expensive for small teams',
      'Interface can feel cluttered',
      'Limited Instagram features on lower plans'
    ],
    bestFor: ['Social Media Agencies', 'Enterprise Teams', 'Community Managers'],
    integrations: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube', 'TikTok'],
    rating: 4.1,
    reviewCount: 1800,
    lastUpdated: '2024-12-15'
  },
  
  // Email Marketing Tools
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'email-marketing',
    description: 'Email marketing platform with automation, templates, and analytics.',
    logo: '/tool-logos/mailchimp.svg',
    website: 'https://mailchimp.com',
    affiliateLink: 'https://mailchimp.com/?ref=marketingstrategy',
    pricing: {
      free: true,
      startingPrice: 10,
      pricingModel: 'monthly',
      trialAvailable: false,
      trialDuration: 0
    },
    features: {
      emailTemplates: 9,
      automation: 8,
      segmentation: 8,
      analytics: 8,
      abtesting: 7,
      reporting: 8,
      easeOfUse: 9,
      customerSupport: 7
    },
    pros: [
      'User-friendly interface',
      'Generous free plan',
      'Great template library',
      'Strong e-commerce integrations'
    ],
    cons: [
      'Limited automation on lower plans',
      'Can get expensive as list grows',
      'Basic landing page builder'
    ],
    bestFor: ['Small Businesses', 'E-commerce Stores', 'Beginners', 'Content Creators'],
    integrations: ['Shopify', 'WooCommerce', 'Facebook', 'Instagram', 'Zapier'],
    rating: 4.3,
    reviewCount: 3200,
    lastUpdated: '2024-12-15'
  },
  
  // Analytics Tools
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'analytics',
    description: 'Free web analytics service that tracks and reports website traffic.',
    logo: '/tool-logos/google-analytics.svg',
    website: 'https://analytics.google.com',
    affiliateLink: 'https://analytics.google.com/?ref=marketingstrategy',
    pricing: {
      free: true,
      startingPrice: 0,
      pricingModel: 'free',
      trialAvailable: false,
      trialDuration: 0
    },
    features: {
      trafficAnalysis: 10,
      audienceInsights: 9,
      conversionTracking: 9,
      ecommerce: 9,
      realTimeData: 8,
      reporting: 9,
      easeOfUse: 6,
      customerSupport: 6
    },
    pros: [
      'Completely free',
      'Comprehensive data collection',
      'Integrates with other Google tools',
      'Industry standard'
    ],
    cons: [
      'Steep learning curve',
      'Complex interface',
      'Data sampling on high-traffic sites'
    ],
    bestFor: ['All Business Sizes', 'Website Owners', 'Digital Marketers', 'E-commerce'],
    integrations: ['Google Ads', 'Google Tag Manager', 'Search Console', 'BigQuery'],
    rating: 4.4,
    reviewCount: 8500,
    lastUpdated: '2024-12-15'
  }
];

// Comparison metrics for tools
export const comparisonMetrics = [
  { key: 'easeOfUse', label: 'Ease of Use', weight: 1.2 },
  { key: 'features', label: 'Features', weight: 1.5 },
  { key: 'pricing', label: 'Value for Money', weight: 1.3 },
  { key: 'customerSupport', label: 'Customer Support', weight: 1.1 },
  { key: 'integrations', label: 'Integrations', weight: 1.0 }
];