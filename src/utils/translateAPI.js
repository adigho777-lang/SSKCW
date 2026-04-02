// Translation utility for API data
// Uses browser's built-in translation or can be extended with Google Translate API

const translationCache = new Map();

/**
 * Translate text using browser's built-in capabilities
 * For production, integrate with Google Translate API or LibreTranslate
 */
export const translateText = async (text, targetLang) => {
  // If target is English or text is empty, return as is
  if (!text || targetLang === 'en') {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    // For now, return original text
    // In production, integrate with translation API:
    
    // Option 1: Google Translate API (paid)
    // const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     q: text,
    //     target: targetLang,
    //     source: 'en'
    //   })
    // });
    
    // Option 2: LibreTranslate (free, self-hosted)
    // const response = await fetch('https://libretranslate.de/translate', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     q: text,
    //     source: 'en',
    //     target: targetLang
    //   }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    
    // For demo, return original text
    // Cache the result
    translationCache.set(cacheKey, text);
    return text;
    
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original on error
  }
};

/**
 * Translate product data
 */
export const translateProduct = async (product, targetLang) => {
  if (targetLang === 'en' || !product) {
    return product;
  }

  // Check if product already has translated fields
  if (targetLang === 'mr' && product.description_mr) {
    return {
      ...product,
      title: product.title_mr || product.title,
      description: product.description_mr,
      short_description: product.short_description_mr || product.short_description
    };
  }

  if (targetLang === 'hi' && product.description_hi) {
    return {
      ...product,
      title: product.title_hi || product.title,
      description: product.description_hi,
      short_description: product.short_description_hi || product.short_description
    };
  }

  // If no pre-translated data, use API translation
  try {
    const translatedProduct = { ...product };
    
    // Translate key fields
    if (product.title) {
      translatedProduct.title = await translateText(product.title, targetLang);
    }
    
    if (product.description) {
      translatedProduct.description = await translateText(product.description, targetLang);
    }
    
    if (product.short_description) {
      translatedProduct.short_description = await translateText(product.short_description, targetLang);
    }
    
    // Translate arrays
    if (product.benefits && Array.isArray(product.benefits)) {
      translatedProduct.benefits = await Promise.all(
        product.benefits.map(benefit => translateText(benefit, targetLang))
      );
    }
    
    if (product.diseases_treated && Array.isArray(product.diseases_treated)) {
      translatedProduct.diseases_treated = await Promise.all(
        product.diseases_treated.map(disease => translateText(disease, targetLang))
      );
    }
    
    if (product.symptoms_relief && Array.isArray(product.symptoms_relief)) {
      translatedProduct.symptoms_relief = await Promise.all(
        product.symptoms_relief.map(symptom => translateText(symptom, targetLang))
      );
    }
    
    return translatedProduct;
  } catch (error) {
    console.error('Error translating product:', error);
    return product; // Return original on error
  }
};

/**
 * Translate array of products
 */
export const translateProducts = async (products, targetLang) => {
  if (targetLang === 'en' || !products || !Array.isArray(products)) {
    return products;
  }

  try {
    return await Promise.all(
      products.map(product => translateProduct(product, targetLang))
    );
  } catch (error) {
    console.error('Error translating products:', error);
    return products;
  }
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
};

export default {
  translateText,
  translateProduct,
  translateProducts,
  clearTranslationCache
};
