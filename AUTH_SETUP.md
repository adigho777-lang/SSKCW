# Authentication Setup Guide

Complete guide to set up Phone OTP and Google authentication for your fitness website.

## 🔐 Authentication Features

### Primary: Phone Number Login (OTP)
- User enters phone number with country code
- Firebase sends OTP via SMS
- User verifies OTP
- reCAPTCHA security
- Admin access control

### Fallback: Google Login
- One-click Google sign-in
- Popup-based authentication
- Admin access control

### Security
- Only authorized admins can access panel
- Unauthorized users see "Access Denied"
- Protected routes with authentication check
- Firestore security rules

---

## 📋 Step-by-Step Setup

### Step 1: Enable Phone Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Click on **Phone** provider
5. Click **Enable**
6. Save

### Step 2: Enable Google Authentication

1. In the same **Sign-in method** page
2. Click on **Google** provider
3. Click **Enable**
4. Select a support email
5. Save

### Step 3: Add Authorized Domains

1. Go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `yoursite.web.app`)
3. Save

### Step 4: Create Admin Users in Firestore

You need to manually add admin users to Firestore:

#### Option A: Using Firebase Console

1. Go to **Firestore Database**
2. Click **Start collection**
3. Collection ID: `admins`
4. Add documents with these formats:

**For Phone Number Admin:**
```
Document ID: +919876543210 (the phone number with country code)
Fields:
  - isAdmin: true (boolean)
  - name: "Admin Name" (string)
  - createdAt: [current timestamp]
```

**For Email/Google Admin:**
```
Document ID: admin@example.com (the email address)
Fields:
  - isAdmin: true (boolean)
  - name: "Admin Name" (string)
  - createdAt: [current timestamp]
```

**For UID-based Admin:**
```
Document ID: [Firebase UID from Authentication]
Fields:
  - isAdmin: true (boolean)
  - name: "Admin Name" (string)
  - createdAt: [current timestamp]
```

#### Option B: Using Firebase CLI (Advanced)

Create a script to add admins:

```javascript
// addAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addAdmin(identifier, name) {
  await db.collection('admins').doc(identifier).set({
    isAdmin: true,
    name: name,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  console.log(`Admin added: ${identifier}`);
}

// Add your admins
addAdmin('+919876543210', 'Admin Name');
addAdmin('admin@example.com', 'Admin Name');
```

### Step 5: Update Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Copy the content from `firestore.rules` file
3. Paste and **Publish**

### Step 6: Update Storage Security Rules

1. Go to **Storage** > **Rules**
2. Copy the content from `storage.rules` file
3. Paste and **Publish**

### Step 7: Configure reCAPTCHA (Important!)

For production, you need to configure reCAPTCHA:

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site
3. Choose reCAPTCHA v2 (Checkbox)
4. Add your domains
5. Get site key and secret key
6. In Firebase Console:
   - Go to **Authentication** > **Settings** > **Phone**
   - Add reCAPTCHA site key (if needed)

**Note:** For development, Firebase provides a test reCAPTCHA that works on localhost.

---

## 🧪 Testing the Authentication

### Test Phone OTP Login

1. Start your app: `npm start`
2. Go to `http://localhost:3000/admin`
3. Select "Phone OTP" tab
4. Enter phone number with country code (e.g., `+919876543210`)
5. Solve reCAPTCHA
6. Click "Send OTP"
7. Check your phone for OTP
8. Enter OTP
9. Click "Verify OTP"

**Expected Results:**
- ✅ If phone is in `admins` collection → Redirect to dashboard
- ❌ If phone is NOT in `admins` collection → "Access Denied" message

### Test Google Login

1. Go to `http://localhost:3000/admin`
2. Select "Google" tab
3. Click "Sign in with Google"
4. Choose Google account
5. Authorize

**Expected Results:**
- ✅ If email is in `admins` collection → Redirect to dashboard
- ❌ If email is NOT in `admins` collection → "Access Denied" message

---

## 🔧 Troubleshooting

### Issue: "reCAPTCHA not working"

**Solution:**
- Ensure you're testing on `localhost` or authorized domain
- Clear browser cache
- Try incognito mode
- Check browser console for errors

### Issue: "OTP not received"

**Solutions:**
1. Check phone number format (must include country code with +)
2. Verify Phone Authentication is enabled in Firebase
3. Check Firebase quota (free tier has limits)
4. Ensure phone number is valid
5. Check spam/blocked messages

### Issue: "Access Denied" for valid admin

