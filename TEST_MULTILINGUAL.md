# 🧪 Multilingual Integration - Test Guide

Quick testing guide to verify multilingual API integration is working correctly.

---

## ✅ Pre-Test Checklist

- [ ] API is accessible: https://sskcw-api.vercel.app/api
- [ ] Website is running: `npm start`
- [ ] Browser console is open (F12)

---

## 🧪 Test Cases

### Test 1: API Connection ✅

**Steps:**
1. Open browser console
2. Go to Network tab
3. Load homepage
4. Check for API calls to `/products`

**Expected:**
- ✅ Status 200
- ✅ Response contains products array
- ✅ Products have `title_hi` and `title_mr` fields

**Verify in Console:**
```javascript
// Open console and run:
fetch('https://sskcw-api.vercel.app/api/products')
  .then(r => r.json())
  .then(data => {
    console.log('Total products:', data.products?.length);
    console.log('First product:', data.products?.[0]);
    console.log('Has Hindi title:', !!data.products?.[0]?.title_hi);
    console.log('Has Marathi title:', !!data.products?.[0]?.title_mr);
  });
```

---

### Test 2: Language Switching 🌐

**Steps:**
1. Go to homepage
2. Note the product titles (should be in English)
3. Click "हिंदी" in language switcher
4. Observe product titles change to Hindi
5. Click "मराठी" in language switcher
6. Observe product titles change to Marathi
7. Click "English" to return

**Expected:**
- ✅ Titles change immediately
- ✅ Descriptions change
- ✅ All text content changes
- ✅ No page reload needed

**Verify in Console:**
```javascript
// Check current language
console.log('Current language:', localStorage.getItem('i18nextLng'));
```

---

### Test 3: Product List Translation 📦

**Steps:**
1. Go to Products page (`/products`)
2. Switch to Hindi
3. Check product cards

**Expected:**
- ✅ Product titles in Hindi
- ✅ Descriptions in Hindi
- ✅ Category badges in Hindi
- ✅ Disease tags in Hindi

**Verify in Console:**
```javascript
// Check if products are translated
const productCards = document.querySelectorAll('[class*="product"]');
console.log('Product cards found:', productCards.length);
```

---

### Test 4: Product Detail Translation 📄

**Steps:**
1. Click on any product
2. Switch to Hindi
3. Scroll through entire page

**Expected:**
- ✅ Title in Hindi
- ✅ Description in Hindi
- ✅ Benefits list in Hindi
- ✅ Diseases treated in Hindi
- ✅ Symptoms relief in Hindi
- ✅ Who should use in Hindi
- ✅ Precautions in Hindi
- ✅ FAQ in Hindi

**Verify Specific Fields:**
```javascript
// In browser console on product detail page
console.log('Product title:', document.querySelector('h1')?.textContent);
```

---

### Test 5: Search in Multiple Languages 🔍

**Steps:**
1. Go to Products page
2. Switch to English
3. Search for "Amrit"
4. Note results
5. Switch to Hindi
6. Search for "अमृत"
7. Compare results

**Expected:**
- ✅ Search works in all languages
- ✅ Results show in current language
- ✅ Relevant products found

---

### Test 6: Order Form Translation 🛒

**Steps:**
1. Click "Order Now" on any product
2. Check modal content
3. Switch language
4. Check if modal updates

**Expected:**
- ✅ Product title in correct language
- ✅ Form labels translated (via i18n)
- ✅ Button text translated

---

### Test 7: Array Fields Translation 📋

**Steps:**
1. Open any product detail page
2. Switch to Hindi
3. Check these sections:
   - Benefits list
   - Diseases treated tags
   - Symptoms relief list
   - Ingredients list
   - Body parts affected

**Expected:**
- ✅ All array items in Hindi
- ✅ No English text mixed in
- ✅ Proper Hindi characters displayed

**Verify in Console:**
```javascript
// Check if arrays are translated
fetch('https://sskcw-api.vercel.app/api/products/prod_1774958390504')
  .then(r => r.json())
  .then(data => {
    const product = data.product;
    console.log('Benefits (EN):', product.benefits);
    console.log('Benefits (HI):', product.benefits_hi);
    console.log('Benefits (MR):', product.benefits_mr);
  });
```

---

### Test 8: FAQ Translation ❓

**Steps:**
1. Find a product with FAQ section
2. Switch to Hindi
3. Check FAQ questions and answers

**Expected:**
- ✅ Questions in Hindi
- ✅ Answers in Hindi
- ✅ Proper formatting maintained

---

### Test 9: Performance Test ⚡

**Steps:**
1. Open browser DevTools → Performance tab
2. Start recording
3. Switch language from English to Hindi
4. Stop recording
5. Check timeline

**Expected:**
- ✅ Language switch < 100ms
- ✅ No API calls triggered (uses existing data)
- ✅ Smooth transition
- ✅ No layout shift

---

