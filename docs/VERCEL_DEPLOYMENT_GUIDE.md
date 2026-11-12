# VERCEL PRODUCTION DEPLOYMENT GUIDE

**Project:** Anurag Singh — Personal Developer Portfolio  
**Platform:** Vercel (Git-Integrated Deployment)  
**Target Environment:** Production  

---

## 1. Overview

This guide provides step-by-step instructions for deploying your portfolio to **Vercel** with continuous git deployment, automatic SSL (HTTPS), custom domain connectivity, and optimal static asset caching.

Your portfolio is built on a standard **Vite + React** architecture, which Vercel supports with zero required server configurations.

---

## 2. Prerequisites

1. A **GitHub account** where your repository is hosted: `https://github.com/Ghost-apt/Portfolio.git` (or renamed to `anurag-singh-portfolio`).
2. A free **Vercel account** (sign up or log in at [vercel.com](https://vercel.com)).
3. All local changes committed to your `main` branch.

---

## 3. Step-by-Step Deployment Instructions

### Step 1: Push Your Code to GitHub
Ensure all your files, components, and documentation are committed and pushed to your remote repository:

```bash
# Check working directory status
git status

# Stage all files
git add .

# Create the deployment commit
git commit -m "feat: complete production-ready developer portfolio with WebGL fluid smoke, SEO and accessibility"

# Push to your main branch
git push origin main
```

---

### Step 2: Log in to Vercel
1. Open your browser and navigate to **[vercel.com/login](https://vercel.com/login)**.
2. Select **"Continue with GitHub"**. This enables Vercel to automatically detect your repositories and set up continuous integration.

---

### Step 3: Import Your GitHub Repository
1. On your Vercel Dashboard, click the **"Add New..."** button (top right) and choose **"Project"**.
2. Locate your repository from the list:
   - Repository: `Portfolio` (or `anurag-singh-portfolio`).
3. Click the **"Import"** button next to the repository.

---

### Step 4: Configure Project Build Settings
Vercel will automatically detect the **Vite** framework preset. Verify that the settings match the following parameters:

| Configuration Field | Target Value | Description |
| :--- | :--- | :--- |
| **Project Name** | `anurag-singh-portfolio` | Choose a clean project name for your `.vercel.app` URL |
| **Framework Preset** | `Vite` | Native Vite build preset |
| **Root Directory** | `./` (Leave as default root) | Where your `package.json` is located |
| **Build Command** | `npm run build` | Compiles modular React code into `dist/` |
| **Output Directory** | `dist` | Destination of compiled production assets |
| **Install Command** | `npm install` | Installs dependencies using `package-lock.json` |

---

### Step 5: (Optional) Configure Environment Variables
Expand the **"Environment Variables"** dropdown on the Vercel project configuration page:

1. **`VITE_SITE_URL`**:
   - Set to your public domain (e.g. `https://anurag-singh-portfolio.vercel.app` or your future custom domain `https://anuragsingh.dev`).
2. Click **"Save"**.

---

### Step 6: Deploy
1. Click the blue **"Deploy"** button.
2. Vercel will launch a build container, install dependencies, run `vite build`, and deploy your assets globally across the Vercel Edge Network.
3. Build typically completes in **under 45 seconds**.
4. Once completed, Vercel presents a **"Congratulations!"** screen with a live preview screenshot and your assigned public production URL:
   ```
   https://anurag-singh-portfolio.vercel.app
   ```

---

## 4. Connecting an Optional Custom Domain

When you are ready to connect a custom domain (e.g., `anuragsingh.dev`, `anuragsingh.com`, or `anuragcodes.dev`), follow these steps:

### Step 1: Add Domain in Vercel
1. In your Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Enter your custom domain (e.g., `anuragsingh.dev`) and click **"Add"**.
3. Select whether to configure both the apex domain (`anuragsingh.dev`) and the `www` subdomain (`www.anuragsingh.dev`). Vercel recommends configuring both with automatic redirection.

### Step 2: Configure DNS Records at Your Domain Registrar
Log in to your DNS provider (e.g., Namecheap, GoDaddy, Cloudflare, Google Domains/Squarespace) and add the following records:

| Record Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (or blank) | `76.76.21.21` | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

### Step 3: SSL / HTTPS Verification
- Vercel automatically detects the DNS records within a few minutes to hours.
- A free **Let's Encrypt SSL certificate** is automatically provisioned and renewed by Vercel.
- Once verified, your domain status will show a green checkmark: **"Valid Configuration"**.

---

## 5. Continuous Deployment Workflow

Your portfolio is now configured for automated CI/CD:
- **Production Deployments:** Any `git push origin main` triggers an immediate production build and deployment.
- **Preview Deployments:** Any pull request or feature branch push triggers an isolated preview deployment URL for review before merging.
- **Zero Downtime:** Deployments are atomically swapped once the build succeeds; your live visitors never experience broken assets.

---

## 6. Verifying Your Live Deployment

Once deployed, visit your live URL and test:
1. **WebGL Ambient Smoke:** Confirm the fluid smoke simulation flows smoothly on the Hero section and closing Contact section.
2. **Navigation:** Click the top navigation links (`About`, `Skills`, `Projects`, `Contact`) to verify smooth scrolling.
3. **Project Blueprint Modals:** Click *"View Architecture"* on any project card to confirm the modal dialog opens and dismisses via `Escape`.
4. **Resume Modal:** Click *"Resume"* in the header to view your profile and test *"Print / Save PDF"*.
5. **Contact Actions:** Test the *"Copy Email"* button to verify clipboard feedback.
6. **Responsive Layout:** Open the URL on your mobile phone to verify the mobile drawer menu and touch gestures.
