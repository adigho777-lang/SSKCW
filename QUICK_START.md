# Quick Start Guide

Get your fitness website running in 15 minutes! ⚡

## Prerequisites

- Node.js installed (v14 or higher)
- A Google account for Firebase
- A WhatsApp number for customer communication

## 5-Step Setup

### Step 1: Firebase Setup (5 min)

1. Go to https://console.firebase.google.com/
2. Create new project → Name it "FitLife"
3. Enable these services:
   - **Authentication** → Email/Password
   - **Firestore Database** → Test mode
   - **Storage** → Test mode
4. Create admin user in Authentication
5. Copy Firebase config from Project Settings

### Step 2: Configure Project (2 min)

1. Open `src/firebase.js`
2. Paste your Firebase config
3. Update WhatsApp number in these files:
   - `src/components/WhatsAppButton.js` (line 4)
   - `src/components/Hero.js` (line 11)
   - `src/components/ContactForm.js` (line 82)

### Step 3: Install & Run (3 min)

```bash
# Navigate to project
cd fitness-website

# Install dependencies
npm install

# Start development server
npm start
```

Browser opens at http://localhost:3000

### Step 4: Test Everything (3 min)

**User Side:**
- ✓ Homepage loads
- ✓ Contact form works
- ✓ WhatsApp button opens

**Admin Panel:**
- ✓ Login at /admin
- ✓ Add a test product
- ✓ Product shows on homepage

### Step 5: Deploy (2 min)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Update .firebaserc with your project ID

# Deploy
npm run deploy
```

Done! Your site is live! 🎉

## What You Get

### User Features
- ✅ Beautiful landing page
- ✅ Services showcase
- ✅ Product catalog
- ✅ Order system
- ✅ Lead generation form
- ✅ WhatsApp integration
- ✅ QR code for instant contact
- ✅ Fully responsive design

### Admin Features
- ✅ Secure login
- ✅ Dashboard with stats
- ✅ Product management (add/edit/delete)
- ✅ Order management (track status)
- ✅ Lead management (filter by goal)
- ✅ Image upload
- ✅ Mobile-friendly admin panel

## First Steps After Setup

1. **Add Products**
   - Login to /admin
   - Go to Products
   - Add your first product with image

2. **Test Order Flow**
   - Go to homepage
   - Click "Order Now" on product
   - Fill form and submit
   - Check order in admin panel

3. **Customize Content**
   - Update business name
   - Change colors in `tailwind.config.js`
   - Modify headlines in components

4. **Set Security Rules**
   - Update Firestore rules (see SETUP_GUIDE.md)
   - Update Storage rules
   - Change from test mode to production

## Common Commands

```bash
# Start development
npm start

# Build for production
npm run build

# Deploy to Firebase
npm run deploy

# Deploy only hosting
npm run deploy:hosting
```

## File Structure

```
fitness-website/
├── src/
│   ├── components/      # UI components
│   ├── pages/          # Page components
│   ├── firebase.js     # Firebase config (UPDATE THIS!)
│   └── App.js          # Main app
├── public/             # Static files
└── Documentation/      # All guides
```

## Key Files to Update

1. **src/firebase.js** - Your Firebase config
2. **src/components/WhatsAppButton.js** - Your WhatsApp number
3. **src/components/Hero.js** - Your WhatsApp number
4. **src/components/ContactForm.js** - Your WhatsApp number
5. **.firebaserc** - Your Firebase project ID

## URLs

- **Homepage:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin
- **Admin Dashboard:** http://localhost:3000/admin/dashboard

## Default Admin Credentials

Use the email and password you created in Firebase Authentication.

## Need Help?

📖 **Full Documentation:**
- `README.md` - Overview
- `SETUP_GUIDE.md` - Detailed setup
- `FEATURES.md` - All features explained
- `TROUBLESHOOTING.md` - Common issues
- `CHECKLIST.md` - Pre-launch checklist

🔧 **Troubleshooting:**
- Check browser console (F12)
- Verify Firebase config
- Ensure all services enabled
- Check TROUBLESHOOTING.md

## Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#10b981',    // Your brand color
  secondary: '#059669',  // Darker shade
}
```

### Change Text
- Hero: `src/components/Hero.js`
- Services: `src/components/Services.js`
- Site title: `public/index.html`

### Add More Services
Edit `src/components/Services.js` - add items to the `services` array.

## Production Checklist

Before going live:
- [ ] Firebase config updated
- [ ] WhatsApp number updated
- [ ] Admin user created
- [ ] Security rules set
- [ ] Test all features
- [ ] Add real products
- [ ] Customize content
- [ ] Test on mobile
- [ ] Deploy to Firebase

## Support Resources

- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com/docs

## Next Steps

1. ✅ Complete setup
2. 📦 Add your products
3. 🎨 Customize design
4. 🧪 Test everything
5. 🚀 Deploy to production
6. 📱 Share with customers
7. 💰 Start getting orders!

---

**Ready to transform lives?** Your fitness website is ready to go! 💪

For detailed information, see the other documentation files in this folder.

**Questions?** Check TROUBLESHOOTING.md or the full SETUP_GUIDE.md.

Good luck with your fitness business! 🎯
