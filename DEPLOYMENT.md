# Quick Deployment Guide 🚀

This guide will help you deploy your university landing pages quickly to any free hosting platform with SSL.

## Prerequisites ✅

Before deploying:
1. ✅ Update Pipedream endpoint in `js/manipal.js` and `js/symbiosis.js`
2. ✅ Test locally to ensure everything works
3. ✅ Have a GitHub account (recommended for most options)

## 🏆 Recommended: Netlify (Easiest & Fastest)

### Method 1: Drag & Drop (2 minutes)

1. **Prepare your files:**
   - Make sure all files are in the `university-landing-pages` folder
   - Update Pipedream endpoint URLs

2. **Deploy:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the entire `university-landing-pages` folder
   - Wait 30 seconds
   - Done! ✨

3. **Your site is live:**
   - URL: `https://random-name-12345.netlify.app`
   - SSL: ✅ Automatically enabled
   - Custom domain: Available in settings

### Method 2: GitHub + Netlify (Best for Updates)

1. **Push to GitHub:**
```bash
cd university-landing-pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/university-landing-pages.git
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure:
     - Build command: (leave empty)
     - Publish directory: `.` or `./`
   - Click "Deploy site"

3. **Done!** Your site is live with automatic SSL

### Method 3: Netlify CLI (For Developers)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project folder
cd university-landing-pages
netlify deploy --prod

# Follow prompts and your site will be live!
```

## 🔥 Alternative: Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd university-landing-pages
vercel --prod

# Follow prompts - done in 2 minutes!
```

### Option B: Vercel Dashboard

1. Push code to GitHub (see GitHub steps above)
2. Go to [Vercel](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Leave all settings as default
6. Click "Deploy"
7. Done! ✅

## 📘 GitHub Pages (Free & Simple)

### Step-by-Step:

1. **Create Repository:**
   - Go to GitHub
   - Create new repository named `university-landing-pages`
   - Don't initialize with README

2. **Push Code:**
```bash
cd university-landing-pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/university-landing-pages.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Click "Save"

4. **Access Your Site:**
   - URL: `https://YOUR-USERNAME.github.io/university-landing-pages/`
   - SSL: ✅ Automatically enabled
   - Wait 2-3 minutes for first deployment

## 🎨 Render (Another Free Option)

1. **Prepare:**
   - Push code to GitHub (see above)

2. **Deploy:**
   - Go to [Render](https://render.com)
   - Sign up/Login
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - Name: `university-landing-pages`
     - Build Command: (leave empty)
     - Publish Directory: `.`
   - Click "Create Static Site"

3. **Done!** Site is live with SSL

## 🧪 Post-Deployment Testing

After deployment, test everything:

### 1. Access Test
- [ ] Visit your deployed URL
- [ ] Check index.html loads
- [ ] Navigate to manipal.html
- [ ] Navigate to symbiosis.html

### 2. Functionality Test
- [ ] All sections display correctly
- [ ] Images and styles load
- [ ] Click "Check Course-wise Fees" - modal opens
- [ ] Fill out form with test data
- [ ] Submit form - check Pipedream receives data
- [ ] Verify success message appears

### 3. Mobile Test
- [ ] Open site on mobile device
- [ ] Test form on mobile
- [ ] Check modal on mobile
- [ ] Verify all buttons work

### 4. SSL Test
- [ ] URL starts with `https://` ✅
- [ ] Browser shows padlock icon 🔒
- [ ] No mixed content warnings

## 🔄 Making Updates

### For Netlify/Vercel (GitHub connected):
```bash
# Make your changes, then:
git add .
git commit -m "Update content"
git push

# Your site updates automatically!
```

### For Netlify Drag & Drop:
- Make changes locally
- Drag the folder again to Netlify Drop
- New version deploys instantly

### For GitHub Pages:
```bash
# Make changes, then:
git add .
git commit -m "Update content"
git push

# Wait 2-3 minutes for changes to appear
```

## 🎯 Custom Domain (Optional)

### On Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records as instructed
4. SSL automatically configured

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL automatically configured

### On GitHub Pages:
1. Go to Repository Settings → Pages
2. Add custom domain
3. Update DNS:
   - A record to GitHub's IPs
   - CNAME record to `YOUR-USERNAME.github.io`
4. Enable "Enforce HTTPS"

## 🆘 Troubleshooting

### Site not loading
- Check if deployment completed successfully
- Look for build logs/errors
- Verify all files uploaded correctly

### Forms not working
- Check browser console for errors
- Verify Pipedream endpoint URL is correct
- Test Pipedream endpoint separately

### SSL not working
- Wait 5-10 minutes after deployment
- Most platforms enable SSL automatically
- Check platform's SSL settings

### JSON files not loading
- Verify file paths are correct
- Check browser Network tab
- Ensure files are in correct folders

## 📊 Monitoring Your Site

### Netlify Analytics (Free tier)
- Page views
- Top pages
- Bandwidth usage

### Vercel Analytics (Paid but has free tier)
- Performance metrics
- Real user monitoring

### Google Analytics (Free)
Add this to your HTML `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📝 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Pipedream endpoint configured in both JS files
- [ ] All JSON files are present
- [ ] Images/assets load correctly
- [ ] Tested locally
- [ ] Forms validate properly
- [ ] Modal works correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] README updated with deployment URL

## 🎉 Success!

Your university landing pages are now live with:
- ✅ Free hosting
- ✅ SSL certificate (HTTPS)
- ✅ Global CDN
- ✅ Automatic deployments (if using GitHub)
- ✅ Professional URL

### Share Your Work
Update your README with the live URL:
```markdown
## 🌐 Live Demo
- Landing Page 1 (Manipal): https://your-site.netlify.app/manipal.html
- Landing Page 2 (Symbiosis): https://your-site.netlify.app/symbiosis.html
```

## 🚀 Next Steps

1. Test your live site thoroughly
2. Set up Pipedream workflow (see PIPEDREAM_SETUP.md)
3. Monitor form submissions
4. Share with stakeholders
5. Collect feedback and iterate

Need help? Check README.md for detailed documentation!
