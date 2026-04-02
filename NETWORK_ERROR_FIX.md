# 🔧 Network Error Fix Guide

## Problem: "Network Error" or CORS Error when placing order

```
Access to XMLHttpRequest at 'https://sskcw-api.vercel.app/api/orders' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

This is a **CORS (Cross-Origin Resource Sharing)** issue. The API server needs to allow requests from your frontend.

---

## 🎯 Root Cause

The API at `https://sskcw-api.vercel.app` is not configured to accept requests from `http://localhost:3000`

---

## ✅ Solution 1: Fix API (Permanent - RECOMMENDED)

**This needs to be done on the API/Backend side!**

The API owner needs to add CORS headers. See `CORS_FIX_FOR_API.md` for detailed instructions.

Quick fix for API:
```javascript
// Add to API route
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

---

## ✅ Solution 2: Use Proxy (Temporary - For Development)

**Already configured in this project!**

The `package.json` has proxy configured. Just restart the app:

```bash
# Stop the app (Ctrl+C)
npm start
```

The app will now use proxy to bypass CORS in development.

---

## ✅ Solution 3: Clear API URL from Admin Panel

If you set API URL in admin panel, clear it to use proxy:

1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.removeItem('api_base_url')
   ```
3. Refresh page (F5)

---

## 🧪 Test if Fixed

### Test 1: Check Current API URL
Open console (F12) and run:
```javascript
console.log('API URL:', localStorage.getItem('api_base_url') || '/api (proxy)')
```

Should show: `/api (proxy)` for development

### Test 2: Products Loading
1. Go to: `http://localhost:3000/products`
2. Products should load (not show error)

### Test 3: Place Order
1. Click any product "Order Now"
2. Fill form and submit
3. Should show "Order Placed Successfully!"

### Test 4: Submit Lead
1. Scroll to contact form
2. Fill name, phone, goal
3. Submit
4. Should show "Thank you! We'll contact you soon."

---

## 🚀 For Production Deployment

When deploying to production (Firebase Hosting, Vercel, etc.):

1. **Make sure API has CORS enabled** (Solution 1)
2. **Set API URL in admin panel:**
   - Login to admin
   - Go to API Settings
   - Enter: `https://sskcw-api.vercel.app/api`
   - Save

---

## 🔍 Debugging

### Check 1: API is Running
Visit in browser:
```
https://sskcw-api.vercel.app/api
```

Should show API info with `"success": true`

### Check 2: Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Try placing order
4. Check the failed request
5. Look at Response headers - should have `Access-Control-Allow-Origin`

### Check 3: Console Errors
Check browser console for detailed error messages

---

## 📝 API Request Format (For Testing)

### Order Request:
```json
POST /api/orders
{
  "name": "Customer Name",
  "phone": "9876543210",
  "address": "Full Address",
  "product_id": "prod_1774958390504",
  "product_title": "Product Name",
  "quantity": 1,
  "total_amount": 1500
}
```

### Lead Request:
```json
POST /api/leads
{
  "name": "Customer Name",
  "phone": "9876543210",
  "goal": "Weight Loss",
  "source": "website"
}
```

---

## ✅ Quick Fix Checklist

- [ ] Restart app: `npm start`
- [ ] Clear localStorage: `localStorage.removeItem('api_base_url')`
- [ ] Refresh browser (F5)
- [ ] Try placing order
- [ ] If still fails, API needs CORS fix (contact API owner)

---

## 🆘 Still Not Working?

### Option A: Contact API Owner
Ask them to enable CORS using `CORS_FIX_FOR_API.md` guide

### Option B: Use Different API
Set a different API URL that has CORS enabled

### Option C: Deploy Frontend
Deploy frontend to same domain as API (no CORS issue)

---

**Note:** The proxy solution only works in development (`npm start`). For production, API must have CORS enabled!

