# 🔐 Admin Setup Instructions

## Your Admin Credentials

**Email:** adityaghoghari01@gmail.com  
**Phone:** +919270295943

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Enable Authentication (2 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **sskcw-a178c**
3. Click **Authentication** in left menu
4. Click **Get started** (if first time)
5. Go to **Sign-in method** tab
6. Enable these providers:

**Enable Phone Authentication:**
- Click on **Phone**
- Toggle **Enable**
- Click **Save**

**Enable Google Authentication:**
- Click on **Google**
- Toggle **Enable**
- Select support email: **adityaghoghari01@gmail.com**
- Click **Save**

### Step 2: Create Firestore Database (1 min)

1. In Firebase Console, click **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode**
4. Choose location: **asia-south1** (Mumbai) or closest to you
5. Click **Enable**

### Step 3: Enable Storage (1 min)

1. Click **Storage** in left menu
2. Click **Get started**
3. Select **Start in test mode**
4. Click **Next**
5. Click **Done**

### Step 4: Add Your Admin User (1 min)

1. In Firestore Database, click **Start collection**
2. Collection ID: `admins`
3. Click **Next**

**Add Document 1 (Email-based):**
```
Document ID: adityaghoghari01@gmail.com

Fields:
- Field: isAdmin    Type: boolean    Value: true
- Field: name       Type: string     Value: Aditya Ghoghari
- Field: email      Type: string     Value: adityaghoghari01@gmail.com
```
Click **Save**

**Add Document 2 (Phone-based):**
Click **Add document**
```
Document ID: +919270295943

Fields:
- Field: isAdmin    Type: boolean    Value: true
- Field: name       Type: string     Value: Aditya Ghoghari
- Field: phone      Type: string     Value: +919270295943
```
Click **Save**

### Step 5: Deploy Security Rules (1 min)

**Firestore Rules:**
1. Go to **Firestore Database** → **Rules**
2. Copy and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return request.auth != null && (
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) ||
        (request.auth.token.phone_number != null && 
         exists(/databases/$(database)/documents/admins/$(request.auth.token.phone_number))) ||
        (request.auth.token.email != null && 
         exists(/databases/$(database)/documents/admins/$(request.auth.token.email)))
      );
    }
    
    match /admins/{adminId} {
      allow read, write: if isAdmin();
    }
    
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
    
    match /leads/{leadId} {
      allow create: if true;
      allow read, delete: if isAdmin();
    }
  }
}
```
3. Click **Publish**

**Storage Rules:**
1. Go to **Storage** → **Rules**
2. Copy and paste this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAdmin() {
      return request.auth != null && (
        firestore.exists(/databases/(default)/documents/admins/$(request.auth.uid)) ||
        (request.auth.token.phone_number != null && 
         firestore.exists(/databases/(default)/documents/admins/$(request.auth.token.phone_number))) ||
        (request.auth.token.email != null && 
         firestore.exists(/databases/(default)/documents/admins/$(request.auth.token.email)))
      );
    }
    
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```
3. Click **Publish**

---

## ✅ Verification

### Test Phone Login:
1. Start app: `npm start`
2. Go to: http://localhost:3000/admin
3. Click **Phone OTP** tab
4. Enter: `+919270295943`
5. Solve reCAPTCHA
6. Click **Send OTP**
7. Enter OTP from SMS
8. Should redirect to dashboard ✅

### Test Google Login:
1. Go to: http://localhost:3000/admin
2. Click **Google** tab
3. Click **Sign in with Google**
4. Select: **adityaghoghari01@gmail.com**
5. Should redirect to dashboard ✅

---

## 🎯 What You Can Do Now

### As Admin, you can:
- ✅ Access admin panel at `/admin`
- ✅ Configure API URL in **API Settings**
- ✅ View all orders
- ✅ View all leads
- ✅ Manage products (if using Firebase)
- ✅ View dashboard statistics

---

## 📱 Phone Number Format

**Important:** Always use international format with country code

✅ **Correct:** `+919270295943`  
❌ **Wrong:** `9270295943` or `919270295943`

---

## 🔒 Security Notes

1. **Keep credentials secure** - Don't share your admin email/phone
2. **Use strong password** - For Google account
3. **Enable 2FA** - On your Google account
4. **Monitor access** - Check Firebase Authentication logs
5. **Backup data** - Export Firestore data regularly

---

## 🚀 Next Steps

1. ✅ Complete setup above
2. ✅ Test both login methods
3. ✅ Configure API URL in admin panel
4. ✅ Deploy to production
5. ✅ Start managing your fitness business!

---

## 📞 Quick Reference

**Firebase Project:** sskcw-a178c  
**Admin Email:** adityaghoghari01@gmail.com  
**Admin Phone:** +919270295943  
**Firebase Console:** https://console.firebase.google.com/project/sskcw-a178c

**Admin Panel URLs:**
- Local: http://localhost:3000/admin
- Production: https://sskcw-a178c.web.app/admin

---

## 🐛 Troubleshooting

### Can't login with phone?
- Check phone format: `+919270295943`
- Verify Phone auth is enabled
- Check SMS quota in Firebase
- Try incognito mode

### Can't login with Google?
- Check Google auth is enabled
- Verify email in admins collection
- Allow popups in browser
- Try different browser

### "Access Denied" error?
- Verify admin documents exist in Firestore
- Check document IDs match exactly
- Ensure `isAdmin: true` is boolean, not string
- Check security rules are published

---

**Your admin account is ready!** 🎉

Follow the steps above to complete the setup and start using your fitness website!