**Solutions:**
1. Verify admin document exists in Firestore `admins` collection
2. Check document ID matches exactly:
   - For phone: `+919876543210` (with + and country code)
   - For email: `admin@example.com` (exact email)
3. Ensure `isAdmin: true` field exists
4. Check Firestore security rules are published

### Issue: "Popup blocked" for Google login

**Solution:**
- Allow popups for your site
- Try different browser
- Use incognito mode

### Issue: "Too many requests"

**Solution:**
- Firebase has rate limits for phone auth
- Wait a few minutes
- Use different phone number for testing
- Consider upgrading Firebase plan

---

## 📱 Phone Number Format

### Correct Formats:
- ✅ `+919876543210` (India)
- ✅ `+15551234567` (USA)
- ✅ `+447911123456` (UK)

### Incorrect Formats:
- ❌ `9876543210` (missing country code)
- ❌ `919876543210` (missing +)
- ❌ `+91 9876543210` (has space)
- ❌ `+91-9876543210` (has dash)

---

## 🔒 Security Best Practices

### 1. Limit Admin Access
- Only add trusted users to `admins` collection
- Regularly review admin list
- Remove inactive admins

### 2. Use Strong Security Rules
- Never allow public write access to `admins` collection
- Test security rules before deploying
- Use Firebase Emulator for testing

### 3. Monitor Authentication
- Check Firebase Authentication logs
- Monitor unusual login attempts
- Set up alerts for suspicious activity

### 4. Production Checklist
- [ ] Phone Authentication enabled
- [ ] Google Authentication enabled
- [ ] Admin users added to Firestore
- [ ] Security rules published
- [ ] reCAPTCHA configured
- [ ] Authorized domains added
- [ ] Test both login methods
- [ ] Test access control

---

## 🚀 Deployment Notes

### Before Deploying:

1. **Add Production Domain**
   - Go to Firebase Console > Authentication > Settings
   - Add your production domain to authorized domains

2. **Update reCAPTCHA**
   - Add production domain to reCAPTCHA settings
   - Test reCAPTCHA on production

3. **Test on Production**
   - Test phone OTP login
   - Test Google login
   - Test access control
   - Test unauthorized access

### After Deploying:

1. **Monitor Logs**
   - Check Firebase Console for errors
   - Monitor authentication attempts
   - Review security rule violations

2. **User Management**
   - Document admin credentials securely
   - Create backup admin accounts
   - Set up recovery process

---

## 📊 Admin Collection Structure

```javascript
// Firestore Collection: admins

// Document 1 (Phone-based admin)
{
  id: "+919876543210",
  data: {
    isAdmin: true,
    name: "John Doe",
    phone: "+919876543210",
    createdAt: Timestamp,
    lastLogin: Timestamp (optional)
  }
}

// Document 2 (Email-based admin)
{
  id: "admin@example.com",
  data: {
    isAdmin: true,
    name: "Jane Smith",
    email: "admin@example.com",
    createdAt: Timestamp,
    lastLogin: Timestamp (optional)
  }
}

// Document 3 (UID-based admin)
{
  id: "firebase-uid-here",
  data: {
    isAdmin: true,
    name: "Admin User",
    uid: "firebase-uid-here",
    createdAt: Timestamp,
    lastLogin: Timestamp (optional)
  }
}
```

---

## 🎯 Quick Setup Commands

### Add Admin via Firebase Console:

1. Collection: `admins`
2. Document ID: Your phone/email
3. Fields:
   ```
   isAdmin: true
   name: "Your Name"
   ```

### Test Login:

```bash
# Start development server
npm start

# Open browser
http://localhost:3000/admin

# Try phone login with your number
# Or try Google login with your email
```

---

## 📞 Support

### Common Questions:

**Q: Can I use both phone and email for the same admin?**
A: Yes! Create two documents in `admins` collection - one with phone, one with email.

**Q: How do I remove admin access?**
A: Delete the document from `admins` collection in Firestore.

**Q: Can users create their own admin accounts?**
A: No! Only manually added users in `admins` collection can access the panel.

**Q: What if I lose access?**
A: Use Firebase Console to manually add your credentials to `admins` collection.

---

## ✅ Verification Checklist

Before going live:

- [ ] Phone authentication tested
- [ ] Google authentication tested
- [ ] Admin access control working
- [ ] Unauthorized access blocked
- [ ] Security rules published
- [ ] reCAPTCHA working
- [ ] Production domain authorized
- [ ] Admin users documented
- [ ] Backup admin created
- [ ] Logs monitored

---

**Your authentication system is now secure and ready!** 🔐

For issues, check TROUBLESHOOTING.md or Firebase Console logs.
