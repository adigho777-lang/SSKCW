# 🔌 API Integration Guide - Dynamic Configuration

## ✅ What's New

Your fitness website now supports **dynamic API configuration** through the admin panel!

### Key Features:
- ✅ Configure API URL from admin panel
- ✅ Test API connection before saving
- ✅ Automatic data refresh when API changes
- ✅ No code changes needed to switch APIs
- ✅ localStorage-based configuration
- ✅ Fallback to environment variables

---

## 🚀 Quick Start (3 Steps)

### Step 1: Login to Admin Panel

```
1. Go to http://localhost:3000/admin
2. Login with Phone OTP or Google
3. Navigate to "API Settings" in sidebar
```

### Step 2: Configure API URL

```
1. Enter your Vercel API URL:
   Example: https://your-project.vercel.app/api

2. Click "Test API Connection"
   - If successful: ✓ API Connected Successfully!
   - If failed: Shows error message

3. Click "Save API URL"
   - Page will reload
   - All data now loads from your API
```

### Step 3: Verify

```
1. Go to homepage
2. Check if products load from your API
3. Try placing an order
4. Check admin orders page
```

---

## 📁 File Structure

```
src/
├── config/
│   └── api.config.js          # Dynamic API configuration
├── services/
│   └── api.js                 # API service with dynamic URL
├── pages/admin/
│   └── ApiSettings.js         # API configuration UI
└── components/
    ├── ProductSection.js      # Fetches from API
    ├── OrderModal.js          # Submits to API
    └── ContactForm.js         # Submits to API
```

---

## 🔧 How It Works

### Priority System

```
1. localStorage (set by admin) → HIGHEST PRIORITY
2. Environment variable (.env)
3. Default fallback URL
```

### Configuration Flow

```
Admin enters URL
    ↓
Test connection
    ↓
Save to localStorage
    ↓
Page reloads
    ↓
All API calls use new URL
```

---

## 🎯 API Requirements

Your Vercel API must have these endpoints:

### 1. Get Products
```http
GET /api/products

Response:
{
  "products": [
    {
      "id": "1",
      "title": "Protein Powder",
      "description": "High quality protein",
      "price": 2999,
      "discountPrice": 3999,
      "imageUrl": "https://...",
      "benefits": "Muscle growth\nRecovery",
      "category": "supplements"
    }
  ]
}

OR

[
  {
    "id": "1",
    "title": "Protein Powder",
    ...
  }
]
```

### 2. Get Single Product
```http
GET /api/products/:id

Response:
{
  "id": "1",
  "title": "Protein Powder",
  "description": "...",
  "price": 2999,
  "imageUrl": "https://...",
  "benefits": ["Muscle growth", "Recovery"]
}
```

### 3. Create Order
```http
POST /api/orders

Request:
{
  "name": "John Doe",
  "phone": "9876543210",
  "address": "123 Main St",
  "productId": "1",
  "productTitle": "Protein Powder",
  "price": 2999
}

Response:
{
  "success": true,
  "message": "Order created",
  "orderId": "ORD123"
}
```

### 4. Get Orders (Admin)
```http
GET /api/orders

Response:
{
  "orders": [
    {
      "id": "ORD123",
      "name": "John Doe",
      "phone": "9876543210",
      "address": "123 Main St",
      "productTitle": "Protein Powder",
      "status": "Pending",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 5. Create Lead
```http
POST /api/leads

Request:
{
  "name": "Jane Smith",
  "phone": "9876543210",
  "goal": "Weight Loss"
}

Response:
{
  "success": true,
  "message": "Lead created",
  "leadId": "LEAD123"
}
```

---

## 🎨 Admin Panel Features

### API Settings Page

**Location:** `/admin/api-settings`

**Features:**
1. **Current API URL Display**
   - Shows currently configured URL
   - Reads from localStorage or env

2. **API URL Input**
   - Text field to enter new URL
   - Placeholder with example
   - Validation

3. **Test Connection Button**
   - Tests API before saving
   - Shows success/error message
   - Displays number of products found

4. **Save Button**
   - Saves URL to localStorage
   - Reloads page automatically
   - Shows confirmation

5. **Reset Button**
   - Clears localStorage
   - Reverts to default/env URL
   - Reloads page

6. **API Endpoints List**
   - Shows required endpoints
   - HTTP methods
   - Descriptions

7. **Instructions**
   - Step-by-step guide
   - Clear and simple

---

## 💻 Usage Examples

### For Developers

**Set API URL via Code:**
```javascript
import { setApiBaseUrl } from './config/api.config';

