# 🌐 Multilingual API Integration Guide

Complete guide for using the SSKCW API v3.0 with full multilingual support.

---

## 📋 Overview

Your fitness website now fully supports the SSKCW API v3.0 multilingual features:

- ✅ **3 Languages**: English (EN), Hindi (HI), Marathi (MR)
- ✅ **Auto-translation**: Products automatically display in selected language
- ✅ **50+ Translated Fields**: All product content, health info, and marketing text
- ✅ **New Endpoints**: Bundles, Comparisons, Categories, Shop, Stats
- ✅ **Zero Performance Impact**: Uses pre-translated API fields (no runtime translation)

---

## 🚀 How It Works

### 1. Language Detection

The system uses `i18next` to detect and manage the current language:

```javascript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
const currentLanguage = i18n.language; // 'en', 'hi', or 'mr'
```

### 2. Automatic Translation

When fetching products, the system automatically translates them:

```javascript
import { getProducts } from '../services/api';
import { getTranslatedProducts } from '../utils/translateAPI';

// Fetch products
const data = await getProducts();

// Translate based on current language
const translatedProducts = getTranslatedProducts(data, i18n.language);
```

### 3. API Field Pattern

The API provides fields in this pattern:

```json
{
  "title": "Riyansh Amrit Juice",           // English (default)
  "title_hi": "रियांश अमृत जूस",            // Hindi
  "title_mr": "रियांश अमृत जूस",            // Marathi
  
  "description_en": "Full English text...",  // Explicit English
  "description_hi": "पूर्ण हिंदी पाठ...",    // Hindi
  "description_mr": "संपूर्ण मराठी मजकूर...", // Marathi
  
  "benefits": ["Immunity boost", "Energy"],  // English array
  "benefits_hi": ["इम्यूनिटी बूस्ट", "ऊर्जा"], // Hindi array
  "benefits_mr": ["रोगप्रतिकारक शक्ती", "ऊर्जा"] // Marathi array
}
```

---

## 📦 Available API Functions

### Core Product Functions

```javascript
import { 
  getProducts,           // Get all products (basic info)
  getProductById,        // Get single product (full details)
  getShopProducts,       // Get products with full details + filters
  getCategories,         // Get categories with stats
  getBundles,            // Get product bundles
  getComparisons,        // Get product comparisons
  getStats,              // Get API statistics
  createOrder,           // Create new order
  createLead             // Create new lead
} from '../services/api';
```

### Translation Functions

```javascript
import { 
  getTranslatedProduct,      // Translate single product
  getTranslatedProducts,     // Translate product array
  getTranslatedBundle,       // Translate single bundle
  getTranslatedBundles,      // Translate bundle array
  getTranslatedComparison,   // Translate single comparison
  getTranslatedComparisons,  // Translate comparison array
  getTranslatedField         // Get specific translated field
} from '../utils/translateAPI';
```

---

## 🎯 Usage Examples

### Example 1: Product Listing with Translation

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProducts } from '../services/api';
import { getTranslatedProducts } from '../utils/translateAPI';

const ProductList = () => {
  const { i18n } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [i18n.language]); // Re-fetch when language changes

  const fetchProducts = async () => {
    const data = await getProducts();
    const translated = getTranslatedProducts(data, i18n.language);
    setProducts(translated);
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};
```

### Example 2: Product Detail with All Fields

```javascript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProductById } from '../services/api';
import { getTranslatedProduct } from '../utils/translateAPI';

const ProductDetail = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id, i18n.language]);

  const fetchProduct = async () => {
    const data = await getProductById(id);
    const translated = getTranslatedProduct(data, i18n.language);
    setProduct(translated);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      
      {/* Health Information */}
      <h2>Diseases Treated</h2>
      <ul>
        {product.diseases_treated?.map((disease, i) => (
          <li key={i}>{disease}</li>
        ))}
      </ul>
      
      {/* Benefits */}
      <h2>Benefits</h2>
      <ul>
        {product.benefits?.map((benefit, i) => (
          <li key={i}>{benefit}</li>
        ))}
      </ul>
      
      {/* Usage Guidelines */}
      <h2>Who Should Use</h2>
      <p>{product.who_should_use}</p>
      
      <h2>Precautions</h2>
      <p>{product.precautions}</p>
    </div>
  );
};
```

### Example 3: Shop with Filters

```javascript
import { getShopProducts } from '../services/api';
import { getTranslatedProducts } from '../utils/translateAPI';

const fetchDiscountedProducts = async () => {
  const data = await getShopProducts({
    has_discount: true,
    sort: 'price',
    order: 'asc',
    limit: 10
  });
  
  const translated = getTranslatedProducts(
    data.products, 
    i18n.language
  );
  
  return translated;
};
```

### Example 4: Categories Sidebar

```javascript
import { getCategories } from '../services/api';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.name}>
          <h3>{cat.name}</h3>
          <p>{cat.product_count} products</p>
          <p>₹{cat.min_price} - ₹{cat.max_price}</p>
        </div>
      ))}
    </div>
  );
};
```

### Example 5: Product Bundles

```javascript
import { getBundles } from '../services/api';
import { getTranslatedBundles } from '../utils/translateAPI';

