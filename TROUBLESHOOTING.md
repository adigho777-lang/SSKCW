# Troubleshooting Guide

Common issues and their solutions for the FitLife fitness website.

## Installation Issues

### Issue: `npm install` fails
**Symptoms:** Error messages during package installation

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Tailwind CSS not working
**Symptoms:** Styles not applying, classes not working

**Solutions:**
1. Verify `tailwind.config.js` exists
2. Check `index.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart development server: `npm start`

## Firebase Issues

### Issue: "Firebase: Error (auth/configuration-not-found)"
**Symptoms:** Can't login to admin panel

**Solutions:**
1. Check `src/firebase.js` has correct config
2. Verify all fields are filled (no "YOUR_API_KEY" placeholders)
3. Ensure Authentication is enabled in Firebase Console
4. Verify Email/Password provider is enabled

### Issue: "Missing or insufficient permissions"
**Symptoms:** Can't read/write to Firestore

**Solutions:**
1. Check Firestore security rules in Firebase Console
2. For development, use test mode rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. For production, use proper rules (see SETUP_GUIDE.md)

### Issue: Images not uploading
**Symptoms:** Product images fail to upload

**Solutions:**
1. Verify Storage is enabled in Firebase Console
2. Check Storage security rules allow writes
3. Ensure file size is under 5MB
4. Check file format is supported (jpg, png, gif, webp)
5. Verify you're logged in as admin

### Issue: "Firebase: No Firebase App '[DEFAULT]' has been created"
**Symptoms:** App crashes on load

**Solutions:**
1. Ensure `firebase.js` is imported correctly
2. Check Firebase initialization happens before any Firebase calls
3. Verify `initializeApp()` is called with valid config

## Authentication Issues

### Issue: Can't login to admin panel
**Symptoms:** "Invalid credentials" error

**Solutions:**
1. Verify admin user exists in Firebase Console (Authentication > Users)
2. Check email and password are correct
3. Ensure Email/Password auth is enabled
4. Try resetting password in Firebase Console

### Issue: Logged out unexpectedly
**Symptoms:** Redirected to login page randomly

**Solutions:**
1. Check browser console for errors
2. Verify Firebase session persistence
3. Check if Firebase project is active
4. Clear browser cache and cookies

### Issue: Can't access admin routes
**Symptoms:** Redirected to login even after logging in

**Solutions:**
1. Check authentication state is properly managed
2. Verify `onAuthStateChanged` listener is working
3. Check browser console for errors
4. Try logging out and back in

## Data Issues

### Issue: Products not showing on homepage
**Symptoms:** Empty products section

**Solutions:**
1. Add products in admin panel first
2. Check Firestore has 'products' collection
3. Verify Firestore read permissions
4. Check browser console for errors
5. Refresh the page

### Issue: Orders not saving
**Symptoms:** Order form submits but nothing happens

**Solutions:**
1. Check browser console for errors
2. Verify Firestore write permissions
3. Check 'orders' collection exists
4. Ensure all required fields are filled
5. Check network tab for failed requests

### Issue: Leads not appearing in admin
**Symptoms:** Contact form submits but leads don't show

**Solutions:**
1. Check 'leads' collection in Firestore
2. Verify data is being saved (check Firestore Console)
3. Check date sorting in query
4. Refresh admin panel
5. Check browser console for errors

## UI/Display Issues

### Issue: Layout broken on mobile
**Symptoms:** Elements overlapping or misaligned

**Solutions:**
1. Check responsive classes (sm:, md:, lg:)
2. Test in browser dev tools mobile view
3. Verify viewport meta tag in index.html
4. Check for fixed widths that should be responsive

### Issue: Images not displaying
**Symptoms:** Broken image icons

**Solutions:**
1. Check image URLs are valid
2. Verify images uploaded to Firebase Storage
3. Check Storage security rules allow reads
4. Ensure image URLs are saved in Firestore
5. Check browser console for 404 errors

### Issue: Animations not working
**Symptoms:** No fade-in or hover effects

**Solutions:**
1. Check `index.css` has animation definitions
2. Verify Tailwind is loaded correctly
3. Check browser supports CSS animations
4. Clear browser cache

### Issue: WhatsApp button not visible
**Symptoms:** Can't see floating WhatsApp button

**Solutions:**
1. Check z-index is high enough (z-50)
2. Verify component is imported in App.js
3. Check CSS for `fixed` positioning
4. Look for overlapping elements

## WhatsApp Integration Issues

### Issue: WhatsApp button doesn't open WhatsApp
**Symptoms:** Nothing happens when clicking button

**Solutions:**
1. Check phone number format (no spaces, include country code)
2. Verify URL format: `https://wa.me/1234567890`
3. Test on mobile device (works better than desktop)
4. Check browser allows opening external apps

### Issue: QR code not generating
**Symptoms:** QR code image broken or missing

**Solutions:**
1. Check internet connection (uses external API)
2. Verify QR Server API URL is correct
3. Check phone number in URL is properly encoded
4. Try different QR code generator if needed

### Issue: Pre-filled message not working
**Symptoms:** WhatsApp opens but message is empty

**Solutions:**
1. Check message is URL encoded: `encodeURIComponent(message)`
2. Verify URL format: `?text=Your%20message`
3. Test with simple message first
4. Check for special characters causing issues

## Build & Deployment Issues

### Issue: `npm run build` fails
**Symptoms:** Build errors or warnings

**Solutions:**
```bash
# Check for syntax errors
npm run build

# Fix any ESLint warnings
# Update imports if needed

# Clear cache and rebuild
rm -rf build
npm run build
```

