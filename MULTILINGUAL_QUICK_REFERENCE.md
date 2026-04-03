# 🌐 Multilingual API - Quick Reference Card

Fast reference for using SSKCW API v3.0 multilingual features.

---

## 🚀 Quick Start

```javascript
import { useTranslation } from 'react-i18next';
import { getProducts } from '../services/api';
import { getTranslatedProducts } from '../utils/translateAPI';

const { i18n } = useTranslation();

// Fetch and translate
const data = await getProducts();
const products = getTranslatedProducts(data, i18n.language);
```

---

## 📦 Import Statements

```javascript
// API Functions
import { 
  getProducts,           // Basic product list
  getProductById,        // Full product details
  getShopProducts,       // Full details + filters
  getCategories,         // Categories with stats
  getBundles,            // Product bundles
  getComparisons,        // Product comparisons
  createOrder,           // Create order
  createLead             // Create lead
} from '../services/api';

// Translation Functions
import { 
  getTranslatedProduct,      // Single product
  getTranslatedProducts,     // Product array
  getTranslatedBundle,       // Single bundle
  getTranslatedBundles,      // Bundle array
  getTranslatedComparison,   // Single comparison
  getTranslatedComparisons   // Comparison array
} from '../utils/translateAPI';
```

---

## 🎯 Common Patterns

### Pattern 1: Product List

```javascript
const [products, setProducts] = useState([]);
const { i18n } = useTranslation();

useEffect(() => {
  const fetch = async () => {
    const data = await getProducts();
    const translated = getTranslatedProducts(data, i18n.language);
    setProducts(translated);
  };
  fetch();
}, [i18n.language]);
```

### Pattern 2: Product Detail

```javascript
const [product, setProduct] = useState(null);
const { id } = useParams();
const { i18n } = useTranslation();

useEffect(() => {
  const fetch = async () => {
    const data = await getProductById(id);
    const translated = getTranslatedProduct(data, i18n.language);
    setProduct(translated);
  };
  fetch();
}, [id, i18n.language]);
```

### Pattern 3: Shop with Filters

```javascript
const data = await getShopProducts({
  category: 'Health Care',
  has_discount: true,
  sort: 'price',
  order: 'asc',
  limit: 10
});
const products = getTranslatedProducts(data.products, i18n.language);
```

---

## 🔤 Translated Fields

### Text Fields
```javascript
product.title              // Auto-translated
product.description        // Auto-translated
product.category           // Auto-translated
product.trigger            // Auto-translated
product.who_should_use     // Auto-translated
product.precautions        // Auto-translated
```

### Array Fields
```javascript
product.benefits           // Auto-translated array
product.diseases_treated   // Auto-translated array
product.symptoms_relief    // Auto-translated array
product.ingredients        // Auto-translated array
product.tags               // Auto-translated array
```

### FAQ
```javascript
product.faq                // Auto-translated array
// Each item: { question: "...", answer: "..." }
```

---

## 🌍 Language Codes

```javascript
'en'  // English (default)
'hi'  // Hindi (हिंदी)
'mr'  // Marathi (मराठी)
```

---

## 🔍 API Query Examples

```javascript
// Search
getProducts({ search: 'amrit' })

// Category filter
getProducts({ category: 'Health Care' })

// Price range
getProducts({ min_price: 500, max_price: 2000 })

// Discounted only
getShopProducts({ has_discount: true })

// Combined
getShopProducts({
  category: 'Health Care',
  has_discount: true,
  sort: 'price',
  order: 'asc',
  page: 1,
  limit: 10
})
```

---

## 📋 Field Reference

| Category | Fields |
|----------|--------|
| **Basic** | title, category, sub_category |
| **Content** | description, trigger, short_description, what_is_it, works_for |
| **Health** | diseases_treated, symptoms_relief, health_benefits, body_parts_affected |
| **Usage** | who_should_use, who_should_not_use, precautions, side_effects |
| **Product** | benefits, ingredients, composition, package_contents |
| **Marketing** | tags, certifications, seo_title, seo_description |

---

## ⚡ Performance Tips

```javascript
// ✅ Good - Re-fetch on language change
useEffect(() => {
  fetchProducts();
}, [i18n.language]);

// ✅ Good - Use translated products
const translated = getTranslatedProducts(data, i18n.language);

// ❌ Bad - Don't translate manually
const title = i18n.language === 'hi' ? product.title_hi : product.title;

// ❌ Bad - Don't forget to translate
setProducts(apiData); // Missing translation!
```

---

## 🐛 Debug Checklist

```javascript
// Check current language
console.log('Language:', i18n.language);

// Check API response
console.log('API data:', data);

// Check translated data
console.log('Translated:', translated);

// Check specific field
console.log('Title (EN):', product.title);
console.log('Title (HI):', product.title_hi);
console.log('Title (MR):', product.title_mr);
```

---

## 📱 UI Display

```jsx
{/* Simple text */}
<h1>{product.title}</h1>
<p>{product.description}</p>

{/* Arrays */}
<ul>
  {product.benefits?.map((benefit, i) => (
    <li key={i}>{benefit}</li>
  ))}
</ul>

{/* Conditional */}
{product.diseases_treated && (
  <div>
    {product.diseases_treated.map(d => (
      <span key={d}>{d}</span>
    ))}
  </div>
)}

{/* FAQ */}
{product.faq?.map((item, i) => (
  <div key={i}>
    <h3>{item.question}</h3>
    <p>{item.answer}</p>
  </div>
))}
```

---

## 🎨 Language Switcher

```jsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  return (
    <div>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
      <button onClick={() => i18n.changeLanguage('hi')}>
        हिंदी
      </button>
      <button onClick={() => i18n.changeLanguage('mr')}>
        मराठी
      </button>
    </div>
  );
};
```

---

## 🔗 Related Docs

- **Full Guide**: [MULTILINGUAL_API_INTEGRATION.md](MULTILINGUAL_API_INTEGRATION.md)
- **API Docs**: See API documentation file
- **i18n Config**: `src/i18n/config.js`
- **Translation Utility**: `src/utils/translateAPI.js`

---

**Last Updated**: April 2026  
**API Version**: 3.0.0
