# Production Deployment Guide

This guide provides step-by-step instructions for building, testing, and deploying **Anurag Singh's** personal developer portfolio to popular modern hosting platforms.

---

## 🛠️ Step 1: Local Production Build & Testing

Always verify that your project builds cleanly without errors before pushing to production.

### 1. Run the Build Command
In your terminal, execute:

```bash
npm run build
```

This compiles all React components, bundles Tailwind CSS, processes GLSL shaders, and places optimized static assets in the `dist/` directory.

### 2. Preview the Production Bundle Locally
Test the production build locally to ensure all assets and shaders load properly:

```bash
npm run preview
```

Open the printed URL (typically `http://localhost:4173`) in your browser to verify:
- The real-time WebGL ambient smoke renders smoothly at 60 FPS.
- Project modals open and close as expected.
- All links and navigation anchors jump to their correct sections.

---

## 🚀 Step 2: Deploying to Vercel (Recommended)

Vercel provides native, zero-configuration deployment for Vite applications.

### Option A: Via GitHub Integration (Automated CI/CD)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: modular portfolio architecture"
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select your GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your site will be live on a global CDN in seconds.

### Option B: Via Vercel CLI
If you prefer deploying directly from your terminal:
```bash
npm install -g vercel
vercel
```
Follow the terminal prompts and select the default options. To deploy to production:
```bash
vercel --prod
```

---

## 🌐 Step 3: Deploying to Netlify

### Option A: Via Netlify Web Dashboard
1. Push your code to GitHub.
2. Go to [netlify.com](https://netlify.com) and select **"Add new site"** → **"Import an existing project"**.
3. Connect your GitHub account and choose the portfolio repository.
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

### Netlify SPA Routing Note:
If using client-side routing, add a file named `public/_redirects` containing:
```
/*    /index.html   200
```
This is already pre-configured for your project.

---

## 🐙 Step 4: Deploying to GitHub Pages

To host free on GitHub Pages:

### 1. Update `vite.config.js`
If deploying to `https://<username>.github.io/<repo-name>/`, set the `base` path in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/Portfolio/', // Replace with your repository name
  plugins: [react()],
});
```
*(If deploying to a custom domain like `anuragsingh.dev`, keep `base: '/'`)*.

### 2. Install `gh-pages`
```bash
npm install --save-dev gh-pages
```

### 3. Add Deployment Scripts to `package.json`
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 4. Deploy
```bash
npm run deploy
```

---

## 🔒 Step 5: Connecting a Custom Domain

1. In your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.):
   - Add an **A Record** pointing to your host's IP (e.g., `76.76.21.21` for Vercel).
   - Add a **CNAME Record** for `www` pointing to `cname.vercel-dns.com` (or your platform's CNAME).
2. In your Vercel or Netlify dashboard:
   - Go to **Project Settings** → **Domains**.
   - Enter your domain (e.g., `anuragsingh.dev`).
3. SSL certificates are provisioned automatically via Let's Encrypt within 5 minutes.

---

## ⚡ Performance & Production Checklist

- [x] Run `npm run build` with 0 errors.
- [x] Ensure all personal information in `src/data/personalInfo.js` is accurate.
- [x] Verify project links and GitHub repositories in `src/data/projects.js`.
- [x] Place your actual resume PDF in `public/resume/Anurag_Singh_Resume.pdf`.
- [x] Update social media URLs in `src/data/socialLinks.js`.
- [x] Test WebGL fallback on devices without hardware acceleration.
- [x] Verify mobile responsiveness across portrait and landscape viewports.
