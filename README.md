# 🏋️ SSKCW - Shree Samarth Krupa Centre Wada

Modern, professional health and fitness e-commerce website with admin panel and triple backup system.

![React](https://img.shields.io/badge/React-19.2.4-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.11.0-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

### 🛒 E-Commerce
- Dynamic product listing from API
- Product search and filtering
- Detailed product pages with thumbnails
- Smart pricing (strikethrough + discount)
- Alphabetical sorting (A-Z, then numbers)

### 🔐 Authentication
- Phone OTP login (Firebase)
- Google OAuth fallback
- Admin access control
- Protected routes

### 📦 Order Management
- Order placement system
- **Triple Backup System:**
  - WhatsApp notification
  - LocalStorage backup
  - Email option
- Zero order loss guarantee

### 👨‍💼 Admin Panel
- Dashboard with statistics
- Product management
- Order tracking
- Lead management
- Dynamic API configuration

### 🎨 Design
- Modern, responsive UI
- Smooth animations
- Mobile-first approach
- Professional color scheme
- Loading skeletons

---

## 🛠️ Tech Stack

- **Frontend:** React 19.2.4
- **Styling:** Tailwind CSS 3.4.1
- **Authentication:** Firebase 12.11.0
- **HTTP Client:** Axios 1.14.0
- **Routing:** React Router DOM 7.13.2
- **Icons:** React Icons 5.6.0

---

## 📋 Prerequisites

- Node.js 16+ and npm
- Firebase account
- API endpoint (https://sskcw-api.vercel.app/api)

---

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/adigho777-lang/SSKCW.git
cd SSKCW/fitness-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 4. Set Environment Variables (Optional)

Create `.env` file:

```bash
REACT_APP_API_BASE_URL=https://sskcw-api.vercel.app/api
REACT_APP_WHATSAPP_NUMBER=919270295943
```

### 5. Start Development Server

```bash
npm start
```

Visit: http://localhost:3000

---

## 🔥 Build for Production

```bash
npm run build
```

Output in `build/` folder.

---

## 🚀 Deploy to Firebase

```bash
npm run deploy
```

Or:

```bash
npm run build
firebase deploy
```

---

## 📱 Admin Setup

### 1. Enable Authentication

Firebase Console → Authentication → Sign-in method:
- Enable **Phone**
- Enable **Google**

### 2. Create Firestore Database

Firebase Console → Firestore Database → Create database (test mode)

### 3. Add Admin User

Firestore → Create collection `admins`:

```
Document ID: +919270295943
Fields:
  - isAdmin: true (boolean)
  - name: "Your Name" (string)
  - phone: "+919270295943" (string)
```

### 4. Deploy Security Rules

Copy rules from `firestore.rules` and `storage.rules` to Firebase Console.

---

## 📖 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick start guide
- **[ADMIN_SETUP_INSTRUCTIONS.md](ADMIN_SETUP_INSTRUCTIONS.md)** - Admin setup
- **[BACKUP_SYSTEM_GUIDE.md](BACKUP_SYSTEM_GUIDE.md)** - Backup system docs
- **[NETWORK_ERROR_FIX.md](NETWORK_ERROR_FIX.md)** - Troubleshooting
- **[API_500_ERROR_DEBUG.md](API_500_ERROR_DEBUG.md)** - API debugging

---

## 🎯 Key Features Explained

### Triple Backup System

If API fails, orders are automatically:
1. **Sent via WhatsApp** - Opens WhatsApp with order details
2. **Saved locally** - Stored in browser localStorage
3. **Email option** - Customer can send via email

**Result:** Zero order loss, 100% reliability

### Smart Product Sorting

Products sorted intelligently:
- Alphabetically (A-Z)
- Numbers last (1-10)
- Example: "Riyansh Acidity" before "Riyansh 3 in 1"

### Dynamic API Configuration

Admin can change API URL without code changes:
- Admin Panel → API Settings
- Enter new URL
- Test connection
- Save and reload

---

## 📂 Project Structure

```
fitness-website/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── ProductSection.js
│   │   ├── OrderModal.js
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   └── admin/       # Admin pages
│   ├── services/        # API services
│   │   └── api.js
│   ├── config/          # Configuration
│   │   └── api.config.js
│   ├── utils/           # Utilities
│   │   └── orderBackup.js
│   ├── firebase.js      # Firebase config
│   └── App.js           # Main app
├── package.json
└── README.md
```

---

## 🔧 Configuration

### WhatsApp Number

Update in:
- `src/components/WhatsAppButton.js`
- `src/components/Hero.js`
- `src/components/ContactForm.js`
- `src/utils/orderBackup.js`

### Admin Email

Update in:
- `src/utils/orderBackup.js`

### API URL

Three ways to configure:
1. Admin Panel → API Settings
2. Environment variable: `REACT_APP_API_BASE_URL`
3. Default: `https://sskcw-api.vercel.app/api`

---

## 🐛 Troubleshooting

### CORS Error
- Check API has CORS headers enabled
- See `CORS_FIX_FOR_API.md`

### 500 Error
- Check Vercel logs
- See `API_500_ERROR_DEBUG.md`
- Backup system will handle orders

### OTP Not Received
- Check Firebase phone authentication enabled
- Add test phone numbers in Firebase Console
- Check SMS quota

### Products Not Loading
- Verify API URL in admin panel
- Check browser console for errors
- Test API: `https://sskcw-api.vercel.app/api/products`

---

## 📊 API Endpoints

Base URL: `https://sskcw-api.vercel.app/api`

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /orders` - Create order
- `POST /leads` - Create lead
- `GET /categories` - Get categories
- `GET /stats` - Get statistics

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 👨‍💻 Author

**Aditya Ghoghari**
- Email: adityaghoghari01@gmail.com
- Phone: +919270295943
- GitHub: [@adigho777-lang](https://github.com/adigho777-lang)

---

## 🙏 Acknowledgments

- Firebase for authentication
- Vercel for API hosting
- Tailwind CSS for styling
- React community

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Create Issue](https://github.com/adigho777-lang/SSKCW/issues)
- WhatsApp: [Contact](https://wa.me/919270295943)
- Email: adityaghoghari01@gmail.com

---

## 🎯 Roadmap

- [ ] Add payment gateway integration
- [ ] Implement user dashboard
- [ ] Add product reviews
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics

---

**Made with ❤️ for SSKCW - Shree Samarth Krupa Centre Wada**

🔥 **Zero Order Loss | 100% Reliability | Professional Design** 🔥