// Set new API URL
setApiBaseUrl('https://new-api.vercel.app/api');
// Page will reload automatically
```

**Get Current API URL:**
```javascript
import { getCurrentApiUrl } from './config/api.config';

const currentUrl = getCurrentApiUrl();
console.log('Current API:', currentUrl);
```

**Test Connection:**
```javascript
import { testApiConnection } from './services/api';

const result = await testApiConnection();
if (result.success) {
  console.log('API is working!');
} else {
  console.error('API failed:', result.error);
}
```

---

## 🧪 Testing

### Test with Mock API

**Option 1: JSON Server**
```bash
# Install
npm install -g json-server

# Create db.json
{
  "products": [
    {
      "id": "1",
      "title": "Test Product",
      "price": 999,
      "imageUrl": "https://via.placeholder.com/300",
      "description": "Test description",
      "benefits": "Benefit 1\nBenefit 2"
    }
  ],
  "orders": [],
  "leads": []
}

# Start server
json-server --watch db.json --port 3001

# Configure in admin panel
http://localhost:3001
```

**Option 2: MockAPI.io**
```
1. Go to https://mockapi.io
2. Create project
3. Create endpoints:
   - products (GET, POST)
   - orders (GET, POST)
   - leads (POST)
4. Copy API URL
5. Configure in admin panel
```

---

## 🔒 Security

### CORS Configuration

Your Vercel API must allow requests from your frontend:

```javascript
// vercel.json or API configuration
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Issue: API URL not saving

**Solution:**
- Check browser localStorage is enabled
- Try incognito mode
- Clear browser cache

### Issue: Test connection fails

**Check:**
1. API URL is correct (no trailing slash)
2. API is deployed and running
3. CORS is configured
4. Network tab in DevTools for errors

**Test API directly:**
```bash
curl https://your-api.vercel.app/api/products
```

### Issue: Products not loading

**Check:**
1. API URL is saved correctly
2. API returns correct format
3. Browser console for errors
4. Network tab for failed requests

**Debug:**
```javascript
// Check current API URL
console.log(localStorage.getItem('api_base_url'));

// Test API
import { testApiConnection } from './services/api';
testApiConnection().then(console.log);
```

### Issue: CORS error

**Error:** "Access to fetch blocked by CORS policy"

**Solution:**
- Configure CORS on Vercel API
- Add your domain to allowed origins
- Use vercel.json configuration

---

## 📊 Environment Variables

### .env File

```env
# API Configuration
REACT_APP_API_BASE_URL=https://your-api.vercel.app/api

# WhatsApp
REACT_APP_WHATSAPP_NUMBER=919876543210
```

**Note:** Admin panel configuration overrides .env

---

## 🚀 Deployment

### Deploy Frontend

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
REACT_APP_API_BASE_URL=https://your-api.vercel.app/api
```

**Netlify:**
```bash
# Build
npm run build

# Deploy build folder
# Set environment variables in Netlify dashboard
```

### Configure Production API

1. Deploy your API to Vercel
2. Get production API URL
3. Login to admin panel
4. Go to API Settings
5. Enter production URL
6. Test and save

---

## ✅ Checklist

Before going live:

**API Setup:**
- [ ] API deployed to Vercel
- [ ] All endpoints working
- [ ] CORS configured
- [ ] SSL enabled (HTTPS)

**Frontend Setup:**
- [ ] API URL configured in admin
- [ ] Connection tested successfully
- [ ] Products loading from API
- [ ] Orders submitting to API
- [ ] Leads submitting to API

**Testing:**
- [ ] Test on localhost
- [ ] Test on production
- [ ] Test all API endpoints
- [ ] Test error handling
- [ ] Test loading states

---

## 🎯 Benefits

### For Admins:
- ✅ No code changes needed
- ✅ Switch APIs instantly
- ✅ Test before applying
- ✅ Easy to configure

### For Developers:
- ✅ Clean architecture
- ✅ Easy to maintain
- ✅ Flexible configuration
- ✅ Environment-aware

### For Users:
- ✅ Always fresh data
- ✅ Fast loading
- ✅ Reliable orders
- ✅ Smooth experience

---

## 📞 Support

**Need help?**
- Check browser console (F12)
- Check Network tab for API calls
- Test API with curl/Postman
- Review API_SETUP.md

**Common Issues:**
- CORS errors → Configure backend
- 404 errors → Check endpoint URLs
- Timeout → Check API response time
- Format errors → Check API response structure

---

**Your website is now fully API-driven!** 🎉

Just configure the API URL in admin panel and everything works automatically!
