# Contact and Social Channels Integration Report

**Project:** Anurag Singh — Personal Portfolio  
**Engineer:** Full Stack Developer & AI/ML Engineer  
**Status:** Completed & Fully Verified  
**Date:** November 12, 2026  

---

## 1. Executive Summary

This task integrated verified real-world contact channels, social profiles, and direct email communications into the portfolio. All contact details were centralized into decoupled data modules (`src/data/personalInfo.js` and `src/data/socialLinks.js`), enabling straightforward maintenance without touching UI code.

The integration was applied to the **Contact Section (`#contact`)**, the **Footer**, the **Navigation bar**, and the **Mobile drawer**, while strictly preserving the monochromatic black cinematic aesthetic, fluid WebGL ambient smoke effects, responsive layouts, and dual theme (Dark/Light mode) capabilities.

---

## 2. Verified Contact Details Integrated

| Attribute | Value / Link | Destination Behavior |
| :--- | :--- | :--- |
| **Full Name** | `Anurag Singh` | Preserved in Navbar, About, Resume & Footer |
| **Professional Title** | `Full Stack Developer \| AI/ML Engineer` | Centralized in `personalInfo.js` |
| **Direct Email** | [`gm956582@gmail.com`](mailto:gm956582@gmail.com) | Triggers system default email client via `mailto:` (no blank tabs) |
| **GitHub Profile** | [`https://github.com/Ghost-apt`](https://github.com/Ghost-apt) | Opens GitHub in a new tab (`target="_blank" rel="noopener noreferrer"`) |
| **LinkedIn Profile** | [`https://www.linkedin.com/in/anurag-singh-33897226a/`](https://www.linkedin.com/in/anurag-singh-33897226a/) | Opens LinkedIn in a new tab (`target="_blank" rel="noopener noreferrer"`) |

---

## 3. Centralized Data Architecture

All contact points are centralized in decoupled data modules:

### 3.1 `src/data/personalInfo.js`
- `email`: `"gm956582@gmail.com"`
- `cta.heading`: `"Let's Connect"`
- `cta.subtext`: `"Have an idea, an opportunity or an interesting project? Feel free to get in touch."`

### 3.2 `src/data/socialLinks.js`
```javascript
export const socialLinks = {
  github: "https://github.com/Ghost-apt",
  linkedin: "https://www.linkedin.com/in/anurag-singh-33897226a/",
  email: "mailto:gm956582@gmail.com",
  rawEmail: "gm956582@gmail.com",
  githubUsername: "Ghost-apt",
  linkedinName: "Anurag Singh",
  location: "India",

  items: [
    {
      id: "email",
      label: "Email",
      displayValue: "gm956582@gmail.com",
      description: "Direct Correspondence",
      url: "mailto:gm956582@gmail.com",
      icon: "Mail",
      isExternal: false,
    },
    {
      id: "github",
      label: "GitHub",
      displayValue: "Ghost-apt",
      description: "View Repositories & Architecture",
      url: "https://github.com/Ghost-apt",
      icon: "Github",
      isExternal: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      displayValue: "Anurag Singh",
      description: "Professional Network & Inquiries",
      url: "https://www.linkedin.com/in/anurag-singh-33897226a/",
      icon: "Linkedin",
      isExternal: true,
    },
  ],
};
```

### 3.3 Synchronized Auxiliary Files
- `src/config/siteConfig.js`: Updated author email to `gm956582@gmail.com`.
- `index.html`: Updated JSON-LD schema with `mailto:gm956582@gmail.com`, `https://github.com/Ghost-apt`, and `https://www.linkedin.com/in/anurag-singh-33897226a/`.
- `src/data/faq.js`: Updated answers referencing direct email and GitHub repository source code.

---

## 4. UI Section Implementations

### 4.1 Contact Section (`src/sections/Contact/Contact.jsx`)
- **Header Display:**
  - Heading: `"Let's Connect"`
  - Subtext: `"Have an idea, an opportunity or an interesting project? Feel free to get in touch."`
- **Three Clickable Options (Left Column):**
  1. **Email Option (`gm956582@gmail.com`):**
     - Clickable link: `mailto:gm956582@gmail.com` (opens default email application without opening a new browser tab).
     - Lucide `Mail` icon.
     - One-click copy email button with visual confirmation (`Copied!`).
  2. **GitHub Option (`Ghost-apt`):**
     - Clickable link: `https://github.com/Ghost-apt`.
     - Lucide `Github` & `ArrowUpRight` icons.
     - Attributes: `target="_blank" rel="noopener noreferrer"`.
  3. **LinkedIn Option (`Anurag Singh`):**
     - Clickable link: `https://www.linkedin.com/in/anurag-singh-33897226a/`.
     - Lucide `Linkedin` & `ArrowUpRight` icons.
     - Attributes: `target="_blank" rel="noopener noreferrer"`.
- **Direct Message Form (Right Column):**
  - Live form pre-fills and dispatches `mailto:gm956582@gmail.com` with formatted user inquiry. No mock API or fake responses.

### 4.2 Footer (`src/sections/Footer/Footer.jsx`)
- Minimalist interactive contact links:
  - **Email:** `mailto:gm956582@gmail.com` (Lucide `Mail` icon, accessible label & title).
  - **GitHub:** `https://github.com/Ghost-apt` (`target="_blank" rel="noopener noreferrer"`, Lucide `Github` icon).
  - **LinkedIn:** `https://www.linkedin.com/in/anurag-singh-33897226a/` (`target="_blank" rel="noopener noreferrer"`, Lucide `Linkedin` icon).
  - Retained "Back to Top" smooth scroll button.

### 4.3 Navigation & Hero CTAs
- **Hero "Contact Me" button:** Smoothly scrolls to `#contact`.
- **Mobile Menu "Let's Connect" button:** Smoothly navigates to `#contact` and closes drawer.
- **Navbar "Resume" button:** Preserved interactive printable/downloadable PDF modal.

---

## 5. Files Modified

| File | Purpose |
| :--- | :--- |
| `src/data/personalInfo.js` | Centralized primary email and CTA header copy |
| `src/data/socialLinks.js` | Centralized verified GitHub, LinkedIn, and mailto URLs and metadata |
| `src/sections/Contact/Contact.jsx` | Implemented 3 clickable contact options (Email, GitHub, LinkedIn), updated headers |
| `src/sections/Footer/Footer.jsx` | Updated social links in footer with icons, labels, and accessible attributes |
| `src/config/siteConfig.js` | Updated global metadata email |
| `src/data/faq.js` | Updated FAQ answers with accurate email and GitHub profile |
| `index.html` | Updated Schema.org Person JSON-LD email and sameAs profile URLs |
| `docs/HOW_TO_EDIT.md` | Documented exact paths and code samples for future manual edits |
| `verify_contact_integration.cjs` | Automated test suite verifying links, DOM targets, viewports, and console errors |

---

## 6. Verification and Testing Results

Automated browser and build testing executed:

1. **Production Build:**
   - Command: `npm run build`
   - Output: `✓ built in 7.89s`, 0 errors, chunks successfully generated.

2. **Contact Section Verification:**
   - Heading verified: `"Let's Connect"`
   - Subtext verified: `"Have an idea, an opportunity or an interesting project? Feel free to get in touch."`
   - Email URL: `mailto:gm956582@gmail.com` (No `target="_blank"`, standard mail client trigger).
   - GitHub URL: `https://github.com/Ghost-apt` (`target="_blank"`, `rel="noopener noreferrer"`).
   - LinkedIn URL: `https://www.linkedin.com/in/anurag-singh-33897226a/` (`target="_blank"`, `rel="noopener noreferrer"`).
   - Copy Email button: verified active click and clipboard feedback.

3. **Footer Verification:**
   - Email link: `mailto:gm956582@gmail.com`
   - GitHub link: `https://github.com/Ghost-apt`
   - LinkedIn link: `https://www.linkedin.com/in/anurag-singh-33897226a/`

4. **Viewport & Theme Testing:**
   - Desktop 1440x900: Dark Mode and Light Mode verified.
   - Mobile 390x844: Contact section stacking and mobile navigation drawer verified.
   - Browser Console Errors: 0 errors detected.

---

## 7. Remaining Issues

None. All personal contact details and social media channels are verified and functioning in accordance with production specifications.
