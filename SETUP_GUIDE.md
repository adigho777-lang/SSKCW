# FitLife Setup Guide

## Quick Start Checklist

Follow these steps to get your fitness website up and running:

### Step 1: Firebase Project Setup (5 minutes)

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Enter project name: "fitlife-website" (or your choice)
   - Disable Google Analytics (optional)
   - Click "Create project"

2. **Enable Authentication**
   - In Firebase Console, go to "Authentication"
   - Click "Get started"
   - Click "Sign-in method" tab
   - Enable "Email/Password"
   - Click "Save"

3. **Create Admin User**
   - Go to "Authentication" > "Users" tab
   - Click "Add user"
   - Enter email: admin@fitlife.com (or your choice)
   - Enter password: (choose a strong password)
   - Click "Add user"
   - **SAVE THESE CREDENTIALS** - you'll need them to login

4. **Enable Firestore Database**
   - Go to "Firestore Database"
   - Click "Create database"
   - Select "Start in test mode"
   - Choose location closest to your users
   - Click "Enable"

5. **Enable Storage**
   - Go to "Storage"
   - Click "Get started"
   - Select "Start in test mode"
   - Click "Next" and "Done"

6. **Get Firebase Configuration**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Register app name: "FitLife Web"
   - Copy the firebaseConfig object

### Step 2: Configure Your Project (2 minutes)

1. **Update Firebase Config**
   - Open `src/firebase.js`
   - Replace the firebaseConfig with your copied config:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

2. **Update WhatsApp Number**
   
   Replace `1234567890` with your WhatsApp number (include country code, no + or spaces):
   
   - `src/components/WhatsAppButton.js` (line 4)
   - `src/components/Hero.js` (line 11)
   - `src/components/ContactForm.js` (line 82)
   
   Example: For +1 (555) 123-4567, use: `15551234567`

### Step 3: Install and Run (2 minutes)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   - App will open at http://localhost:3000
   - Admin panel at http://localhost:3000/admin

### Step 4: Test the Application (5 minutes)

1. **Test User Side**
   - Browse the homepage
   - Try the contact form (should save to Firestore)
   - Click WhatsApp button (should open WhatsApp)

2. **Test Admin Panel**
   - Go to http://localhost:3000/admin
   - Login with your admin credentials
   - Add a test product with image
   - Check if product appears on homepage
   - Place a test order
   - View order in admin panel

### Step 5: Security Rules (Important!)

Before deploying to production, update your Firebase security rules:

**Firestore Rules:**
1. Go to Firestore Database > Rules
2. Replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /leads/{document=**} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

**Storage Rules:**
1. Go to Storage > Rules
2. Replace with:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

### Step 6: Deploy to Firebase Hosting (5 minutes)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Choose your project
   - Public directory: `build`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

4. **Update .firebaserc**
   - Open `.firebaserc`
   - Replace "your-project-id" with your actual Firebase project ID

5. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

6. **Access Your Live Site**
   - Firebase will provide a URL like: https://your-project.web.app
   - Share this URL with your customers!

## Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#10b981',  // Main green color
  secondary: '#059669', // Darker green
}
```

### Update Content
- **Hero Section**: `src/components/Hero.js`
- **Services**: `src/components/Services.js`
- **Site Title**: `public/index.html`

### Add More Products
1. Login to admin panel
2. Go to Products
3. Click "Add Product"
4. Fill in details and upload image
5. Product appears on homepage automatically

## Troubleshooting

### "Permission denied" errors
- Check Firebase security rules are set correctly
- Make sure you're logged in as admin for admin operations

### Images not uploading
- Verify Storage is enabled in Firebase Console
- Check Storage security rules allow writes for authenticated users

### Orders/Leads not saving
- Check Firestore is enabled
- Verify security rules allow create operations
- Check browser console for errors

### WhatsApp button not working
- Verify phone number format (country code + number, no spaces)
- Test the generated URL in browser

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all Firebase services are enabled
3. Ensure Firebase config is correct
4. Check that admin user is created

## Next Steps

1. Add real products in admin panel
2. Customize colors and content
3. Add your business logo
4. Set up custom domain (Firebase Hosting settings)
5. Enable Google Analytics for tracking
6. Add more features as needed

Congratulations! Your fitness website is ready to transform lives! 💪
