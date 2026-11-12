# POST-LAUNCH MAINTENANCE GUIDE

**Project:** Anurag Singh — Personal Developer Portfolio  
**Role:** Senior Software Maintenance Engineer & DevOps Specialist  
**Target Environment:** Production  

---

## 1. Overview

This maintenance manual establishes an ongoing operational strategy for **Anurag Singh's** personal portfolio. It equips you with standardized workflows to update content, audit dependencies, monitor uptime, handle rollbacks, and troubleshoot production issues without altering the visual design, animations, or WebGL shader systems.

---

## 2. Monthly Maintenance Checklist

Set aside 15 minutes on the first week of every month to execute this verification routine:

| Check | Frequency | Verification Method | Action if Failed |
| :--- | :--- | :--- | :--- |
| **Website Uptime** | Weekly / Automated | Check live domain response | Investigate Vercel deployment logs |
| **Console Errors** | Monthly | Open DevTools Console on live site | Check for broken third-party links or browser deprecations |
| **Dependency Audit** | Monthly | Run `npm audit` in terminal | Apply compatible patch updates |
| **Outdated Packages** | Quarterly | Run `npm outdated` | Test major updates in a local feature branch |
| **WebGL Smoke Animation** | Monthly | Test desktop and mobile devices | Verify GPU context initialization and steady FPS |
| **Contact Form & Email** | Monthly | Test "Copy Email" and mailto actions | Confirm email address remains valid |
| **Project & Social Links** | Monthly | Click GitHub, LinkedIn, and demo links | Update any moved or deleted repository URLs |
| **Resume Currency** | Bi-monthly | Review skills and projects listed in modal | Update `src/data/personalInfo.js` and `public/resume/` |
| **Core Web Vitals** | Monthly | Run Google PageSpeed Insights | Verify CLS stays under 0.1 and LCP remains healthy |

---

## 3. Content Update Procedure

Your portfolio adheres to a strict **Separation of Concerns**: all content is managed in simple JavaScript data modules under `src/data/`. You **never** need to modify React JSX components.

### 8-Step Release Procedure for Content Updates:

```
[1. Edit Data Files] -> [2. Local Dev Test] -> [3. Run Build] -> [4. Commit] -> [5. Push to GitHub] -> [6. Vercel Auto-Deploys] -> [7. Live Verification]
```

1. **Open VS Code:**
   Open the portfolio directory in VS Code:
   ```bash
   code "c:\VS CODE\Portfolio"
   ```