### Test 10: New Endpoints Test 🆕

**Test Categories Endpoint:**
```javascript
fetch('https://sskcw-api.vercel.app/api/categories')
  .then(r => r.json())
  .then(data => {
    console.log('Categories:', data.categories);
    console.log('Total categories:', data.meta.total_categories);
  });
```

**Test Shop Endpoint:**
```javascript
fetch('https://sskcw-api.vercel.app/api/shop?has_discount=true&limit=5')
  .then(r => r.json())
  .then(data => {
    console.log('Shop products:', data.products);
    console.log('Has full details:', !!data.products[0]?.description_en);
  });
```

**Test Bundles Endpoint:**
```javascript
fetch('https://sskcw-api.vercel.app/api/bundles')
  .then(r => r.json())
  .then(data => {
    console.log('Bundles:', data.bundles);
    console.log('First bundle:', data.bundles?.[0]);
  });
```

**Test Stats Endpoint:**
```javascript
fetch('https://sskcw-api.vercel.app/api/stats')
  .then(r => r.json())
  .then(data => {
    console.log('API Stats:', data.stats);
  });
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Translations Not Showing

**Symptoms:**
- Products still show in English after switching to Hindi
- Some fields translate, others don't

**Debug:**
```javascript
// Check translation utility
import { getTranslatedProduct } from './utils/translateAPI';

const product = { 
  title: "Test", 
  title_hi: "परीक्षण" 
};

const translated = getTranslatedProduct(product, 'hi');
console.log('Translated title:', translated.title); // Should be "परीक्षण"
```

**Solution:**
- Ensure `getTranslatedProduct()` is called
- Check `i18n.language` is correct
- Verify API returns translated fields

---

### Issue 2: Language Not Persisting

**Symptoms:**
- Language resets to English on page refresh

**Debug:**
```javascript
console.log('Stored language:', localStorage.getItem('i18nextLng'));
```

**Solution:**
- Check i18n config has `localStorage` detection
- Clear browser cache and try again

---

### Issue 3: Mixed Languages

**Symptoms:**
- Some text in Hindi, some in English

**Debug:**
```javascript
// Check which fields are translated
const product = await getProductById('prod_123');
console.log('Title:', product.title);
console.log('Title HI:', product.title_hi);
console.log('Description:', product.description);
console.log('Description HI:', product.description_hi);
```

**Solution:**
- Some fields might not have translations in API
- Check API response for missing fields
- Fallback to English is expected behavior

---

### Issue 4: API Not Responding

**Symptoms:**
- Products not loading
- Network errors in console

**Debug:**
```javascript
// Test API directly
fetch('https://sskcw-api.vercel.app/api')
  .then(r => r.json())
  .then(data => console.log('API Status:', data))
  .catch(err => console.error('API Error:', err));
```

**Solution:**
- Check internet connection
- Verify API URL in admin settings
- Check CORS headers

---

## 📊 Test Results Template

Copy this and fill in your results:

```
=== MULTILINGUAL INTEGRATION TEST RESULTS ===

Date: _______________
Tester: _______________

Test 1: API Connection          [ ] Pass [ ] Fail
Test 2: Language Switching      [ ] Pass [ ] Fail
Test 3: Product List            [ ] Pass [ ] Fail
Test 4: Product Detail          [ ] Pass [ ] Fail
Test 5: Search                  [ ] Pass [ ] Fail
Test 6: Order Form              [ ] Pass [ ] Fail
Test 7: Array Fields            [ ] Pass [ ] Fail
Test 8: FAQ                     [ ] Pass [ ] Fail
Test 9: Performance             [ ] Pass [ ] Fail
Test 10: New Endpoints          [ ] Pass [ ] Fail

Overall Status: [ ] All Pass [ ] Some Fail

Notes:
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## ✅ Success Criteria

Integration is successful if:

- ✅ All 10 tests pass
- ✅ No console errors
- ✅ Smooth language switching
- ✅ All fields translate correctly
- ✅ Performance is good (< 100ms switch)
- ✅ No mixed languages
- ✅ Search works in all languages
- ✅ Order form captures correct language

---

## 🎯 Quick Smoke Test (2 minutes)

If you're short on time, run this quick test:

1. **Load homepage** - Products should show
2. **Switch to Hindi** - Text should change
3. **Click a product** - Detail page should be in Hindi
4. **Switch to Marathi** - Everything should change to Marathi
5. **Click Order** - Modal should show Marathi product name
6. **Switch to English** - Everything back to English

If all 6 steps work → ✅ Integration is working!

---

## 📞 Support

If tests fail:
1. Check browser console for errors
2. Verify API is accessible
3. Check `MULTILINGUAL_API_INTEGRATION.md` for troubleshooting
4. Review code in `src/utils/translateAPI.js`

---

**Happy Testing! 🎉**

Remember: The integration is already complete and working. These tests are just to verify everything is functioning as expected.