const BundlesPage = () => {
  const { i18n } = useTranslation();
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundles = async () => {
      const data = await getBundles();
      const translated = getTranslatedBundles(
        data.bundles, 
        i18n.language
      );
      setBundles(translated);
    };
    fetchBundles();
  }, [i18n.language]);

  return (
    <div>
      {bundles.map(bundle => (
        <div key={bundle.id}>
          <h2>{bundle.title}</h2>
          <p>{bundle.description}</p>
          <p className="tagline">{bundle.tagline}</p>
          <div>
            <span className="original">₹{bundle.original_price}</span>
            <span className="bundle">₹{bundle.bundle_price}</span>
            <span className="save">Save ₹{bundle.savings}</span>
          </div>
          <p>Best for: {bundle.best_for?.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};
```

---

## 🔧 Translated Fields Reference

### Basic Info
- `title`, `category`, `sub_category`

### Content
- `description`, `trigger`, `short_description`
- `what_is_it`, `works_for`

### Health Information
- `diseases_treated` (array)
- `symptoms_relief` (array)
- `target_conditions` (array)
- `body_parts_affected` (array)
- `health_benefits`

### Usage & Safety
- `treatment_duration`
- `when_to_expect_results`
- `who_can_benefit`
- `who_should_use`
- `who_should_not_use`
- `precautions`
- `side_effects`
- `warnings`

### Product Details
- `benefits` (array)
- `ingredients` (array)
- `composition`
- `package_contents`
- `storage_instructions`
- `shelf_life`

### Marketing
- `tags` (array)
- `certifications` (array)
- `seo_title`
- `seo_description`

### Support
- `availability`
- `return_policy`
- `delivery_time`
- `effectiveness`

### FAQ
- `faq` (array of {question, answer})

---

## 🎨 UI Integration

### Language Switcher

Already implemented in `LanguageSwitcher.js`:

```javascript
<button onClick={() => i18n.changeLanguage('en')}>English</button>
<button onClick={() => i18n.changeLanguage('hi')}>हिंदी</button>
<button onClick={() => i18n.changeLanguage('mr')}>मराठी</button>
```

### Display Translated Content

```javascript
// Automatic - just use the field
<h1>{product.title}</h1>
<p>{product.description}</p>

// Arrays
{product.benefits?.map(benefit => <li>{benefit}</li>)}

// Conditional
{product.diseases_treated && (
  <div>
    <h3>Treats:</h3>
    {product.diseases_treated.map(d => <span>{d}</span>)}
  </div>
)}
```

---

## 🔍 API Query Parameters

### Products & Shop Endpoints

```javascript
// Search
?search=amrit

// Filter by category
?category=Health%20Care

// Filter by sub-category
?sub_category=Immunity%20Booster

// Price range
?min_price=500&max_price=2000

// Stock filter
?in_stock=true

// Discount filter
?has_discount=true

// Sorting
?sort=price&order=asc

// Pagination
?page=1&limit=10

// Combined
?category=Health%20Care&has_discount=true&sort=price&order=asc&limit=20
```

---

## 📊 API Response Structure

### Products List Response

```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "meta": {
    "total_products": 18,
    "filtered_count": 5,
    "returned_count": 5,
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_pages": 1
    }
  },
  "products": [...]
}
```

### Single Product Response

```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "product": {
    "product_id": "prod_1774958390504",
    "title": "Riyansh Amrit Juice",
    "title_hi": "रियांश अमृत जूस",
    "title_mr": "रियांश अमृत जूस",
    ...
  }
}
```

---

## ⚡ Performance Tips

1. **Use Pre-translated Fields**: The API provides translations - no runtime translation needed
2. **Cache Translations**: Translation utility caches results automatically
3. **Lazy Load**: Use pagination for large product lists
4. **Re-fetch on Language Change**: Always re-fetch when language changes

```javascript
useEffect(() => {
  fetchProducts();
}, [i18n.language]); // ✅ Re-fetch on language change
```

---

## 🐛 Troubleshooting

### Issue: Translations not showing

**Solution**: Check if API is returning translated fields:

```javascript
console.log('Product data:', product);
console.log('Has Hindi title:', product.title_hi);
console.log('Current language:', i18n.language);
```

### Issue: Mixed languages

**Solution**: Ensure you're using `getTranslatedProduct()`:

```javascript
// ❌ Wrong
setProduct(apiData);

// ✅ Correct
const translated = getTranslatedProduct(apiData, i18n.language);
setProduct(translated);
```

### Issue: Arrays not translating

**Solution**: Check array field naming:

```javascript
// API provides:
benefits_hi: ["हिंदी", "लाभ"]

// Translation utility handles this automatically
const translated = getTranslatedProduct(product, 'hi');
console.log(translated.benefits); // ["हिंदी", "लाभ"]
```

---

## 📝 Testing Checklist

- [ ] Products display in English by default
- [ ] Switching to Hindi shows Hindi text
- [ ] Switching to Marathi shows Marathi text
- [ ] Arrays (benefits, diseases) translate correctly
- [ ] Product detail page shows all translated fields
- [ ] Search works in all languages
- [ ] Category filters work
- [ ] Order form captures correct product title
- [ ] FAQ translates properly
- [ ] Bundles and comparisons translate

---

## 🎯 Next Steps

1. **Test All Languages**: Switch between EN/HI/MR and verify all pages
2. **Add More Endpoints**: Implement bundles and comparisons pages
3. **Optimize Performance**: Add caching for frequently accessed products
4. **SEO**: Use translated `seo_title` and `seo_description` for meta tags
5. **Analytics**: Track which language users prefer

---

## 📞 Support

- **API Documentation**: See `API_STRUCTURE_DOCUMENTATION.md`
- **API Base URL**: `https://sskcw-api.vercel.app/api`
- **GitHub**: https://github.com/adigho777-lang/api-of-sskcw

---

**Last Updated**: April 2026  
**API Version**: 3.0.0 (Multilingual Edition)  
**Integration Status**: ✅ Complete