2. **Edit the Relevant Data File:**
   - Personal bio, title, email, availability: [`src/data/personalInfo.js`](file:///c:/VS%20CODE/Portfolio/src/data/personalInfo.js)
   - Add/edit/remove projects: [`src/data/projects.js`](file:///c:/VS%20CODE/Portfolio/src/data/projects.js)
   - Skills & proficiencies: [`src/data/skills.js`](file:///c:/VS%20CODE/Portfolio/src/data/skills.js)
   - Areas of expertise: [`src/data/expertise.js`](file:///c:/VS%20CODE/Portfolio/src/data/expertise.js)
   - Experience & career timeline: [`src/data/experience.js`](file:///c:/VS%20CODE/Portfolio/src/data/experience.js)
   - Education & certifications: [`src/data/education.js`](file:///c:/VS%20CODE/Portfolio/src/data/education.js)
   - Engineering methodology: [`src/data/process.js`](file:///c:/VS%20CODE/Portfolio/src/data/process.js)
   - FAQ questions & answers: [`src/data/faq.js`](file:///c:/VS%20CODE/Portfolio/src/data/faq.js)
   - Social profile URLs: [`src/data/socialLinks.js`](file:///c:/VS%20CODE/Portfolio/src/data/socialLinks.js)
   - Smoke simulation tuning: [`src/config/ambientConfig.js`](file:///c:/VS%20CODE/Portfolio/src/config/ambientConfig.js)
3. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to verify your changes hot-reload instantly.
4. **Run Production Build Test:**
   ```bash
   npm run build
   ```
   Ensure the build passes with 0 errors.
5. **Stage and Commit Changes:**
   ```bash
   git add .
   git commit -m "chore(content): update projects and technical skills"
   ```
6. **Push to GitHub:**
   ```bash
   git push origin main
   ```
7. **Automatic Deployment:**
   Vercel detects the push and automatically triggers an atomic production deployment within ~45 seconds.
8. **Verify Live:**
   Open your public website URL to confirm the live changes look great.

---

## 4. Dependency Update Procedure

To keep build tools secure and modern without breaking your site:

### Step 1: Check Current Status
```bash
npm audit
npm outdated
```

### Step 2: Safe Minor & Patch Updates
To safely update packages to their latest compatible versions within the same major release:
```bash
npm update
```
This updates dependencies according to the semantic version constraints in `package.json` without breaking APIs.

### Step 3: Verify the Build & Animations
Always run the full build and audit suite after updating dependencies:
```bash
npm run build
node test_audit.cjs
```
Verify that:
- The WebGL smoke shader compiles without GLSL warnings.
- Framer Motion transitions remain smooth.
- Zero console errors appear.

### Step 4: Upgrading Major Packages (e.g. React 19 or Vite 6+)
When a major release is desired:
1. Create a dedicated Git branch: `git checkout -b chore/major-upgrade`.
2. Test one major upgrade at a time (e.g. `npm install vite@latest`).
3. Check for deprecated APIs or breaking configuration changes.
4. Run `npm run build` and `test_audit.cjs`.
5. Only merge back to `main` once all tests pass.

---

## 5. Deployment Recovery & Rollback Guide

If an erroneous commit or bad asset breaks the live website, follow these recovery strategies:

### Option A: Instant Rollback on Vercel (Fastest — 10 Seconds, Zero Downtime)
1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Select your portfolio project.
3. Click the **"Deployments"** tab.
4. Find the most recent working deployment in the list (marked with a green circle).
5. Click the three dots (`...`) on the right side of that deployment.
6. Select **"Instant Rollback"** (or **"Promote to Production"**).
7. Vercel immediately redirects all live traffic to the previous working build without rebuilding.

### Option B: Git Revert (Clean Source History)
To undo a problematic commit cleanly on GitHub without rewriting history:
```bash
# View recent commit hashes
git log --oneline -n 5

# Revert the latest commit
git revert HEAD --no-edit

# Or revert a specific commit
git revert <commit-hash> --no-edit

# Push the revert commit to deploy the fix
git push origin main
```

### Option C: Restoring Local Project State
If local files become corrupted or modified by mistake:
```bash
# Discard all unstaged local changes
git restore .

# Clean untracked temporary files
git clean -fd
```

---

## 6. Website Monitoring Strategy

To monitor your website availability and health without incurring monthly subscription costs:

### 1. Uptime & Availability Monitoring (Free)
* **Recommended Service:** **[UptimeRobot](https://uptimerobot.com)** (Free tier covers 50 monitors with 5-minute intervals).
* **Setup:**
  1. Create a free account at UptimeRobot.
  2. Click **"Add New Monitor"**.
  3. Monitor Type: **HTTP(s)**.
  4. Friendly Name: `Anurag Singh Portfolio`.
  5. URL: Your live domain (e.g., `https://anurag-singh-portfolio.vercel.app` or custom domain).
  6. Monitoring Interval: 5 minutes.
  7. Alert Contacts: Your email address (`anurag.dev.tech@gmail.com`).
* **Benefit:** You will receive an instant email notification if your portfolio ever becomes unreachable.

### 2. Deployment Failure Alerts (Built-in Free)
* Vercel automatically sends email notifications to your GitHub email address if a production build fails during CI/CD.
* No additional configuration is required.

### 3. Frontend Error Tracking (Optional)
* For real-world visitor error tracking, the free tier of **[Sentry](https://sentry.io)** (5,000 errors/month) or **Vercel Analytics** can be enabled from the Vercel dashboard with 1 click.
* Never hardcode private DSNs or secret tokens into public repositories.

---

## 7. Troubleshooting Guide

### Issue 1: WebGL Smoke Does Not Animate (Shows Solid Dark Background)
* **Cause 1:** User's device has hardware acceleration disabled in browser settings.
* **Resolution:** The application automatically falls back to a monochromatic CSS gradient mesh (`from-black via-[#0a0a0c] to-[#18181c]`) so typography and UI remain readable.
* **Cause 2:** Operating system has "Reduced Motion" turned on.
* **Resolution:** Intentional behavior. The engine detects `prefers-reduced-motion: reduce` and reduces temporal velocity to 0.015 for vestibular comfort.

### Issue 2: Vercel Build Fails with "Module Not Found"
* **Cause:** Case-sensitivity mismatch between Windows and Linux build containers (e.g. `import Hero from './hero'` vs `./Hero`).
* **Resolution:** Ensure component import casing matches the file system exactly. Run `npm run build` locally before pushing to catch any import casing discrepancies.

### Issue 3: Updated Project Image or PDF Resume Returns 404
* **Cause:** Asset was placed outside the `public/` directory or filename casing differs.
* **Resolution:** Static assets must live in `public/` (e.g., `public/resume/Anurag_Singh_Resume.pdf`). In Vite, files in `public/` are served at the root `/` URL path (e.g., `/resume/Anurag_Singh_Resume.pdf`).

### Issue 4: Email Client Does Not Open on "Transmit Message" Click
* **Cause:** User does not have a default desktop email client (such as Outlook, Apple Mail, or Thunderbird) configured.
* **Resolution:** The Contact section provides an immediate one-click **"Copy Email"** button (`anurag.dev.tech@gmail.com`) with visual confirmation and fallback text displays.
