// Google Analytics and Search Console integration for SEO tracking

export const initializeGoogleAnalytics = () => {
  // Google Analytics 4 (GA4) setup
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
  
  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize GA4
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced ecommerce for Aseobi business
    send_page_view: true,
    custom_map: {
      'custom_parameter_1': 'aseobi_category',
      'custom_parameter_2': 'nigerian_region'
    }
  });

  // Make gtag available globally
  window.gtag = gtag;
};

// Track Aseobi-specific events
export const trackAseobiEvents = {
  // Track product views
  viewProduct: (product) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_item', {
        currency: 'NGN',
        value: product.price,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_category: product.category,
          item_brand: "Aseobi",
          price: product.price,
          quantity: 1,
          custom_parameters: {
            aseobi_type: product.category,
            fabric_material: product.material,
            nigerian_style: true
          }
        }]
      });
    }
  },

  // Track search queries
  searchAseobi: (searchTerm, results) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: searchTerm,
        custom_parameters: {
          search_results_count: results.length,
          search_category: 'aseobi',
          search_location: 'nigeria'
        }
      });
    }
  },

  // Track category browsing
  browseCategory: (category) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_item_list', {
        item_list_name: `${category} Collection`,
        custom_parameters: {
          aseobi_category: category,
          page_type: 'category',
          business_type: 'nigerian_fashion'
        }
      });
    }
  },

  // Track add to cart for Aseobi items
  addToCart: (product, quantity = 1) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        currency: 'NGN',
        value: product.price * quantity,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_category: product.category,
          item_brand: "Aseobi",
          price: product.price,
          quantity: quantity,
          custom_parameters: {
            aseobi_type: product.category,
            purchase_intent: 'high',
            nigerian_fashion: true
          }
        }]
      });
    }
  },

  // Track purchases
  purchase: (orderData) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: orderData.orderId,
        value: orderData.total,
        currency: 'NGN',
        items: orderData.items.map(item => ({
          item_id: item._id,
          item_name: item.name,
          item_category: item.category,
          item_brand: "Aseobi",
          price: item.price,
          quantity: item.quantity
        })),
        custom_parameters: {
          customer_type: 'aseobi_buyer',
          order_source: 'website',
          nigerian_customer: true
        }
      });
    }
  }
};

// SEO performance tracking
export const trackSEOMetrics = {
  // Track organic traffic sources
  trackOrganicVisit: (source, keywords) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'organic_visit', {
        custom_parameters: {
          traffic_source: source,
          search_keywords: keywords,
          seo_channel: 'organic',
          target_market: 'nigeria'
        }
      });
    }
  },

  // Track page performance for SEO
  trackPagePerformance: (pageName, loadTime) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_performance', {
        custom_parameters: {
          page_name: pageName,
          load_time: loadTime,
          performance_category: loadTime < 2000 ? 'fast' : loadTime < 4000 ? 'average' : 'slow',
          seo_impact: loadTime < 2000 ? 'positive' : 'negative'
        }
      });
    }
  },

  // Track search result clicks
  trackSearchClick: (keyword, position, url) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search_result_click', {
        custom_parameters: {
          search_keyword: keyword,
          result_position: position,
          clicked_url: url,
          search_type: 'aseobi_related'
        }
      });
    }
  }
};

// Initialize tracking when page loads
export const initializeSEOTracking = () => {
  // Initialize Google Analytics
  initializeGoogleAnalytics();

  // Track initial page load
  if (typeof window !== 'undefined') {
    const loadTime = performance.now();
    trackSEOMetrics.trackPagePerformance(window.location.pathname, loadTime);

    // Track if user came from search
    const referrer = document.referrer;
    if (referrer.includes('google.com') || referrer.includes('bing.com') || referrer.includes('yahoo.com')) {
      trackSEOMetrics.trackOrganicVisit(referrer, 'organic_search');
    }
  }
};