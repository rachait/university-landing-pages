# 🚀 Quick Start Guide - University Landing Pages

## ⚡ Get Started in 5 Minutes

### Step 1: Test Locally (2 minutes)

Open PowerShell/Terminal in the project folder:

```powershell
# Navigate to project
cd university-landing-pages

# Start local server
python -m http.server 3000
# OR
npx http-server -p 3000
```

Open browser: **http://localhost:3000**

### Step 2: Set Up Pipedream (2 minutes)

1. Go to [pipedream.com](https://pipedream.com) → Sign up (free)
2. Click **"New Workflow"**
3. Add **HTTP/Webhook** trigger
4. Copy the endpoint URL (looks like: `https://xxxxx.m.pipedream.net`)

### Step 3: Update Endpoint (1 minute)

Edit these two files and replace the URL:

**`js/manipal.js` - Line 4:**
```javascript
const PIPEDREAM_ENDPOINT = 'https://xxxxx.m.pipedream.net'; // Paste your URL
```

**`js/symbiosis.js` - Line 4:**
```javascript
const PIPEDREAM_ENDPOINT = 'https://xxxxx.m.pipedream.net'; // Paste your URL
```

### Step 4: Deploy (2 minutes)

**Easiest method - Netlify Drop:**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `university-landing-pages` folder
3. Wait 30 seconds
4. Done! ✅ Your site is live with SSL

**Your URLs will be:**
- Home: `https://your-site-name.netlify.app/`
- Manipal: `https://your-site-name.netlify.app/manipal.html`
- Symbiosis: `https://your-site-name.netlify.app/symbiosis.html`

---

## 📋 What's Included

### Pages (3):
- ✅ `index.html` - Home page
- ✅ `manipal.html` - Manipal Academy landing page
- ✅ `symbiosis.html` - Symbiosis University landing page

### Features:
- ✅ Fully responsive (mobile & desktop)
- ✅ Lead form with validation
- ✅ Course fee modal
- ✅ Pipedream integration
- ✅ Simple & nested JSON APIs
- ✅ No external dependencies

---

## 🧪 Quick Test

After deployment:

1. **Open your site**
2. **Click "Check Course-wise Fees"** → Modal should open
3. **Fill the form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Select state, course, year
   - Check consent
4. **Submit** → Should see success message
5. **Check Pipedream** → You should see the data

---

## 📁 File Structure

```
university-landing-pages/
├── index.html              ← Home page
├── manipal.html            ← University 1
├── symbiosis.html          ← University 2
├── css/styles.css          ← All styles
├── js/
│   ├── utils.js            ← Utilities
│   ├── manipal.js          ← Page 1 logic
│   └── symbiosis.js        ← Page 2 logic
├── data/
│   ├── university1.json    ← Manipal data
│   └── university2.json    ← Symbiosis data
├── api/
│   ├── universities.json   ← Simple API
│   └── courses.json        ← Simple API
└── [Documentation files]
```

---

## 🔧 Form Validation Rules

- **Name:** Letters and spaces only, min 2 characters
- **Email:** Valid email format
- **Phone:** 10-digit Indian mobile (starts with 6-9)
- **State:** Required selection
- **Course:** Required selection
- **Year:** Required selection
- **Consent:** Must be checked

---

## 🌐 Live URLs After Deployment

Update these after deploying:

- **Live Site:** `___________________________`
- **Manipal Page:** `___________________________`
- **Symbiosis Page:** `___________________________`
- **Pipedream Endpoint:** `___________________________`

---

## 📊 Available JSON APIs

Test these in your browser after deployment:

1. **Universities List:**
   `https://your-site.netlify.app/api/universities.json`

2. **All Courses:**
   `https://your-site.netlify.app/api/courses.json`

3. **Manipal Data:**
   `https://your-site.netlify.app/data/university1.json`

4. **Symbiosis Data:**
   `https://your-site.netlify.app/data/university2.json`

---

## ⚠️ Before Deploying Checklist

- [ ] Updated Pipedream endpoint in both JS files
- [ ] Tested locally - all pages load
- [ ] Modal opens and shows fee table
- [ ] Form validates correctly
- [ ] Form submits without errors

---

## 🆘 Quick Troubleshooting

### Problem: Form not submitting
**Solution:** Check browser console, verify Pipedream URL is correct

### Problem: Modal not opening
**Solution:** Check browser console for JavaScript errors

### Problem: Styles not loading
**Solution:** Clear browser cache and refresh

### Problem: JSON data not showing
**Solution:** Check file paths, ensure local server is running

---

## 📚 Full Documentation

For detailed information, see:

- **README.md** - Complete project documentation
- **PIPEDREAM_SETUP.md** - Detailed Pipedream setup with email/Sheets
- **DEPLOYMENT.md** - All deployment options and instructions
- **PROJECT_SUMMARY.md** - Complete feature list and overview

---

## 🎯 Deployment Options Summary

| Platform | Time | Method | SSL | Custom Domain |
|----------|------|--------|-----|---------------|
| **Netlify** | 2 min | Drag & Drop | ✅ Auto | ✅ Free |
| **Vercel** | 3 min | CLI/GitHub | ✅ Auto | ✅ Free |
| **GitHub Pages** | 5 min | Git Push | ✅ Auto | ✅ Free |
| **Render** | 5 min | GitHub | ✅ Auto | ✅ Free |

---

## 💡 Pro Tips

1. **Test locally first** - Always test before deploying
2. **Check Pipedream logs** - Monitor form submissions
3. **Use real data** - Test with your actual details first
4. **Mobile test** - Check on phone before going live
5. **SSL verification** - Ensure padlock shows in browser

---

## 🎉 You're Ready!

1. ✅ Test locally
2. ✅ Set up Pipedream
3. ✅ Update endpoints
4. ✅ Deploy
5. ✅ Test live site
6. ✅ Start receiving leads!

**Need help?** Check the detailed documentation files or browser console for errors.

---

## 📞 Form Submission Flow

```
User fills form
    ↓
JavaScript validates
    ↓
POST to Pipedream
    ↓
Pipedream receives data
    ↓
Success message shown
    ↓
Form resets
```

---

## 🔐 What Happens to Form Data

1. **Captured:** Form data collected client-side
2. **Validated:** All fields validated before submission
3. **Sent:** POSTed to Pipedream endpoint as JSON
4. **Received:** Pipedream logs the submission
5. **Optional:** Email notifications, Google Sheets, etc.

---

## ✨ Features Highlights

- 📱 **Responsive:** Works on all devices
- ⚡ **Fast:** No page reloads
- ✅ **Validated:** Real-time form validation
- 🎨 **Modern:** Clean, professional design
- 🔒 **Secure:** SSL-ready, secure form handling
- 📊 **Data-driven:** Dynamic content from JSON
- 🚀 **Production-ready:** Deploy immediately

---

**Ready to launch?** Follow the 4 steps above and you'll be live in 5 minutes! 🚀

Good luck! 🎓
