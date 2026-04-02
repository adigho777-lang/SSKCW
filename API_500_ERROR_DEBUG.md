# 🔧 API 500 Error - Debug Guide

## Problem
```
POST https://sskcw-api.vercel.app/api/orders 500 (Internal Server Error)
```

Good news: CORS is fixed! ✅
Bad news: API has internal error ❌

---

## 🔍 What We're Sending

Frontend sends this data:
```json
{
  "name": "Customer Name",
  "phone": "9876543210",
  "address": "Full Address",
  "product_id": "prod_1774958390504",
  "product_title": "Riyansh Amrit Juice",
  "quantity": 1,
  "total_amount": 1500
}
```

---

## 🐛 Common Causes of 500 Error

### 1. Database Connection Issue
- MongoDB/Firestore not connected
- Connection string missing
- Database credentials wrong

### 2. Missing Environment Variables
```bash
# Check if these are set in Vercel:
DATABASE_URL=...
MONGODB_URI=...
```

### 3. Schema Validation Error
- API expects different field names
- Required fields missing
- Data type mismatch

### 4. Server Code Error
- Syntax error in API code
- Unhandled exception
- Missing try-catch block

---

## 🔧 How to Debug (API Side)

### Step 1: Check Vercel Logs

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click "Deployments"
4. Click latest deployment
5. Click "Functions" tab
6. Find `/api/orders` function
7. Check logs for error message

### Step 2: Add Console Logs

Add to your `/api/orders` route:
```javascript
export async function POST(req) {
  try {
    console.log('📥 Received request');
    
    const body = await req.json();
    console.log('📦 Request body:', body);
    
    // Your database save logic
    console.log('💾 Saving to database...');
    const result = await saveOrder(body);
    console.log('✅ Saved successfully:', result);
    
    return Response.json({ success: true, order: result });
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error message:', error.message);
    
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 3: Check Database Connection

```javascript
// Test database connection
try {
  await db.connect();
  console.log('✅ Database connected');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}
```

### Step 4: Validate Request Body

```javascript
const body = await req.json();

// Check required fields
const required = ['name', 'phone', 'product_id'];
for (const field of required) {
  if (!body[field]) {
    return Response.json(
      { success: false, error: `Missing field: ${field}` },
      { status: 400 }
    );
  }
}
```

---

## 🧪 Test API Directly

Use this curl command to test:

```bash
curl -X POST https://sskcw-api.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9876543210",
    "address": "Test Address",
    "product_id": "prod_1774958390504",
    "product_title": "Test Product",
    "quantity": 1,
    "total_amount": 1500
  }'
```

Or use Postman/Insomnia with same data.

---

## 🔍 Check API Response

The API should return error details:
```json
{
  "success": false,
  "error": "Actual error message here"
}
```

If not, add better error handling in API.

---

## 💡 Quick Fixes to Try

### Fix 1: Return Better Error Message

```javascript
catch (error) {
  console.error('Error:', error);
  return Response.json(
    { 
      success: false, 
      error: error.message,
      details: error.stack // For debugging
    },
    { status: 500 }
  );
}
```

### Fix 2: Check if Database is Optional

If you don't have database yet, just return success:

```javascript
export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Order received:', body);
    
    // TODO: Save to database later
    
    return Response.json({
      success: true,
      message: 'Order received',
      order: {
        id: 'order_' + Date.now(),
        ...body,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### Fix 3: Add CORS Headers to Error Response

```javascript
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

return Response.json(
  { success: false, error: error.message },
  { status: 500, headers }
);
```

---

## 📋 Checklist for API Owner

- [ ] Check Vercel function logs
- [ ] Add console.log statements
- [ ] Test database connection
- [ ] Validate request body
- [ ] Add try-catch blocks
- [ ] Return detailed error messages
- [ ] Test with curl/Postman
- [ ] Check environment variables
- [ ] Verify database schema

---

## 🎯 Expected API Response

### Success (201):
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "Order created successfully",
  "order": {
    "id": "order_1234567890",
    "name": "Customer Name",
    "phone": "9876543210",
    "product_id": "prod_xxx",
    "status": "pending",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

### Error (500):
```json
{
  "success": false,
  "error": "Detailed error message",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 🆘 Need Frontend to Handle This?

If API can't be fixed immediately, we can:
1. Show better error message to user
2. Add retry logic
3. Save order locally and sync later
4. Send order via WhatsApp as backup

Let me know if you need any of these!

---

**Next Step:** Check Vercel logs to see actual error message, then fix API accordingly.
