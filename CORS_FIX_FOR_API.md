# 🔧 CORS Fix for API (Backend)

## Problem
Frontend getting CORS error when calling API from `http://localhost:3000`

## Solution: Add CORS Headers to API

### For Next.js API (Vercel)

Add this to your API route files:

```javascript
// pages/api/orders.js (or app/api/orders/route.js)

export async function POST(request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  // Your actual API logic here
  try {
    const body = await request.json();
    // Process order...
    
    return new Response(
      JSON.stringify({ success: true, message: 'Order created' }),
      { status: 201, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers }
    );
  }
}
```

### For Express.js API

Install CORS package:
```bash
npm install cors
```

Add to your server:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your routes
app.post('/api/orders', (req, res) => {
  // Handle order
});

app.listen(3000);
```

### For Vercel Deployment (vercel.json)

Add this file in API root:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ]
}
```

---

## 🔒 Production: Restrict Origins

For production, replace `*` with your actual domain:

```javascript
'Access-Control-Allow-Origin': 'https://your-domain.com'
```

Or allow multiple domains:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-domain.com',
  'https://sskcw-a178c.web.app'
];

const origin = request.headers.get('origin');
if (allowedOrigins.includes(origin)) {
  headers['Access-Control-Allow-Origin'] = origin;
}
```

---

## ✅ Test After Fix

1. Restart API server
2. Try placing order from frontend
3. Should work without CORS error

---

**Note:** This fix needs to be done on the API/backend side, not frontend!
