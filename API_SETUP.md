# API Integration Setup Guide

## 🔌 API Configuration

Your fitness website now connects to an external REST API instead of Firebase.

---

## 📋 Quick Setup (3 Steps)

### Step 1: Configure API URL (1 min)

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your API base URL:

```env
REACT_APP_API_BASE_URL=https://your-api-url.com/api
REACT_APP_WHATSAPP_NUMBER=919876543210
```

**Example:**
```env
REACT_APP_API_BASE_URL=https://api.fitlife.com/v1
REACT_APP_WHATSAPP_NUMBER=919876543210
```

### Step 2: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Start again
npm start
```

### Step 3: Test API Connection

Visit http://localhost:3000 and check:
- Products load from API
- Order form submits to API
- Lead form submits to API

---

## 🔧 API Endpoints

Your frontend expects these API endpoints:

### 1. Get All Products
```
GET /api/products

Response:
{
  "products": [
    {
      "id": "1",
      "title": "Protein Powder",
      "description": "High quality whey protein",
      "price": 2999,
      "discountPrice": 3999,
      "imageUrl": "https://...",
      "benefits": "Muscle growth\nRecovery\nStrength",
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
```
GET /api/products/:id

Response:
{
  "id": "1",
  "title": "Protein Powder",
  "description": "High quality whey protein",
  "price": 2999,
  "discountPrice": 3999,
  "imageUrl": "https://...",
  "benefits": ["Muscle growth", "Recovery", "Strength"],
  "usage": "Mix 1 scoop with water",
  "category": "supplements"
}
```

### 3. Create Order
```
POST /api/orders

Request Body:
{
  "name": "John Doe",
  "phone": "9876543210",
  "address": "123 Main St, City",
  "productId": "1",
  "productTitle": "Protein Powder",
  "price": 2999
}

Response:
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": "ORD123"
}
```

### 4. Create Lead
```
POST /api/leads

Request Body:
{
  "name": "Jane Smith",
  "phone": "9876543210",
  "goal": "Weight Loss"
}

Response:
{
  "success": true,
  "message": "Lead created successfully",
  "leadId": "LEAD123"
}
```

### 5. Search Products (Optional)
```
GET /api/products?search=protein

Response: Same as Get All Products
```

### 6. Filter by Category (Optional)
```
GET /api/products?category=supplements

Response: Same as Get All Products
```

---

## 📁 File Structure

```
src/
├── config/
│   └── api.config.js          # API configuration
├── services/
│   └── api.js                 # API service layer
├── components/
│   ├── ProductSection.js      # Fetches products from API
│   ├── OrderModal.js          # Submits orders to API
│   └── ContactForm.js         # Submits leads to API
```

---

## 🔍 API Service Functions

Located in `src/services/api.js`:

```javascript
// Get all products
const products = await getProducts();

// Get single product
const product = await getProductById('123');

// Create order
const order = await createOrder({
  name: 'John',
  phone: '9876543210',
  address: '123 Main St',
  productId: '1',
  productTitle: 'Protein Powder',
  price: 2999
});

// Create lead
const lead = await createLead({
  name: 'Jane',
  phone: '9876543210',
  goal: 'Weight Loss'
});

// Search products
const results = await searchProducts('protein');

// Filter by category
const filtered = await filterProductsByCategory('supplements');
```

---

## 🎨 UI Features

### Loading States
- Skeleton loading for products
- Loading text on buttons
- Disabled state during API calls

### Error Handling
- Error messages displayed to user
- Retry button on failure
- Console logging for debugging

### Success States
- Success message after order
- Success message after lead submission
- Auto-close modals

---

## 🧪 Testing API Integration

### Test with Mock API

If your API isn't ready, use a mock API service:

**Option 1: JSON Server**
```bash
npm install -g json-server

# Create db.json
{
  "products": [
    {
      "id": "1",
      "title": "Protein Powder",
      "price": 2999,
      "imageUrl": "https://via.placeholder.com/300",
      "description": "High quality protein",
      "benefits": "Muscle growth\nRecovery"
    }
  ],
  "orders": [],
  "leads": []
}

# Start mock server
json-server --watch db.json --port 3001

# Update .env
REACT_APP_API_BASE_URL=http://localhost:3001
```

**Option 2: MockAPI.io**
1. Go to https://mockapi.io
2. Create project
3. Create endpoints: products, orders, leads
4. Update .env with your MockAPI URL

---

## 🔒 API Security

### CORS Configuration

Your API must allow requests from your frontend domain:

```javascript
// Backend CORS configuration example
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

### Authentication (Optional)

If your API requires authentication:

1. Update `src/services/api.js`:
```javascript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

2. Store token after login:
```javascript
localStorage.setItem('authToken', 'your-token');
```

---

## 🐛 Troubleshooting

### Issue: Products not loading

**Check:**
1. API URL is correct in `.env`
2. API is running and accessible
3. CORS is configured on backend
4. Check browser console for errors
5. Check Network tab in DevTools

**Solution:**
```bash
# Test API directly
curl https://your-api-url.com/api/products

# Check .env file
cat .env

# Restart server
npm start
```

### Issue: CORS Error

**Error:** "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

**Solution:**
- Configure CORS on your backend
- Add your frontend domain to allowed origins

### Issue: 404 Not Found

**Check:**
- API endpoint URLs match exactly
- Base URL doesn't have trailing slash
- Endpoint paths are correct

### Issue: Network Error

**Check:**
- API server is running
- API URL is accessible
- No firewall blocking requests
- Internet connection is active

---

## 📊 API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly message"
}
```

The frontend handles both formats automatically.

---

## 🚀 Deployment

### Environment Variables

Set these in your hosting platform:

**Vercel/Netlify:**
```
REACT_APP_API_BASE_URL=https://api.yoursite.com/api
REACT_APP_WHATSAPP_NUMBER=919876543210
```

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
build/
```

---

## 📝 API Requirements Checklist

Before going live, ensure your API has:

- [ ] GET /api/products endpoint
- [ ] GET /api/products/:id endpoint
- [ ] POST /api/orders endpoint
- [ ] POST /api/leads endpoint
- [ ] CORS configured for your domain
- [ ] Proper error responses
- [ ] Response time < 2 seconds
- [ ] SSL certificate (HTTPS)
- [ ] Rate limiting (optional)
- [ ] API documentation

---

## 🎯 Next Steps

1. **Configure API URL** in `.env`
2. **Test API endpoints** with Postman/curl
3. **Start development server** and test
4. **Deploy frontend** to hosting
5. **Update API CORS** with production domain

---

## 📞 Support

**API Issues:**
- Check API logs on backend
- Test endpoints with Postman
- Verify request/response format

**Frontend Issues:**
- Check browser console
- Check Network tab in DevTools
- Review `src/services/api.js`

---

**Your frontend is ready to connect to any REST API!** 🔌

Just update the `.env` file with your API URL and you're good to go!
