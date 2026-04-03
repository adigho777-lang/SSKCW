// Translation utility for API data
// Uses browser's built-in translation or can be extended with Google Translate API

const translationCache = new Map();

/**
 * Get translated field from product based on current language
 * Supports API fields like: title_mr, title_hi, description_mr, description_hi
 * Also handles special case: description_en (explicit English field)
 */
export const getTranslatedField = (product, fieldName, currentLang) => {
  if (!product || !fieldName) return '';
  
  // Special handling for description field
  if (fieldName === 'description') {
    if (currentLang === 'en') {
      // For English, prefer description_en, fallback to description
      return product.description_en || product.description || '';
    } else {
      // For other languages, try translated field first
      const translatedFieldName = `${fieldName}_${currentLang}`;
      return product[translatedFieldName] || product.description_en || product.description || '';
    }
  }
  
  // If English or no translation needed, return original field
  if (currentLang === 'en') {
    return product[fieldName] || '';
  }
  
  // Try to get translated field (e.g., title_mr, title_hi)
  const translatedFieldName = `${fieldName}_${currentLang}`;
  const translatedValue = product[translatedFieldName];
  
  // Return translated value if exists, otherwise fallback to original
  return translatedValue || product[fieldName] || '';
};

/**
 * Get translated product - uses pre-translated fields from API
 * This is MUCH faster than dynamic translation
 * Supports all SSKCW API v3.0 multilingual fields
 */
export const getTranslatedProduct = (product, currentLang) => {
  if (!product || currentLang === 'en') {
    return product;
  }
  
  // Create a new product object with translated fields
  const translatedProduct = { ...product };
  
  // List of all translatable text fields from API v3.0
  const translatableFields = [
    // Basic Info
    'title',
    'category',
    'sub_category',
    
    // Content
    'description',
    'trigger',
    'short_description',
    'what_is_it',
    'works_for',
    
    // Health
    'health_benefits',
    
    // Usage
    'treatment_duration',
    'when_to_expect_results',
    'who_can_benefit',
    'who_should_use',
    'who_should_not_use',
    'precautions',
    'side_effects',
    'warnings',
    
    // Product Details
    'composition',
    'shelf_life',
    'package_contents',
    'storage_instructions',
    
    // Marketing
    'seo_title',
    'seo_description',
    
    // Support
    'availability',
    'return_policy',
    'delivery_time',
    'effectiveness'
  ];
  
  // Replace each field with translated version if available
  translatableFields.forEach(field => {
    const translatedValue = getTranslatedField(product, field, currentLang);
    if (translatedValue) {
      translatedProduct[field] = translatedValue;
    }
  });
  
  // Handle array fields from API v3.0
  const arrayFields = [
    'benefits',
    'diseases_treated',
    'symptoms_relief',
    'body_parts_affected',
    'target_conditions',
    'ingredients',
    'tags',
    'certifications'
  ];
  
  arrayFields.forEach(field => {
    const arrayFieldName = `${field}_${currentLang}`;
    if (product[arrayFieldName] && Array.isArray(product[arrayFieldName])) {
      translatedProduct[field] = product[arrayFieldName];
    }
  });
  
  // Handle FAQ array with nested translations
  if (product.faq && Array.isArray(product.faq)) {
    const faqFieldName = `faq_${currentLang}`;
    if (product[faqFieldName] && Array.isArray(product[faqFieldName])) {
      translatedProduct.faq = product[faqFieldName];
    }
  }
  
  return translatedProduct;
};

/**
 * Get translated products array
 */
export const getTranslatedProducts = (products, currentLang) => {
  if (!products || !Array.isArray(products) || currentLang === 'en') {
    return products;
  }
  
  return products.map(product => getTranslatedProduct(product, currentLang));
};

/**
 * Get translated bundle
 * Handles bundle-specific fields like tagline, best_for, recommended_duration
 */
export const getTranslatedBundle = (bundle, currentLang) => {
  if (!bundle || currentLang === 'en') {
    return bundle;
  }
  
  const translatedBundle = { ...bundle };
  
  // Bundle-specific text fields
  const bundleFields = [
    'title',
    'description',
    'tagline',
    'recommended_duration'
  ];
  
  bundleFields.forEach(field => {
    const translatedValue = getTranslatedField(bundle, field, currentLang);
    if (translatedValue) {
      translatedBundle[field] = translatedValue;
    }
  });
  
  // Bundle array fields
  const arrayFieldName = `best_for_${currentLang}`;
  if (bundle[arrayFieldName] && Array.isArray(bundle[arrayFieldName])) {
    translatedBundle.best_for = bundle[arrayFieldName];
  }
  
  return translatedBundle;
};

/**
 * Get translated bundles array
 */
export const getTranslatedBundles = (bundles, currentLang) => {
  if (!bundles || !Array.isArray(bundles) || currentLang === 'en') {
    return bundles;
  }
  
  return bundles.map(bundle => getTranslatedBundle(bundle, currentLang));
};

/**
 * Get translated comparison
 * Handles comparison-specific fields and criteria
 */
export const getTranslatedComparison = (comparison, currentLang) => {
  if (!comparison || currentLang === 'en') {
    return comparison;
  }
  
  const translatedComparison = { ...comparison };
  
  // Comparison text fields
  const comparisonFields = ['title', 'winner'];
  
  comparisonFields.forEach(field => {
    const translatedValue = getTranslatedField(comparison, field, currentLang);
    if (translatedValue) {
      translatedComparison[field] = translatedValue;
    }
  });
  
  // Translate criteria array
  if (comparison.criteria && Array.isArray(comparison.criteria)) {
    translatedComparison.criteria = comparison.criteria.map(criterion => {
      const translatedCriterion = { ...criterion };
      
      // Translate feature name
      const featureTranslated = getTranslatedField(criterion, 'feature', currentLang);
      if (featureTranslated) {
        translatedCriterion.feature = featureTranslated;
      }
      
      // Translate product-specific values
      Object.keys(criterion).forEach(key => {
        if (key.startsWith('prod_')) {
          const translatedKey = `${key}_${currentLang}`;
          if (criterion[translatedKey]) {
            translatedCriterion[key] = criterion[translatedKey];
          }
        }
      });
      
      return translatedCriterion;
    });
  }
  
  return translatedComparison;
};

/**
 * Get translated comparisons array
 */
export const getTranslatedComparisons = (comparisons, currentLang) => {
  if (!comparisons || !Array.isArray(comparisons) || currentLang === 'en') {
    return comparisons;
  }
  
  return comparisons.map(comparison => getTranslatedComparison(comparison, currentLang));
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};

// Default export
const translateAPI = {
  getTranslatedField,
  getTranslatedProduct,
  getTranslatedProducts,
  getTranslatedBundle,
  getTranslatedBundles,
  getTranslatedComparison,
  getTranslatedComparisons,
  clearTranslationCache
};

export default translateAPI;