### Issue: Firebase deploy fails
**Symptoms:** Deployment errors

**Solutions:**
1. Verify Firebase CLI is installed: `firebase --version`
2. Check you're logged in: `firebase login`
3. Verify project ID in `.firebaserc`
4. Ensure build folder exists: `npm run build`
5. Check Firebase quota limits

### Issue: Deployed site shows blank page
**Symptoms:** Live site is empty or white screen

**Solutions:**
1. Check browser console for errors
2. Verify Firebase config is correct in deployed version
3. Check all environment variables are set
4. Ensure build completed successfully
5. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Firebase hosting not updating
**Symptoms:** Old version still showing after deploy

**Solutions:**
1. Clear Firebase hosting cache
2. Hard refresh browser (Ctrl+Shift+R)
3. Check deployment completed successfully
4. Wait a few minutes for CDN to update
5. Try incognito/private browsing mode

## Performance Issues

### Issue: Slow page load
**Symptoms:** Website takes long to load

**Solutions:**
1. Optimize images (compress before uploading)
2. Check network tab in browser dev tools
3. Verify Firebase queries are efficient
4. Limit number of products displayed
5. Enable caching in Firebase Hosting

### Issue: Firestore reads quota exceeded
**Symptoms:** "Quota exceeded" error

**Solutions:**
1. Check Firebase Console for usage
2. Optimize queries (use limits)
3. Implement caching
4. Upgrade Firebase plan if needed
5. Reduce unnecessary reads

## Browser-Specific Issues

### Issue: Works in Chrome but not Safari
**Symptoms:** Features broken in specific browser

**Solutions:**
1. Check browser console for errors
2. Verify CSS compatibility
3. Test JavaScript features support
4. Use polyfills if needed
5. Update browser to latest version

### Issue: CORS errors
**Symptoms:** "Cross-Origin Request Blocked" errors

**Solutions:**
1. Check Firebase CORS settings
2. Verify API endpoints allow your domain
3. Use Firebase SDK instead of REST API
4. Check Storage CORS configuration

## Development Issues

### Issue: Hot reload not working
**Symptoms:** Changes don't reflect without manual refresh

**Solutions:**
1. Restart development server
2. Check for syntax errors
3. Verify file is saved
4. Clear browser cache
5. Check webpack configuration

### Issue: Console full of warnings
**Symptoms:** Many yellow warnings in console

**Solutions:**
1. Update dependencies: `npm update`
2. Fix React key warnings (add unique keys to lists)
3. Remove unused imports
4. Fix ESLint warnings
5. Update deprecated code

## Common Error Messages

### "Cannot read property 'map' of undefined"
**Cause:** Trying to map over data before it's loaded

**Solution:**
```javascript
// Add loading check
{products && products.map(product => ...)}

// Or use optional chaining
{products?.map(product => ...)}
```

### "Maximum update depth exceeded"
**Cause:** Infinite re-render loop

**Solution:**
```javascript
// Wrong - causes infinite loop
useEffect(() => {
  setData(newData);
});

// Correct - add dependency array
useEffect(() => {
  setData(newData);
}, []);
```

### "A component is changing an uncontrolled input to be controlled"
**Cause:** Input value changes from undefined to defined

**Solution:**
```javascript
// Wrong
const [value, setValue] = useState();

// Correct
const [value, setValue] = useState('');
```

## Getting Help

If you're still stuck after trying these solutions:

1. **Check Browser Console**
   - Press F12
   - Look for red error messages
   - Note the exact error text

2. **Check Firebase Console**
   - Go to Firebase Console
   - Check Authentication, Firestore, Storage
   - Look for error logs

3. **Check Network Tab**
   - Open browser dev tools
   - Go to Network tab
   - Look for failed requests (red)

4. **Search for Error**
   - Copy exact error message
   - Search on Google
   - Check Stack Overflow

5. **Documentation**
   - Firebase Docs: https://firebase.google.com/docs
   - React Docs: https://react.dev
   - Tailwind Docs: https://tailwindcss.com/docs

6. **Community Support**
   - Stack Overflow
   - Firebase Community
   - React Community

## Prevention Tips

1. **Regular Backups**
   - Export Firestore data monthly
   - Save Firebase config securely
   - Keep credentials documented

2. **Testing**
   - Test after each major change
   - Test on multiple browsers
   - Test on mobile devices

3. **Monitoring**
   - Check Firebase Console regularly
   - Monitor error logs
   - Track usage quotas

4. **Updates**
   - Keep dependencies updated
   - Follow security advisories
   - Test after updates

5. **Documentation**
   - Document custom changes
   - Keep setup notes
   - Track configuration changes

## Emergency Procedures

### Site is completely down
1. Check Firebase status: https://status.firebase.google.com
2. Verify Firebase project is active
3. Check billing/quota limits
4. Review recent changes
5. Rollback if needed: `firebase hosting:rollback`

### Data loss or corruption
1. Check Firestore Console for data
2. Restore from backup if available
3. Check security rules didn't delete data
4. Review recent admin actions
5. Contact Firebase support if needed

### Security breach suspected
1. Change admin password immediately
2. Review Firestore security rules
3. Check Authentication logs
4. Revoke suspicious sessions
5. Update all credentials
6. Review recent data changes

---

**Still having issues?** Document the exact steps to reproduce the problem, including:
- What you did
- What you expected to happen
- What actually happened
- Any error messages
- Browser and device info

This information will help diagnose and fix the issue quickly! 🔧
