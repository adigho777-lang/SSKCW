# 🚀 Quick Start - API Integration

## Get Your Website Running in 5 Minutes!

---

## ✅ Build Status

```
✅ Compiled successfully
✅ Bundle size: 219.5 kB (gzipped)
✅ All features working
✅ Ready to deploy
```

---

## 🎯 3-Step Setup

### Step 1: Start the App (1 min)

```bash
cd fitness-website
npm start
```

App opens at: http://localhost:3000

### Step 2: Configure API (2 min)

```
1. Go to http://localhost:3000/admin
2. Login with Phone OTP or Google
3. Click "API Settings" in sidebar
4. Enter your API URL:
   https://your-api.vercel.app/api
5. Click "Test API Connection"
6. Click "Save API URL"
7. Page reloads automatically
```

### Step 3: Test (2 min)

```
1. Go to homepage
2. Products should load from your API
3. Try placing an order
4. Check admin orders page
```

**Done!** 🎉

---

## 🔌 API URL Examples

```
Development:
http://localhost:3001/api

Production (Vercel):
https://your-project.vercel.app/api

Production (Custom):
https://api.yoursite.com/v1
```

---

## 📋 Required API Endpoints

```
GET  /api/products          ← Products list
GET  /api/products/:id      ← Single product
POST /api/orders            ← Create order
GET  /api/orders            ← Get orders (admin)
POST /api/leads             ← Create lead
```

---

## 🧪 Test with Mock API

### Option 1: JSON Server (Fastest)

```bash
# Install
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
      "benefits": "Muscle growth\nRecovery\nStrength"
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

### Option 2: MockAPI.io

```
1. Go to https://mockapi.io
2. Create project
3. Create endpoints: products, orders, leads
4. Copy API URL
5. Configure in admin panel
```

---

## 🎨 Admin Panel Features

### API Settings Page

**Access:** `/admin/api-settings`

**Features:**
- ✅ View current API URL
- ✅ Enter new API URL
- ✅ Test connection
- ✅ Save configuration
- ✅ Reset to default
- ✅ View required endpoints
- ✅ Step-by-step instructions

---

## 💡 Quick Tips

### Tip 1: Test Before Save
Always click "Test API Connection" before saving to verify your API works.

### Tip 2: Check CORS
If test fails, ensure your API has CORS enabled for your domain.

### Tip 3: No Trailing Slash
API URL should NOT end with `/`
- ✅ Good: `https://api.com/api`
- ❌ Bad: `https://api.com/api/`

### Tip 4: Use HTTPS
Always use HTTPS in production for security.

---

## 🐛 Quick Troubleshooting

### Products not loading?
1. Check API URL is correct
2. Test API with curl: `curl https://your-api.com/api/products`
3. Check browser console (F12)
4. Check Network tab for errors

### CORS error?
Add to your API:
```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

### Connection test fails?
1. Verify API is running
2. Check URL format
3. Test in Postman first
4. Check API logs

---

## 📖 Documentation

**Essential Guides:**
1. `API_INTEGRATION_GUIDE.md` ← Complete API guide
2. `AUTH_SETUP.md` ← Authentication setup
3. `FINAL_SUMMARY.md` ← Project overview

**Quick Reference:**
- `QUICK_REFERENCE.md` - Commands & tips
- `TROUBLESHOOTING.md` - Common issues

---

## 🚀 Deploy

### Deploy API (Vercel)
```bash
# In your API project
vercel deploy
```

### Deploy Frontend (Firebase)
```bash
# In fitness-website
npm run build
npm run deploy
```

### Configure Production
1. Login to production admin
2. Go to API Settings
3. Enter production API URL
4. Test and save

---

## ✅ Success Checklist

- [ ] App starts successfully
- [ ] Admin panel accessible
- [ ] API URL configured
- [ ] Connection test passes
- [ ] Products load from API
- [ ] Orders submit to API
- [ ] Leads submit to API
- [ ] Mobile responsive
- [ ] Ready to deploy

---

## 🎯 What You Get

### User Side:
- Dynamic products from API
- Order placement
- Lead generation
- WhatsApp integration
- Mobile responsive

### Admin Side:
- API configuration UI
- Test API connection
- View orders from API
- Phone OTP login
- Google login
- Protected routes

---

## 📞 Need Help?

**Check:**
1. Browser console (F12)
2. Network tab for API calls
3. `API_INTEGRATION_GUIDE.md`
4. `TROUBLESHOOTING.md`

**Test API:**
```bash
curl https://your-api.com/api/products
```

---

## 🎉 You're Ready!

Your fitness website is:
- ✅ Built successfully
- ✅ API-ready
- ✅ Fully functional
- ✅ Production-ready

**Just configure your API URL and start!** 🚀

---

**Commands:**
```bash
npm start              # Start dev server
npm run build          # Build for production
npm run deploy         # Deploy to Firebase
```

**URLs:**
```
Homepage:      http://localhost:3000
Admin Login:   http://localhost:3000/admin
API Settings:  http://localhost:3000/admin/api-settings
```

---

**Good luck with your fitness business!** 💪🎯
