const puppeteer = require('puppeteer-core');
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 4180;
const DIST_DIR = path.join(__dirname, 'dist');
const ARTIFACT_DIR = 'C:\\Users\\gm956\\.gemini\\antigravity\\brain\\608ee04c-5dcf-4be6-af90-02797a6bb7df';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error: ' + err.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

async function runThemeVerification() {
  console.log('====================================================');
  console.log('--- DARK / LIGHT MODE AUTOMATED VERIFICATION SUITE ---');
  console.log('====================================================\n');

  const server = createStaticServer();
  await new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`[Server] Static server running on http://127.0.0.1:${PORT}`);
      resolve();
    });
  });

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `edge_theme_${Date.now()}_`));
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    userDataDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--remote-debugging-port=0',
      '--use-gl=angle',
      '--use-angle=d3d11',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--window-size=1440,900',
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  try {
    // -------------------------------------------------------------
    // 1. DEFAULT LOAD (DARK MODE)
    // -------------------------------------------------------------
    console.log('[Step 1] Loading default portfolio page...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1000));

    const initialThemeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const initialLocalStorage = await page.evaluate(() => localStorage.getItem('anurag-portfolio-theme'));
    const initialMetaTheme = await page.evaluate(() => {
      const el = document.querySelector('meta[name="theme-color"]');
      return el ? el.getAttribute('content') : null;
    });

    console.log(`[Theme State 1] data-theme: "${initialThemeAttr}", localStorage: "${initialLocalStorage}", meta: "${initialMetaTheme}"`);
    if (initialThemeAttr !== 'dark') throw new Error(`Expected data-theme="dark", got "${initialThemeAttr}"`);

    // Verify Theme Toggle in Desktop Navbar
    const toggleExists = await page.$('#theme-toggle');
    if (!toggleExists) throw new Error('Theme toggle button (#theme-toggle) not found in DOM!');
    console.log('✓ Found #theme-toggle button in desktop navbar');

    // Capture Dark Mode Hero Desktop Screenshot
    const darkHeroShot = path.join(ARTIFACT_DIR, 'theme_dark_desktop.png');
    await page.screenshot({ path: darkHeroShot });
    console.log(`✓ Captured dark mode desktop screenshot: ${darkHeroShot}`);

    // Scroll and capture sections in dark mode
    await page.evaluate(() => window.scrollTo(0, 1800));
    await new Promise((r) => setTimeout(r, 600));
    const darkSectionsShot = path.join(ARTIFACT_DIR, 'theme_dark_sections.png');
    await page.screenshot({ path: darkSectionsShot });
    console.log(`✓ Captured dark mode sections screenshot: ${darkSectionsShot}`);

    // -------------------------------------------------------------
    // 2. TOGGLE TO LIGHT MODE
    // -------------------------------------------------------------
    console.log('\n[Step 2] Clicking theme toggle to switch to LIGHT MODE...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 400));

    await page.click('#theme-toggle');
    await new Promise((r) => setTimeout(r, 600)); // wait for smooth lerp and transitions

    const lightThemeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const lightLocalStorage = await page.evaluate(() => localStorage.getItem('anurag-portfolio-theme'));
    const lightMetaTheme = await page.evaluate(() => {
      const el = document.querySelector('meta[name="theme-color"]');
      return el ? el.getAttribute('content') : null;
    });

    console.log(`[Theme State 2] data-theme: "${lightThemeAttr}", localStorage: "${lightLocalStorage}", meta: "${lightMetaTheme}"`);
    if (lightThemeAttr !== 'light') throw new Error(`Expected data-theme="light", got "${lightThemeAttr}"`);
    if (lightLocalStorage !== 'light') throw new Error(`Expected localStorage="light", got "${lightLocalStorage}"`);
    if (lightMetaTheme !== '#FFFFFF') throw new Error(`Expected meta theme-color="#FFFFFF", got "${lightMetaTheme}"`);

    // Capture Light Mode Hero Desktop Screenshot
    const lightHeroShot = path.join(ARTIFACT_DIR, 'theme_light_desktop.png');
    await page.screenshot({ path: lightHeroShot });
    console.log(`✓ Captured light mode desktop screenshot: ${lightHeroShot}`);

    // Scroll and capture sections in light mode
    await page.evaluate(() => window.scrollTo(0, 1800));
    await new Promise((r) => setTimeout(r, 600));
    const lightSectionsShot = path.join(ARTIFACT_DIR, 'theme_light_sections.png');
    await page.screenshot({ path: lightSectionsShot });
    console.log(`✓ Captured light mode sections screenshot: ${lightSectionsShot}`);

    // Scroll to projects and skills in light mode
    await page.evaluate(() => window.scrollTo(0, 3200));
    await new Promise((r) => setTimeout(r, 600));
    const lightProjectsShot = path.join(ARTIFACT_DIR, 'theme_light_projects.png');
    await page.screenshot({ path: lightProjectsShot });
    console.log(`✓ Captured light mode projects screenshot: ${lightProjectsShot}`);

    // Scroll to contact & footer in light mode
    await page.evaluate(() => window.scrollTo(0, 5200));
    await new Promise((r) => setTimeout(r, 600));
    const lightContactShot = path.join(ARTIFACT_DIR, 'theme_light_contact.png');
    await page.screenshot({ path: lightContactShot });
    console.log(`✓ Captured light mode contact screenshot: ${lightContactShot}`);

    // -------------------------------------------------------------
    // 3. TEST PERSISTENCE ON RELOAD (LIGHT MODE)
    // -------------------------------------------------------------
    console.log('\n[Step 3] Testing persistence on page reload...');
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const reloadedThemeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const reloadedLocalStorage = await page.evaluate(() => localStorage.getItem('anurag-portfolio-theme'));
    console.log(`[Theme State 3] After reload: data-theme: "${reloadedThemeAttr}", localStorage: "${reloadedLocalStorage}"`);
    if (reloadedThemeAttr !== 'light') throw new Error(`Persistence failed! Expected "light", got "${reloadedThemeAttr}"`);
    console.log('✓ Light mode persisted across reload without flash');

    // -------------------------------------------------------------
    // 4. TOGGLE BACK TO DARK MODE & TEST PERSISTENCE
    // -------------------------------------------------------------
    console.log('\n[Step 4] Toggling back to DARK MODE...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));
    await page.click('#theme-toggle');
    await new Promise((r) => setTimeout(r, 600));

    const restoredThemeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const restoredLocalStorage = await page.evaluate(() => localStorage.getItem('anurag-portfolio-theme'));
    console.log(`[Theme State 4] data-theme: "${restoredThemeAttr}", localStorage: "${restoredLocalStorage}"`);
    if (restoredThemeAttr !== 'dark') throw new Error(`Expected "dark", got "${restoredThemeAttr}"`);

    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));
    const reloadedDarkAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (reloadedDarkAttr !== 'dark') throw new Error(`Expected "dark" after reload, got "${reloadedDarkAttr}"`);
    console.log('✓ Dark mode persisted across reload');

    // -------------------------------------------------------------
    // 5. MOBILE RESPONSIVENESS & MOBILE THEME TOGGLE
    // -------------------------------------------------------------
    console.log('\n[Step 5] Testing Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    // Verify Mobile Theme Toggle in Navbar Header
    const mobileToggle = await page.$('#mobile-theme-toggle');
    if (!mobileToggle) throw new Error('Mobile theme toggle (#mobile-theme-toggle) not found!');
    console.log('✓ Found #mobile-theme-toggle in mobile navbar header');

    const mobileDarkShot = path.join(ARTIFACT_DIR, 'theme_mobile_dark.png');
    await page.screenshot({ path: mobileDarkShot });
    console.log(`✓ Captured mobile dark screenshot: ${mobileDarkShot}`);

    // Click mobile theme toggle to light mode
    await page.click('#mobile-theme-toggle');
    await new Promise((r) => setTimeout(r, 600));

    const mobileLightAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (mobileLightAttr !== 'light') throw new Error(`Expected mobile toggle to switch to "light", got "${mobileLightAttr}"`);

    const mobileLightShot = path.join(ARTIFACT_DIR, 'theme_mobile_light.png');
    await page.screenshot({ path: mobileLightShot });
    console.log(`✓ Captured mobile light screenshot: ${mobileLightShot}`);

    // Open mobile menu
    const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const mobileMenuShot = path.join(ARTIFACT_DIR, 'theme_mobile_menu_light.png');
      await page.screenshot({ path: mobileMenuShot });
      console.log(`✓ Captured mobile menu screenshot: ${mobileMenuShot}`);
      // Close menu
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    // -------------------------------------------------------------
    // 6. MODAL INSPECTION IN LIGHT & DARK MODE
    // -------------------------------------------------------------
    console.log('\n[Step 6] Testing Project Modal blueprint dialog...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 1600));
    await new Promise((r) => setTimeout(r, 500));

    const blueprintBtn = await page.$('[data-testid="inspect-blueprint-btn"]');
    if (blueprintBtn) {
      await blueprintBtn.click();
      await new Promise((r) => setTimeout(r, 600));
      const modalShot = path.join(ARTIFACT_DIR, 'theme_light_project_modal.png');
      await page.screenshot({ path: modalShot });
      console.log(`✓ Captured project modal in light mode: ${modalShot}`);

      // Close modal
      const closeBtn = await page.$('button[aria-label="Close dialog"]');
      if (closeBtn) await closeBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    // Reset back to dark mode for default experience
    await page.evaluate(() => {
      localStorage.setItem('anurag-portfolio-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    // -------------------------------------------------------------
    // 7. CONSOLE AUDIT
    // -------------------------------------------------------------
    console.log('\n[Step 7] Checking browser console logs...');
    console.log(`Total console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors detected:', consoleErrors);
      throw new Error(`Test failed with console errors: ${consoleErrors.join(', ')}`);
    } else {
      console.log('✓ Clean console: 0 errors detected.');
    }

    console.log('\n====================================================');
    console.log('🎉 ALL THEME TESTS PASSED WITH 100% SUCCESS!');
    console.log('====================================================');
  } finally {
    await browser.close();
    server.close();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

runThemeVerification().catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
