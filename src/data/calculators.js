import * as FiIcons from 'react-icons/fi';

const {
  FiTrendingUp, FiUsers, FiTarget, FiPercent, FiDollarSign,
  FiMousePointer, FiEye, FiClick, FiBarChart, FiMail,
  FiHeart, FiUserPlus, FiShare2, FiMonitor, FiPlay,
  FiSearch, FiStar, FiCalendar, FiGift, FiAward,
  FiPieChart, FiActivity, FiRefreshCw, FiClock, FiShield
} = FiIcons;

export const calculators = [
  {
    id: 'marketing-roi',
    name: 'Marketing ROI Calculator',
    description: 'Measure the return on investment from your marketing campaigns and initiatives.',
    longDescription: 'Calculate the effectiveness of your marketing spend by comparing revenue generated against marketing costs. This essential metric helps you understand which campaigns deliver the best returns.',
    category: 'ROI & Profitability',
    icon: FiTrendingUp,
    formula: '(Revenue Generated - Marketing Cost) / Marketing Cost × 100',
    inputs: [
      {
        key: 'revenue',
        label: 'Revenue Generated',
        placeholder: '50000',
        prefix: '$',
        required: true,
        help: 'Total revenue attributed to this marketing campaign'
      },
      {
        key: 'cost',
        label: 'Marketing Cost',
        placeholder: '10000',
        prefix: '$',
        required: true,
        help: 'Total cost of the marketing campaign'
      }
    ],
    calculate: (inputs) => {
      const revenue = parseFloat(inputs.revenue);
      const cost = parseFloat(inputs.cost);
      const roi = ((revenue - cost) / cost) * 100;
      const profit = revenue - cost;
      return {
        roi: roi,
        profit: profit,
        revenueMultiplier: revenue / cost
      };
    },
    tips: [
      'Include all marketing costs: ad spend, creative development, staff time, and tools',
      'Track ROI over different time periods to understand campaign lifecycle',
      'A good marketing ROI is typically 5:1 or 500%',
      'Compare ROI across different channels to optimize budget allocation'
    ]
  },
  {
    id: 'cac',
    name: 'Customer Acquisition Cost (CAC)',
    description: 'Calculate the cost of acquiring a new customer through your marketing efforts.',
    longDescription: 'Determine how much you spend to acquire each new customer. This metric is crucial for understanding the efficiency of your marketing and sales efforts.',
    category: 'Customer Metrics',
    icon: FiUsers,
    formula: 'Total Marketing and Sales Costs / Number of New Customers Acquired',
    inputs: [
      {
        key: 'totalCost',
        label: 'Total Marketing & Sales Costs',
        placeholder: '25000',
        prefix: '$',
        required: true,
        help: 'Include all marketing and sales expenses'
      },
      {
        key: 'newCustomers',
        label: 'New Customers Acquired',
        placeholder: '100',
        required: true,
        help: 'Number of new customers acquired during the period'
      }
    ],
    calculate: (inputs) => {
      const totalCost = parseFloat(inputs.totalCost);
      const newCustomers = parseFloat(inputs.newCustomers);
      const cac = totalCost / newCustomers;
      return {
        cac: cac,
        costPerCustomer: cac
      };
    },
    tips: [
      'Include all acquisition costs: ads, content, events, sales team salaries',
      'Track CAC by channel to identify most efficient sources',
      'CAC should be significantly lower than Customer Lifetime Value (CLV)',
      'Monitor CAC trends over time to spot efficiency changes'
    ]
  },
  {
    id: 'clv',
    name: 'Customer Lifetime Value (CLV)',
    description: 'Estimate the total revenue a business can expect from a customer over their lifetime.',
    longDescription: 'Calculate the total worth of a customer to your business over the entire period of their relationship. This helps you understand how much you can spend on acquisition.',
    category: 'Customer Metrics',
    icon: FiTarget,
    formula: '(Average Purchase Value × Purchase Frequency) × Customer Lifespan',
    inputs: [
      {
        key: 'averagePurchase',
        label: 'Average Purchase Value',
        placeholder: '100',
        prefix: '$',
        required: true,
        help: 'Average amount spent per purchase'
      },
      {
        key: 'purchaseFrequency',
        label: 'Purchase Frequency (per year)',
        placeholder: '4',
        required: true,
        help: 'How many times per year does a customer purchase'
      },
      {
        key: 'customerLifespan',
        label: 'Customer Lifespan (years)',
        placeholder: '3',
        required: true,
        help: 'How many years does a customer typically stay'
      }
    ],
    calculate: (inputs) => {
      const averagePurchase = parseFloat(inputs.averagePurchase);
      const purchaseFrequency = parseFloat(inputs.purchaseFrequency);
      const customerLifespan = parseFloat(inputs.customerLifespan);
      const clv = averagePurchase * purchaseFrequency * customerLifespan;
      const annualValue = averagePurchase * purchaseFrequency;
      return {
        clv: clv,
        annualValue: annualValue,
        monthlyValue: annualValue / 12
      };
    },
    tips: [
      'Use historical data to calculate accurate averages',
      'Consider seasonal variations in purchase behavior',
      'Factor in retention rates and churn',
      'Update CLV calculations regularly as business evolves'
    ]
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate Calculator',
    description: 'Measure the percentage of users who take a desired action on your website or campaign.',
    longDescription: 'Track how effectively your website or campaign converts visitors into customers. This fundamental metric helps optimize your marketing funnel.',
    category: 'Conversion & Performance',
    icon: FiPercent,
    formula: '(Conversions / Total Visitors) × 100',
    inputs: [
      {
        key: 'conversions',
        label: 'Number of Conversions',
        placeholder: '150',
        required: true,
        help: 'Number of users who completed the desired action'
      },
      {
        key: 'visitors',
        label: 'Total Visitors',
        placeholder: '5000',
        required: true,
        help: 'Total number of visitors or users'
      }
    ],
    calculate: (inputs) => {
      const conversions = parseFloat(inputs.conversions);
      const visitors = parseFloat(inputs.visitors);
      const conversionRate = (conversions / visitors) * 100;
      return {
        conversionRate: conversionRate,
        nonConversions: visitors - conversions,
        conversionRatio: `1:${Math.round(visitors / conversions)}`
      };
    },
    tips: [
      'Test different page elements to improve conversion rates',
      'Industry average conversion rates vary from 1-5%',
      'Mobile vs desktop conversion rates often differ significantly',
      'Track micro-conversions alongside main conversions'
    ]
  },
  {
    id: 'cpl',
    name: 'Cost Per Lead (CPL)',
    description: 'Calculate the cost of generating a single lead through your marketing efforts.',
    longDescription: 'Determine how much you spend to generate each qualified lead. This metric helps you evaluate the efficiency of your lead generation campaigns.',
    category: 'Digital Marketing',
    icon: FiDollarSign,
    formula: 'Total Marketing Spend / Number of Leads Generated',
    inputs: [
      {
        key: 'marketingSpend',
        label: 'Total Marketing Spend',
        placeholder: '5000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on lead generation'
      },
      {
        key: 'leadsGenerated',
        label: 'Leads Generated',
        placeholder: '200',
        required: true,
        help: 'Number of qualified leads generated'
      }
    ],
    calculate: (inputs) => {
      const marketingSpend = parseFloat(inputs.marketingSpend);
      const leadsGenerated = parseFloat(inputs.leadsGenerated);
      const cpl = marketingSpend / leadsGenerated;
      return {
        cpl: cpl,
        costPerLead: cpl,
        leadsPerDollar: 1 / cpl
      };
    },
    tips: [
      'Define what constitutes a qualified lead clearly',
      'Track CPL by source to identify best performing channels',
      'Compare CPL to lead-to-customer conversion rates',
      'Consider lead quality, not just quantity'
    ]
  },
  {
    id: 'cpc',
    name: 'Cost Per Click (CPC)',
    description: 'Calculate the cost of each click in your pay-per-click advertising campaigns.',
    longDescription: 'Measure the efficiency of your PPC campaigns by calculating how much you pay for each click. Essential for optimizing ad spend and bidding strategies.',
    category: 'PPC & Advertising',
    icon: FiMousePointer,
    formula: 'Total Ad Spend / Number of Clicks',
    inputs: [
      {
        key: 'adSpend',
        label: 'Total Ad Spend',
        placeholder: '2000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on advertising'
      },
      {
        key: 'clicks',
        label: 'Number of Clicks',
        placeholder: '800',
        required: true,
        help: 'Total number of clicks received'
      }
    ],
    calculate: (inputs) => {
      const adSpend = parseFloat(inputs.adSpend);
      const clicks = parseFloat(inputs.clicks);
      const cpc = adSpend / clicks;
      return {
        cpc: cpc,
        costPerClick: cpc,
        clicksPerDollar: 1 / cpc
      };
    },
    tips: [
      'Monitor CPC trends to identify bidding opportunities',
      'Compare CPC across different keywords and audiences',
      'Lower CPC doesn\'t always mean better performance',
      'Focus on quality score to reduce CPC in Google Ads'
    ]
  },
  {
    id: 'cpm',
    name: 'Cost Per Thousand Impressions (CPM)',
    description: 'Measure the cost of 1,000 ad impressions in your advertising campaigns.',
    longDescription: 'Calculate the cost-effectiveness of your display advertising by measuring the cost per thousand impressions. Useful for brand awareness campaigns.',
    category: 'PPC & Advertising',
    icon: FiEye,
    formula: '(Total Ad Spend / Total Impressions) × 1,000',
    inputs: [
      {
        key: 'adSpend',
        label: 'Total Ad Spend',
        placeholder: '1000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on advertising'
      },
      {
        key: 'impressions',
        label: 'Total Impressions',
        placeholder: '100000',
        required: true,
        help: 'Total number of times your ad was shown'
      }
    ],
    calculate: (inputs) => {
      const adSpend = parseFloat(inputs.adSpend);
      const impressions = parseFloat(inputs.impressions);
      const cpm = (adSpend / impressions) * 1000;
      return {
        cpm: cpm,
        costPer1000Impressions: cpm,
        impressionsPerDollar: impressions / adSpend
      };
    },
    tips: [
      'CPM is ideal for brand awareness campaigns',
      'Compare CPM across different platforms and audiences',
      'Consider viewability rates alongside CPM',
      'Track CPM trends to optimize campaign timing'
    ]
  },
  {
    id: 'ctr',
    name: 'Click-Through Rate (CTR)',
    description: 'Calculate the percentage of users who click on your ad or link after seeing it.',
    longDescription: 'Measure how compelling your ads are by calculating the percentage of people who click after seeing them. A key metric for ad effectiveness.',
    category: 'Digital Marketing',
    icon: FiClick,
    formula: '(Number of Clicks / Number of Impressions) × 100',
    inputs: [
      {
        key: 'clicks',
        label: 'Number of Clicks',
        placeholder: '500',
        required: true,
        help: 'Total number of clicks received'
      },
      {
        key: 'impressions',
        label: 'Number of Impressions',
        placeholder: '50000',
        required: true,
        help: 'Total number of times your ad was shown'
      }
    ],
    calculate: (inputs) => {
      const clicks = parseFloat(inputs.clicks);
      const impressions = parseFloat(inputs.impressions);
      const ctr = (clicks / impressions) * 100;
      return {
        ctr: ctr,
        clickThroughRate: ctr,
        clicksPerImpression: clicks / impressions
      };
    },
    tips: [
      'Average CTR varies by industry and platform',
      'Test different ad creatives to improve CTR',
      'Higher CTR often leads to lower cost per click',
      'Monitor CTR trends to identify ad fatigue'
    ]
  },
  {
    id: 'break-even',
    name: 'Break-Even Point Calculator',
    description: 'Determine the point at which your revenue equals costs, indicating no profit or loss.',
    longDescription: 'Calculate how many units you need to sell to cover all your costs. Essential for pricing strategies and business planning.',
    category: 'ROI & Profitability',
    icon: FiBarChart,
    formula: 'Fixed Costs / (Price per Unit - Variable Cost per Unit)',
    inputs: [
      {
        key: 'fixedCosts',
        label: 'Fixed Costs',
        placeholder: '10000',
        prefix: '$',
        required: true,
        help: 'Costs that don\'t change with production volume'
      },
      {
        key: 'pricePerUnit',
        label: 'Price per Unit',
        placeholder: '50',
        prefix: '$',
        required: true,
        help: 'Selling price per unit'
      },
      {
        key: 'variableCostPerUnit',
        label: 'Variable Cost per Unit',
        placeholder: '20',
        prefix: '$',
        required: true,
        help: 'Cost per unit that varies with production'
      }
    ],
    calculate: (inputs) => {
      const fixedCosts = parseFloat(inputs.fixedCosts);
      const pricePerUnit = parseFloat(inputs.pricePerUnit);
      const variableCostPerUnit = parseFloat(inputs.variableCostPerUnit);
      const contributionMargin = pricePerUnit - variableCostPerUnit;
      const breakEvenUnits = fixedCosts / contributionMargin;
      const breakEvenRevenue = breakEvenUnits * pricePerUnit;
      return {
        breakEvenUnits: Math.ceil(breakEvenUnits),
        breakEvenRevenue: breakEvenRevenue,
        contributionMargin: contributionMargin,
        contributionMarginPercentage: (contributionMargin / pricePerUnit) * 100
      };
    },
    tips: [
      'Include all fixed costs: rent, salaries, insurance, etc.',
      'Review break-even analysis regularly as costs change',
      'Consider break-even for different product lines separately',
      'Use break-even analysis for pricing decisions'
    ]
  },
  {
    id: 'email-open-rate',
    name: 'Email Open Rate Calculator',
    description: 'Measure the percentage of email recipients who open your emails.',
    longDescription: 'Track the effectiveness of your email subject lines and sender reputation by calculating open rates. A key metric for email marketing success.',
    category: 'Email Marketing',
    icon: FiMail,
    formula: '(Emails Opened / (Emails Sent - Bounced Emails)) × 100',
    inputs: [
      {
        key: 'emailsOpened',
        label: 'Emails Opened',
        placeholder: '450',
        required: true,
        help: 'Number of emails that were opened'
      },
      {
        key: 'emailsSent',
        label: 'Emails Sent',
        placeholder: '2000',
        required: true,
        help: 'Total number of emails sent'
      },
      {
        key: 'bouncedEmails',
        label: 'Bounced Emails',
        placeholder: '50',
        required: true,
        help: 'Number of emails that bounced'
      }
    ],
    calculate: (inputs) => {
      const emailsOpened = parseFloat(inputs.emailsOpened);
      const emailsSent = parseFloat(inputs.emailsSent);
      const bouncedEmails = parseFloat(inputs.bouncedEmails);
      const deliveredEmails = emailsSent - bouncedEmails;
      const openRate = (emailsOpened / deliveredEmails) * 100;
      return {
        openRate: openRate,
        deliveredEmails: deliveredEmails,
        bounceRate: (bouncedEmails / emailsSent) * 100
      };
    },
    tips: [
      'Industry average open rates range from 15-25%',
      'Test different subject lines to improve open rates',
      'Clean your email list regularly to reduce bounces',
      'Send emails at optimal times for your audience'
    ]
  },
  {
    id: 'email-ctr',
    name: 'Email Click-Through Rate',
    description: 'Measure the percentage of email recipients who click on links in your emails.',
    longDescription: 'Calculate how engaging your email content is by measuring click-through rates. This metric indicates content relevance and call-to-action effectiveness.',
    category: 'Email Marketing',
    icon: FiClick,
    formula: '(Clicks / Emails Delivered) × 100',
    inputs: [
      {
        key: 'clicks',
        label: 'Number of Clicks',
        placeholder: '120',
        required: true,
        help: 'Total number of clicks on links in your email'
      },
      {
        key: 'emailsDelivered',
        label: 'Emails Delivered',
        placeholder: '1950',
        required: true,
        help: 'Number of emails successfully delivered'
      }
    ],
    calculate: (inputs) => {
      const clicks = parseFloat(inputs.clicks);
      const emailsDelivered = parseFloat(inputs.emailsDelivered);
      const ctr = (clicks / emailsDelivered) * 100;
      return {
        emailCTR: ctr,
        clicksPerEmail: clicks / emailsDelivered,
        clickRate: ctr
      };
    },
    tips: [
      'Average email CTR is typically 2-3%',
      'Use clear, compelling call-to-action buttons',
      'Personalize email content for better engagement',
      'Test different email layouts and designs'
    ]
  },
  {
    id: 'social-engagement-rate',
    name: 'Social Media Engagement Rate',
    description: 'Measure the level of interaction on your social media posts.',
    longDescription: 'Calculate how well your social media content resonates with your audience by measuring likes, comments, shares, and other interactions.',
    category: 'Social Media',
    icon: FiHeart,
    formula: '(Likes + Comments + Shares) / Total Followers × 100',
    inputs: [
      {
        key: 'likes',
        label: 'Number of Likes',
        placeholder: '150',
        required: true,
        help: 'Total likes on your post'
      },
      {
        key: 'comments',
        label: 'Number of Comments',
        placeholder: '25',
        required: true,
        help: 'Total comments on your post'
      },
      {
        key: 'shares',
        label: 'Number of Shares',
        placeholder: '30',
        required: true,
        help: 'Total shares/retweets of your post'
      },
      {
        key: 'followers',
        label: 'Total Followers',
        placeholder: '5000',
        required: true,
        help: 'Your total follower count'
      }
    ],
    calculate: (inputs) => {
      const likes = parseFloat(inputs.likes);
      const comments = parseFloat(inputs.comments);
      const shares = parseFloat(inputs.shares);
      const followers = parseFloat(inputs.followers);
      const totalEngagements = likes + comments + shares;
      const engagementRate = (totalEngagements / followers) * 100;
      return {
        engagementRate: engagementRate,
        totalEngagements: totalEngagements,
        engagementsPerFollower: totalEngagements / followers
      };
    },
    tips: [
      'Good engagement rates vary by platform (Instagram: 1-3%, Facebook: 0.5-1%)',
      'Post consistently to maintain engagement',
      'Use hashtags strategically to increase reach',
      'Engage with your audience\'s comments to boost interaction'
    ]
  },
  {
    id: 'follower-growth-rate',
    name: 'Follower Growth Rate',
    description: 'Track the growth of your social media followers over time.',
    longDescription: 'Monitor how quickly your social media audience is growing. This metric helps you understand the effectiveness of your content and growth strategies.',
    category: 'Social Media',
    icon: FiUserPlus,
    formula: '(New Followers / Previous Followers) × 100',
    inputs: [
      {
        key: 'newFollowers',
        label: 'New Followers',
        placeholder: '200',
        required: true,
        help: 'Number of new followers gained in the period'
      },
      {
        key: 'previousFollowers',
        label: 'Previous Follower Count',
        placeholder: '4800',
        required: true,
        help: 'Follower count at the start of the period'
      }
    ],
    calculate: (inputs) => {
      const newFollowers = parseFloat(inputs.newFollowers);
      const previousFollowers = parseFloat(inputs.previousFollowers);
      const growthRate = (newFollowers / previousFollowers) * 100;
      const currentFollowers = previousFollowers + newFollowers;
      return {
        growthRate: growthRate,
        currentFollowers: currentFollowers,
        netGrowth: newFollowers
      };
    },
    tips: [
      'Track growth rate monthly for meaningful insights',
      'Compare growth rates across different platforms',
      'Quality followers are more valuable than quantity',
      'Analyze what content drives the most follower growth'
    ]
  },
  {
    id: 'ad-spend-roi',
    name: 'Ad Spend ROI Calculator',
    description: 'Measure the return on investment for your advertising spend.',
    longDescription: 'Calculate how much revenue your advertising generates compared to what you spend. Essential for optimizing ad budgets and campaign performance.',
    category: 'PPC & Advertising',
    icon: FiDollarSign,
    formula: '(Revenue from Ads - Ad Spend) / Ad Spend × 100',
    inputs: [
      {
        key: 'revenueFromAds',
        label: 'Revenue from Ads',
        placeholder: '25000',
        prefix: '$',
        required: true,
        help: 'Total revenue generated from your advertising'
      },
      {
        key: 'adSpend',
        label: 'Ad Spend',
        placeholder: '5000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on advertising'
      }
    ],
    calculate: (inputs) => {
      const revenueFromAds = parseFloat(inputs.revenueFromAds);
      const adSpend = parseFloat(inputs.adSpend);
      const roi = ((revenueFromAds - adSpend) / adSpend) * 100;
      const profit = revenueFromAds - adSpend;
      const roas = revenueFromAds / adSpend;
      return {
        adROI: roi,
        profit: profit,
        roas: roas,
        revenueMultiplier: roas
      };
    },
    tips: [
      'Track ROI by campaign, ad group, and keyword level',
      'Consider lifetime value, not just immediate revenue',
      'Factor in all costs including management fees',
      'Test different audiences and creatives to improve ROI'
    ]
  },
  {
    id: 'lead-conversion-rate',
    name: 'Lead-to-Customer Conversion Rate',
    description: 'Measure the percentage of leads that convert into paying customers.',
    longDescription: 'Calculate how effectively your sales process converts qualified leads into customers. This metric helps optimize your sales funnel.',
    category: 'Conversion & Performance',
    icon: FiTarget,
    formula: '(Number of Customers / Number of Leads) × 100',
    inputs: [
      {
        key: 'customers',
        label: 'Number of Customers',
        placeholder: '25',
        required: true,
        help: 'Number of leads that became paying customers'
      },
      {
        key: 'leads',
        label: 'Number of Leads',
        placeholder: '200',
        required: true,
        help: 'Total number of qualified leads'
      }
    ],
    calculate: (inputs) => {
      const customers = parseFloat(inputs.customers);
      const leads = parseFloat(inputs.leads);
      const conversionRate = (customers / leads) * 100;
      return {
        leadConversionRate: conversionRate,
        leadsPerCustomer: leads / customers,
        conversionRatio: `1:${Math.round(leads / customers)}`
      };
    },
    tips: [
      'Track conversion rates by lead source',
      'Analyze why leads don\'t convert to improve process',
      'Nurture leads that don\'t convert immediately',
      'Focus on lead quality over quantity'
    ]
  },
  {
    id: 'rpl',
    name: 'Revenue Per Lead (RPL)',
    description: 'Calculate the average revenue generated per lead.',
    longDescription: 'Determine the average value of each lead to your business. This metric helps you understand lead quality and optimize lead generation investments.',
    category: 'Customer Metrics',
    icon: FiDollarSign,
    formula: 'Total Revenue / Number of Leads',
    inputs: [
      {
        key: 'totalRevenue',
        label: 'Total Revenue',
        placeholder: '50000',
        prefix: '$',
        required: true,
        help: 'Total revenue generated from leads'
      },
      {
        key: 'numberOfLeads',
        label: 'Number of Leads',
        placeholder: '500',
        required: true,
        help: 'Total number of leads generated'
      }
    ],
    calculate: (inputs) => {
      const totalRevenue = parseFloat(inputs.totalRevenue);
      const numberOfLeads = parseFloat(inputs.numberOfLeads);
      const rpl = totalRevenue / numberOfLeads;
      return {
        revenuePerLead: rpl,
        averageLeadValue: rpl,
        leadsPerDollar: 1 / rpl
      };
    },
    tips: [
      'Track RPL by lead source to identify quality channels',
      'Compare RPL to Cost Per Lead for profitability analysis',
      'Consider time lag between lead generation and revenue',
      'Segment RPL by lead quality scores'
    ]
  },
  {
    id: 'payback-period',
    name: 'Payback Period Calculator',
    description: 'Determine how long it takes to recover the cost of a marketing investment.',
    longDescription: 'Calculate the time required to recoup your marketing investment through generated revenue. Essential for budget planning and ROI analysis.',
    category: 'ROI & Profitability',
    icon: FiClock,
    formula: 'Initial Investment / Monthly Cash Flow',
    inputs: [
      {
        key: 'initialInvestment',
        label: 'Initial Investment',
        placeholder: '10000',
        prefix: '$',
        required: true,
        help: 'Total upfront marketing investment'
      },
      {
        key: 'monthlyCashFlow',
        label: 'Monthly Cash Flow',
        placeholder: '2000',
        prefix: '$',
        required: true,
        help: 'Average monthly cash flow generated'
      }
    ],
    calculate: (inputs) => {
      const initialInvestment = parseFloat(inputs.initialInvestment);
      const monthlyCashFlow = parseFloat(inputs.monthlyCashFlow);
      const paybackPeriodMonths = initialInvestment / monthlyCashFlow;
      const paybackPeriodYears = paybackPeriodMonths / 12;
      return {
        paybackPeriodMonths: paybackPeriodMonths,
        paybackPeriodYears: paybackPeriodYears,
        breakEvenPoint: `${Math.ceil(paybackPeriodMonths)} months`
      };
    },
    tips: [
      'Shorter payback periods indicate better investments',
      'Consider seasonal variations in cash flow',
      'Factor in opportunity cost of capital',
      'Compare payback periods across different marketing channels'
    ]
  },
  {
    id: 'churn-rate',
    name: 'Customer Churn Rate',
    description: 'Measure the percentage of customers lost over a specific period.',
    longDescription: 'Calculate how many customers stop doing business with you over time. This metric is crucial for subscription businesses and customer retention strategies.',
    category: 'Customer Metrics',
    icon: FiRefreshCw,
    formula: '(Customers Lost During Period / Total Customers at Start) × 100',
    inputs: [
      {
        key: 'customersLost',
        label: 'Customers Lost',
        placeholder: '15',
        required: true,
        help: 'Number of customers who left during the period'
      },
      {
        key: 'totalCustomersStart',
        label: 'Customers at Start',
        placeholder: '500',
        required: true,
        help: 'Total customers at the beginning of the period'
      }
    ],
    calculate: (inputs) => {
      const customersLost = parseFloat(inputs.customersLost);
      const totalCustomersStart = parseFloat(inputs.totalCustomersStart);
      const churnRate = (customersLost / totalCustomersStart) * 100;
      const retentionRate = 100 - churnRate;
      return {
        churnRate: churnRate,
        retentionRate: retentionRate,
        customersRetained: totalCustomersStart - customersLost
      };
    },
    tips: [
      'Track churn rate monthly and annually',
      'Identify patterns in customer churn',
      'Focus on reducing churn rather than just acquiring new customers',
      'Survey churned customers to understand reasons'
    ]
  },
  {
    id: 'gross-profit-margin',
    name: 'Gross Profit Margin',
    description: 'Calculate the percentage of revenue that exceeds the cost of goods sold.',
    longDescription: 'Determine how much profit you make on each sale after accounting for direct costs. This metric is essential for pricing and profitability analysis.',
    category: 'ROI & Profitability',
    icon: FiPercent,
    formula: '(Revenue - Cost of Goods Sold) / Revenue × 100',
    inputs: [
      {
        key: 'revenue',
        label: 'Total Revenue',
        placeholder: '100000',
        prefix: '$',
        required: true,
        help: 'Total revenue from sales'
      },
      {
        key: 'cogs',
        label: 'Cost of Goods Sold',
        placeholder: '60000',
        prefix: '$',
        required: true,
        help: 'Direct costs to produce/deliver your product'
      }
    ],
    calculate: (inputs) => {
      const revenue = parseFloat(inputs.revenue);
      const cogs = parseFloat(inputs.cogs);
      const grossProfit = revenue - cogs;
      const grossProfitMargin = (grossProfit / revenue) * 100;
      return {
        grossProfitMargin: grossProfitMargin,
        grossProfit: grossProfit,
        costPercentage: (cogs / revenue) * 100
      };
    },
    tips: [
      'Higher margins indicate better pricing power',
      'Track margins by product line or service',
      'Consider all direct costs in COGS calculation',
      'Compare your margins to industry benchmarks'
    ]
  },
  {
    id: 'ltv-cac-ratio',
    name: 'LTV:CAC Ratio Calculator',
    description: 'Measure the ratio of customer lifetime value to customer acquisition cost.',
    longDescription: 'Calculate the relationship between what you spend to acquire customers and what they\'re worth over time. This ratio is crucial for sustainable business growth.',
    category: 'Customer Metrics',
    icon: FiShield,
    formula: 'Customer Lifetime Value / Customer Acquisition Cost',
    inputs: [
      {
        key: 'ltv',
        label: 'Customer Lifetime Value',
        placeholder: '1200',
        prefix: '$',
        required: true,
        help: 'Total value of a customer over their lifetime'
      },
      {
        key: 'cac',
        label: 'Customer Acquisition Cost',
        placeholder: '200',
        prefix: '$',
        required: true,
        help: 'Cost to acquire one customer'
      }
    ],
    calculate: (inputs) => {
      const ltv = parseFloat(inputs.ltv);
      const cac = parseFloat(inputs.cac);
      const ratio = ltv / cac;
      let healthStatus;
      if (ratio < 1) healthStatus = 'Unsustainable';
      else if (ratio < 3) healthStatus = 'Concerning';
      else if (ratio <= 5) healthStatus = 'Good';
      else healthStatus = 'Excellent';
      
      return {
        ltvCacRatio: ratio,
        ratioFormatted: `${ratio.toFixed(1)}:1`,
        healthStatus: healthStatus,
        profitMargin: ltv - cac
      };
    },
    tips: [
      'Ideal LTV:CAC ratio is 3:1 or higher',
      'Ratios below 1:1 indicate unsustainable business model',
      'Consider payback period alongside this ratio',
      'Improve ratio by increasing LTV or decreasing CAC'
    ]
  },
  {
    id: 'retention-rate',
    name: 'Customer Retention Rate',
    description: 'Measure the percentage of customers retained over a specific period.',
    longDescription: 'Calculate how many customers continue to do business with you over time. High retention rates indicate strong customer satisfaction and loyalty.',
    category: 'Customer Metrics',
    icon: FiUsers,
    formula: '((Customers at End - New Customers) / Customers at Start) × 100',
    inputs: [
      {
        key: 'customersEnd',
        label: 'Customers at End of Period',
        placeholder: '520',
        required: true,
        help: 'Total customers at the end of the period'
      },
      {
        key: 'newCustomers',
        label: 'New Customers Acquired',
        placeholder: '50',
        required: true,
        help: 'New customers acquired during the period'
      },
      {
        key: 'customersStart',
        label: 'Customers at Start of Period',
        placeholder: '500',
        required: true,
        help: 'Total customers at the beginning of the period'
      }
    ],
    calculate: (inputs) => {
      const customersEnd = parseFloat(inputs.customersEnd);
      const newCustomers = parseFloat(inputs.newCustomers);
      const customersStart = parseFloat(inputs.customersStart);
      const retainedCustomers = customersEnd - newCustomers;
      const retentionRate = (retainedCustomers / customersStart) * 100;
      const churnRate = 100 - retentionRate;
      return {
        retentionRate: retentionRate,
        churnRate: churnRate,
        retainedCustomers: retainedCustomers,
        customersLost: customersStart - retainedCustomers
      };
    },
    tips: [
      'Focus on retention as much as acquisition',
      'Track retention by customer segments',
      'Identify factors that drive customer loyalty',
      'Implement retention campaigns for at-risk customers'
    ]
  },
  {
    id: 'mer',
    name: 'Marketing Efficiency Ratio (MER)',
    description: 'Measure the efficiency of marketing spend in generating revenue.',
    longDescription: 'Calculate how much revenue is generated for every dollar spent on marketing. This metric provides a holistic view of marketing performance.',
    category: 'Analytics & Attribution',
    icon: FiActivity,
    formula: 'Total Revenue / Total Marketing Spend',
    inputs: [
      {
        key: 'totalRevenue',
        label: 'Total Revenue',
        placeholder: '500000',
        prefix: '$',
        required: true,
        help: 'Total revenue generated during the period'
      },
      {
        key: 'totalMarketingSpend',
        label: 'Total Marketing Spend',
        placeholder: '50000',
        prefix: '$',
        required: true,
        help: 'Total marketing spend during the period'
      }
    ],
    calculate: (inputs) => {
      const totalRevenue = parseFloat(inputs.totalRevenue);
      const totalMarketingSpend = parseFloat(inputs.totalMarketingSpend);
      const mer = totalRevenue / totalMarketingSpend;
      const marketingAsPercentOfRevenue = (totalMarketingSpend / totalRevenue) * 100;
      return {
        mer: mer,
        revenuePerMarketingDollar: mer,
        marketingAsPercentOfRevenue: marketingAsPercentOfRevenue,
        efficiency: mer >= 4 ? 'Excellent' : mer >= 2 ? 'Good' : 'Needs Improvement'
      };
    },
    tips: [
      'MER provides a blended view across all marketing channels',
      'Compare MER over time to track efficiency trends',
      'Consider attribution windows and customer journey complexity',
      'Use MER alongside channel-specific metrics'
    ]
  },
  {
    id: 'content-roi',
    name: 'Content Marketing ROI',
    description: 'Measure the return on investment for your content marketing efforts.',
    longDescription: 'Calculate the revenue generated from your content marketing activities compared to the investment made. Essential for content strategy optimization.',
    category: 'Content & SEO',
    icon: FiMonitor,
    formula: '(Revenue from Content - Content Investment) / Content Investment × 100',
    inputs: [
      {
        key: 'revenueFromContent',
        label: 'Revenue from Content',
        placeholder: '75000',
        prefix: '$',
        required: true,
        help: 'Revenue attributed to content marketing'
      },
      {
        key: 'contentInvestment',
        label: 'Content Investment',
        placeholder: '15000',
        prefix: '$',
        required: true,
        help: 'Total investment in content creation and promotion'
      }
    ],
    calculate: (inputs) => {
      const revenueFromContent = parseFloat(inputs.revenueFromContent);
      const contentInvestment = parseFloat(inputs.contentInvestment);
      const roi = ((revenueFromContent - contentInvestment) / contentInvestment) * 100;
      const profit = revenueFromContent - contentInvestment;
      return {
        contentROI: roi,
        profit: profit,
        revenueMultiplier: revenueFromContent / contentInvestment
      };
    },
    tips: [
      'Track content performance over longer periods',
      'Include all costs: creation, promotion, tools, and time',
      'Consider indirect benefits like brand awareness',
      'Measure both lead generation and sales impact'
    ]
  },
  {
    id: 'cpv',
    name: 'Cost Per View (CPV)',
    description: 'Calculate the cost of each video view in your video marketing campaigns.',
    longDescription: 'Measure the cost-effectiveness of your video advertising by calculating how much you pay for each view. Important for video marketing optimization.',
    category: 'Content & SEO',
    icon: FiPlay,
    formula: 'Total Video Ad Spend / Number of Views',
    inputs: [
      {
        key: 'videoAdSpend',
        label: 'Total Video Ad Spend',
        placeholder: '3000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on video advertising'
      },
      {
        key: 'numberOfViews',
        label: 'Number of Views',
        placeholder: '50000',
        required: true,
        help: 'Total number of video views'
      }
    ],
    calculate: (inputs) => {
      const videoAdSpend = parseFloat(inputs.videoAdSpend);
      const numberOfViews = parseFloat(inputs.numberOfViews);
      const cpv = videoAdSpend / numberOfViews;
      return {
        cpv: cpv,
        costPerView: cpv,
        viewsPerDollar: numberOfViews / videoAdSpend
      };
    },
    tips: [
      'Define what constitutes a "view" (e.g., 3 seconds, 30 seconds)',
      'Track view completion rates alongside CPV',
      'Compare CPV across different video lengths and formats',
      'Consider engagement metrics beyond just views'
    ]
  },
  {
    id: 'seo-roi',
    name: 'SEO ROI Calculator',
    description: 'Measure the return on investment for your SEO efforts.',
    longDescription: 'Calculate the revenue generated from organic search traffic compared to your SEO investment. Essential for justifying SEO spend and strategy.',
    category: 'Content & SEO',
    icon: FiSearch,
    formula: '(Revenue from Organic Traffic - SEO Investment) / SEO Investment × 100',
    inputs: [
      {
        key: 'organicRevenue',
        label: 'Revenue from Organic Traffic',
        placeholder: '120000',
        prefix: '$',
        required: true,
        help: 'Revenue attributed to organic search traffic'
      },
      {
        key: 'seoInvestment',
        label: 'SEO Investment',
        placeholder: '20000',
        prefix: '$',
        required: true,
        help: 'Total investment in SEO (tools, content, consulting)'
      }
    ],
    calculate: (inputs) => {
      const organicRevenue = parseFloat(inputs.organicRevenue);
      const seoInvestment = parseFloat(inputs.seoInvestment);
      const roi = ((organicRevenue - seoInvestment) / seoInvestment) * 100;
      const profit = organicRevenue - seoInvestment;
      return {
        seoROI: roi,
        profit: profit,
        revenueMultiplier: organicRevenue / seoInvestment
      };
    },
    tips: [
      'SEO ROI compounds over time - measure long-term impact',
      'Include all SEO costs: tools, content creation, link building',
      'Track rankings and organic traffic growth',
      'Consider brand value and awareness benefits'
    ]
  },
  {
    id: 'influencer-roi',
    name: 'Influencer Marketing ROI',
    description: 'Measure the return on investment for influencer marketing campaigns.',
    longDescription: 'Calculate the revenue generated from influencer partnerships compared to campaign costs. Essential for influencer marketing optimization.',
    category: 'Social Media',
    icon: FiStar,
    formula: '(Revenue from Influencer Campaign - Campaign Cost) / Campaign Cost × 100',
    inputs: [
      {
        key: 'influencerRevenue',
        label: 'Revenue from Influencer Campaign',
        placeholder: '45000',
        prefix: '$',
        required: true,
        help: 'Revenue attributed to influencer marketing'
      },
      {
        key: 'campaignCost',
        label: 'Campaign Cost',
        placeholder: '10000',
        prefix: '$',
        required: true,
        help: 'Total cost of influencer campaign'
      }
    ],
    calculate: (inputs) => {
      const influencerRevenue = parseFloat(inputs.influencerRevenue);
      const campaignCost = parseFloat(inputs.campaignCost);
      const roi = ((influencerRevenue - campaignCost) / campaignCost) * 100;
      const profit = influencerRevenue - campaignCost;
      return {
        influencerROI: roi,
        profit: profit,
        revenueMultiplier: influencerRevenue / campaignCost
      };
    },
    tips: [
      'Track both direct sales and brand awareness impact',
      'Include all costs: fees, products, shipping, management',
      'Measure engagement quality, not just reach',
      'Build long-term relationships with high-performing influencers'
    ]
  },
  {
    id: 'cpe',
    name: 'Cost Per Engagement (CPE)',
    description: 'Calculate the cost of each engagement from your marketing campaigns.',
    longDescription: 'Measure how much you pay for each interaction (like, comment, share) with your content. Important for social media and content marketing optimization.',
    category: 'Social Media',
    icon: FiHeart,
    formula: 'Total Campaign Cost / Total Engagements',
    inputs: [
      {
        key: 'totalCampaignCost',
        label: 'Total Campaign Cost',
        placeholder: '2500',
        prefix: '$',
        required: true,
        help: 'Total cost of the marketing campaign'
      },
      {
        key: 'totalEngagements',
        label: 'Total Engagements',
        placeholder: '1250',
        required: true,
        help: 'Total number of engagements (likes, comments, shares)'
      }
    ],
    calculate: (inputs) => {
      const totalCampaignCost = parseFloat(inputs.totalCampaignCost);
      const totalEngagements = parseFloat(inputs.totalEngagements);
      const cpe = totalCampaignCost / totalEngagements;
      return {
        cpe: cpe,
        costPerEngagement: cpe,
        engagementsPerDollar: totalEngagements / totalCampaignCost
      };
    },
    tips: [
      'Focus on meaningful engagements over vanity metrics',
      'Compare CPE across different content types',
      'Track engagement quality and sentiment',
      'Consider the value of different engagement types'
    ]
  },
  {
    id: 'event-roi',
    name: 'Event Marketing ROI',
    description: 'Measure the return on investment for hosting or sponsoring events.',
    longDescription: 'Calculate the revenue generated from event marketing compared to event costs. Essential for evaluating event marketing effectiveness.',
    category: 'Analytics & Attribution',
    icon: FiCalendar,
    formula: '(Revenue from Event - Event Cost) / Event Cost × 100',
    inputs: [
      {
        key: 'eventRevenue',
        label: 'Revenue from Event',
        placeholder: '85000',
        prefix: '$',
        required: true,
        help: 'Revenue attributed to the event'
      },
      {
        key: 'eventCost',
        label: 'Event Cost',
        placeholder: '25000',
        prefix: '$',
        required: true,
        help: 'Total cost of hosting or sponsoring the event'
      }
    ],
    calculate: (inputs) => {
      const eventRevenue = parseFloat(inputs.eventRevenue);
      const eventCost = parseFloat(inputs.eventCost);
      const roi = ((eventRevenue - eventCost) / eventCost) * 100;
      const profit = eventRevenue - eventCost;
      return {
        eventROI: roi,
        profit: profit,
        revenueMultiplier: eventRevenue / eventCost
      };
    },
    tips: [
      'Include all event costs: venue, staff, materials, promotion',
      'Track both immediate and long-term revenue impact',
      'Consider brand awareness and relationship building benefits',
      'Measure lead quality and conversion rates from events'
    ]
  },
  {
    id: 'cost-per-attendee',
    name: 'Cost Per Attendee',
    description: 'Calculate the cost of acquiring each event attendee.',
    longDescription: 'Measure the cost-effectiveness of your event marketing by calculating how much you spend to get each person to attend your event.',
    category: 'Analytics & Attribution',
    icon: FiUsers,
    formula: 'Total Event Cost / Number of Attendees',
    inputs: [
      {
        key: 'totalEventCost',
        label: 'Total Event Cost',
        placeholder: '15000',
        prefix: '$',
        required: true,
        help: 'Total cost of the event including marketing'
      },
      {
        key: 'numberOfAttendees',
        label: 'Number of Attendees',
        placeholder: '300',
        required: true,
        help: 'Total number of people who attended'
      }
    ],
    calculate: (inputs) => {
      const totalEventCost = parseFloat(inputs.totalEventCost);
      const numberOfAttendees = parseFloat(inputs.numberOfAttendees);
      const costPerAttendee = totalEventCost / numberOfAttendees;
      return {
        costPerAttendee: costPerAttendee,
        attendeesPerDollar: numberOfAttendees / totalEventCost,
        totalInvestment: totalEventCost
      };
    },
    tips: [
      'Compare cost per attendee across different event types',
      'Consider the quality and target audience of attendees',
      'Track conversion from attendee to customer',
      'Factor in networking and brand value benefits'
    ]
  },
  {
    id: 'affiliate-roi',
    name: 'Affiliate Marketing ROI',
    description: 'Measure the return on investment for affiliate marketing campaigns.',
    longDescription: 'Calculate the revenue generated from affiliate partnerships compared to affiliate costs. Essential for affiliate program optimization.',
    category: 'Analytics & Attribution',
    icon: FiGift,
    formula: '(Revenue from Affiliates - Affiliate Costs) / Affiliate Costs × 100',
    inputs: [
      {
        key: 'affiliateRevenue',
        label: 'Revenue from Affiliates',
        placeholder: '60000',
        prefix: '$',
        required: true,
        help: 'Revenue generated through affiliate partners'
      },
      {
        key: 'affiliateCosts',
        label: 'Affiliate Costs',
        placeholder: '12000',
        prefix: '$',
        required: true,
        help: 'Total costs including commissions and management'
      }
    ],
    calculate: (inputs) => {
      const affiliateRevenue = parseFloat(inputs.affiliateRevenue);
      const affiliateCosts = parseFloat(inputs.affiliateCosts);
      const roi = ((affiliateRevenue - affiliateCosts) / affiliateCosts) * 100;
      const profit = affiliateRevenue - affiliateCosts;
      return {
        affiliateROI: roi,
        profit: profit,
        revenueMultiplier: affiliateRevenue / affiliateCosts
      };
    },
    tips: [
      'Track performance by individual affiliate partners',
      'Include all costs: commissions, tracking, management',
      'Focus on recruiting high-quality affiliates',
      'Provide affiliates with quality marketing materials'
    ]
  },
  {
    id: 'cps',
    name: 'Cost Per Sale (CPS)',
    description: 'Calculate the cost of each sale generated through your marketing efforts.',
    longDescription: 'Measure the cost-effectiveness of your marketing by calculating how much you spend to generate each sale. Critical for profitability analysis.',
    category: 'Conversion & Performance',
    icon: FiAward,
    formula: 'Total Marketing Spend / Number of Sales',
    inputs: [
      {
        key: 'totalMarketingSpend',
        label: 'Total Marketing Spend',
        placeholder: '8000',
        prefix: '$',
        required: true,
        help: 'Total amount spent on marketing'
      },
      {
        key: 'numberOfSales',
        label: 'Number of Sales',
        placeholder: '80',
        required: true,
        help: 'Total number of sales generated'
      }
    ],
    calculate: (inputs) => {
      const totalMarketingSpend = parseFloat(inputs.totalMarketingSpend);
      const numberOfSales = parseFloat(inputs.numberOfSales);
      const cps = totalMarketingSpend / numberOfSales;
      return {
        cps: cps,
        costPerSale: cps,
        salesPerDollar: numberOfSales / totalMarketingSpend
      };
    },
    tips: [
      'Compare CPS to average order value for profitability',
      'Track CPS by marketing channel and campaign',
      'Consider lifetime value when evaluating CPS',
      'Optimize high-performing channels with low CPS'
    ]
  },
  {
    id: 'brand-awareness-cpi',
    name: 'Brand Awareness Cost Per Impression',
    description: 'Measure the cost of each impression in brand awareness campaigns.',
    longDescription: 'Calculate the cost-effectiveness of your brand awareness advertising by measuring the cost per impression. Essential for brand marketing optimization.',
    category: 'PPC & Advertising',
    icon: FiEye,
    formula: 'Total Campaign Cost / Total Impressions',
    inputs: [
      {
        key: 'totalCampaignCost',
        label: 'Total Campaign Cost',
        placeholder: '5000',
        prefix: '$',
        required: true,
        help: 'Total cost of brand awareness campaign'
      },
      {
        key: 'totalImpressions',
        label: 'Total Impressions',
        placeholder: '2000000',
        required: true,
        help: 'Total number of impressions delivered'
      }
    ],
    calculate: (inputs) => {
      const totalCampaignCost = parseFloat(inputs.totalCampaignCost);
      const totalImpressions = parseFloat(inputs.totalImpressions);
      const cpi = totalCampaignCost / totalImpressions;
      const cpm = cpi * 1000;
      return {
        cpi: cpi,
        costPerImpression: cpi,
        cpm: cpm,
        impressionsPerDollar: totalImpressions / totalCampaignCost
      };
    },
    tips: [
      'Focus on reach and frequency for brand awareness',
      'Consider viewability and attention metrics',
      'Track brand lift and awareness surveys',
      'Compare CPI across different platforms and formats'
    ]
  }
];