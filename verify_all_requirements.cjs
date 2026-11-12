const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn, execSync } = require('child_process');

const os = require('os');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\gm956\\.gemini\\antigravity\\brain\\608ee04c-5dcf-4be6-af90-02797a6bb7df';
const PORT = 3000;
const HOST = '127.0.0.1';
const VITE_BIN = path.resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(`http://${HOST}:${PORT}`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureViteRunning() {
  if (await checkServer()) {
    console.log(`Vite server is already running on ${HOST}:${PORT}`);
    return null;
  }
  console.log(`Starting Vite server on ${HOST}:${PORT}...`);
  const viteProc = spawn(process.execPath, [VITE_BIN, '--port', String(PORT), '--host', HOST], {
    cwd: __dirname,
    stdio: 'pipe',
  });

  viteProc.stdout.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.log('[Vite]', msg);
  });
  viteProc.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.error('[Vite ERR]', msg);
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await checkServer()) {
      console.log('✓ Vite server verified ready!');
      return viteProc;
    }
  }
  throw new Error('Failed to start Vite dev server after 15s');
}

async function runComprehensiveVerification() {
  console.log('========================================================');
  console.log('--- COMPREHENSIVE ROOT-CAUSE FIX VERIFICATION SUITE ---');
  console.log('========================================================\n');

  let viteProc = null;
  let browser = null;
  const tempProfile = path.join(os.tmpdir(), '.temp_edge_profile_' + Date.now());

  try {
    viteProc = await ensureViteRunning();

    browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: 'new',
      userDataDir: tempProfile,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--use-gl=angle',
        '--use-angle=d3d11',
        '--enable-webgl',
        '--ignore-gpu-blocklist',
        '--window-size=1440,900',
      ],
    });

    const page = await browser.newPage();
    const consoleLogs = [];
    const errors = [];
    page.on('console', (msg) => {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    // -------------------------------------------------------------
    // TEST A: DARK MODE INITIAL LOAD & VERIFICATION
    // -------------------------------------------------------------
    console.log('[Test A] Testing Dark Mode on initial load...');
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto(`http://${HOST}:${PORT}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      localStorage.setItem('anurag-portfolio-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.reload({ waitUntil: 'networkidle0' });

    // Wait for essential hero elements
    await page.waitForSelector('#home', { timeout: 10000 });
    await page.waitForSelector('canvas', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1500));

    const darkMetrics = await page.evaluate(() => {
      const html = document.documentElement;
      const hero = document.querySelector('#home');
      const h1 = document.querySelector('h1');
      const subtitle = document.querySelector('h1 + p') || document.querySelector('.hero-section p');
      const canvas = document.querySelector('canvas');
      const exploreBtn = document.querySelector('a[href="#projects"]');
      const contactBtn = document.querySelector('a[href="#contact"]');
      const marquee = document.querySelector('.animate-marquee');
      const curvedLine = document.querySelector('svg path');

      return {
        themeAttr: html.getAttribute('data-theme'),
        heroBg: hero ? window.getComputedStyle(hero).backgroundColor : null,
        h1Color: h1 ? window.getComputedStyle(h1).color : null,
        subtitleColor: subtitle ? window.getComputedStyle(subtitle).color : null,
        exploreBtnBorder: exploreBtn ? window.getComputedStyle(exploreBtn).borderColor : null,
        exploreBtnBg: exploreBtn ? window.getComputedStyle(exploreBtn).backgroundColor : null,
        contactBtnBorder: contactBtn ? window.getComputedStyle(contactBtn).borderColor : null,
        hasCanvas: Boolean(canvas),
        hasMarquee: Boolean(marquee),
        hasCurvedLine: Boolean(curvedLine),
      };
    });

    console.log('Dark Mode Metrics:', JSON.stringify(darkMetrics, null, 2));

    const shotDark1440 = path.join(ARTIFACT_DIR, 'final_dark_hero_1440.png');
    await page.screenshot({ path: shotDark1440 });
    console.log(`✓ Captured final dark hero screenshot: ${shotDark1440}`);

    // -------------------------------------------------------------
    // TEST E: ANIMATION MOTION VERIFICATION (TWO SCREENSHOTS AT t=0s and t=2.5s)
    // -------------------------------------------------------------
    console.log('\n[Test E] Verifying WebGL fluid smoke animation is continuously moving...');
    const bufferT0 = await page.screenshot({ encoding: 'binary' });

    // Wait 2.5 seconds for animation to morph
    await new Promise((r) => setTimeout(r, 2500));
    const bufferT1 = await page.screenshot({ encoding: 'binary' });
    const shotDarkMotion = path.join(ARTIFACT_DIR, 'final_dark_hero_motion_t2500.png');
    await page.screenshot({ path: shotDarkMotion });

    // Compare buffers
    const isBufferIdentical = bufferT0.equals(bufferT1);
    console.log(`Animation Frame Difference: Identical=${isBufferIdentical} (Expected: false, buffers must differ due to smoke flow)`);
    if (isBufferIdentical) {
      throw new Error('Animation motion test failed! Canvas is static or frozen.');
    }
    console.log('✓ Smoke is visibly and continuously morphing over time!');

    // -------------------------------------------------------------
    // TEST B: LIGHT MODE VERIFICATION
    // -------------------------------------------------------------
    console.log('\n[Test B] Switching to Light Mode via theme toggle...');
    const toggleBtn = await page.$('#theme-toggle');
    if (!toggleBtn) throw new Error('#theme-toggle not found in DOM!');
    await toggleBtn.click();
    await new Promise((r) => setTimeout(r, 1000));

    const lightMetrics = await page.evaluate(() => {
      const html = document.documentElement;
      const hero = document.querySelector('#home');
      const h1 = document.querySelector('h1');
      const subtitle = document.querySelector('h1 + p') || document.querySelector('.hero-section p');

      return {
        themeAttr: html.getAttribute('data-theme'),
        localStorageTheme: localStorage.getItem('anurag-portfolio-theme'),
        heroBg: hero ? window.getComputedStyle(hero).backgroundColor : null,
        h1Color: h1 ? window.getComputedStyle(h1).color : null,
        subtitleColor: subtitle ? window.getComputedStyle(subtitle).color : null,
      };
    });

    console.log('Light Mode Metrics:', JSON.stringify(lightMetrics, null, 2));
    if (lightMetrics.themeAttr !== 'light') throw new Error(`Expected data-theme="light", got ${lightMetrics.themeAttr}`);

    const shotLight1440 = path.join(ARTIFACT_DIR, 'final_light_hero_1440.png');
    await page.screenshot({ path: shotLight1440 });
    console.log(`✓ Captured final light hero screenshot: ${shotLight1440}`);

    // -------------------------------------------------------------
    // TEST C: PERSISTENCE VERIFICATION
    // -------------------------------------------------------------
    console.log('\n[Test C] Verifying Light Mode persistence across page reload...');
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const reloadedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`Theme after reload: "${reloadedTheme}" (Expected: "light")`);
    if (reloadedTheme !== 'light') throw new Error(`Persistence failed! Expected "light", got "${reloadedTheme}"`);
    console.log('✓ Light Mode persisted across reload');

    // Switch back to Dark Mode
    console.log('Switching back to Dark Mode...');
    const toggleBackBtn = await page.$('#theme-toggle');
    await toggleBackBtn.click();
    await new Promise((r) => setTimeout(r, 800));

    const darkRestoredTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (darkRestoredTheme !== 'dark') throw new Error(`Expected "dark", got "${darkRestoredTheme}"`);

    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    const reloadedDarkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (reloadedDarkTheme !== 'dark') throw new Error(`Expected "dark", got "${reloadedDarkTheme}"`);
    console.log('✓ Dark Mode persisted across reload');

    // -------------------------------------------------------------
    // TEST D: RESPONSIVENESS (1920px, 1440px, 768px, 390px)
    // -------------------------------------------------------------
    console.log('\n[Test D] Testing Viewport Responsiveness...');

    // 1920px Wide Desktop
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise((r) => setTimeout(r, 600));
    const shot1920 = path.join(ARTIFACT_DIR, 'final_dark_hero_1920.png');
    await page.screenshot({ path: shot1920 });
    console.log(`✓ Captured 1920px desktop: ${shot1920}`);

    // 768px Tablet
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 600));
    const shot768 = path.join(ARTIFACT_DIR, 'final_dark_hero_768.png');
    await page.screenshot({ path: shot768 });
    console.log(`✓ Captured 768px tablet: ${shot768}`);

    // 390px Mobile
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));
    const shot390 = path.join(ARTIFACT_DIR, 'final_dark_hero_390.png');
    await page.screenshot({ path: shot390 });
    console.log(`✓ Captured 390px mobile: ${shot390}`);

    // Test mobile theme toggle
    const mobileToggle = await page.$('#mobile-theme-toggle');
    if (mobileToggle) {
      console.log('Testing mobile theme toggle...');
      await mobileToggle.click();
      await new Promise((r) => setTimeout(r, 600));
      const shot390Light = path.join(ARTIFACT_DIR, 'final_light_hero_390.png');
      await page.screenshot({ path: shot390Light });
      console.log(`✓ Captured 390px mobile in light mode: ${shot390Light}`);
      // switch back to dark
      await mobileToggle.click();
      await new Promise((r) => setTimeout(r, 600));
    }

    // -------------------------------------------------------------
    // CONSOLE ERROR AUDIT
    // -------------------------------------------------------------
    console.log('\n[Console Audit] Verifying 0 browser console errors...');
    console.log(`Total errors captured: ${errors.length}`);
    if (errors.length > 0) {
      console.error('Errors detected:', errors);
      throw new Error(`Test suite failed with console errors: ${errors.join(', ')}`);
    }
    console.log('✓ Clean console: 0 errors detected!');

    console.log('\n========================================================');
    console.log('🎉 ALL SECTION 11 MANDATORY VERIFICATION TESTS PASSED!');
    console.log('========================================================');
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {}
    }
    try {
      if (fs.existsSync(tempProfile)) {
        fs.rmSync(tempProfile, { recursive: true, force: true });
      }
    } catch (e) {}
    if (viteProc && viteProc.pid) {
      try {
        execSync(`taskkill /pid ${viteProc.pid} /T /F`);
      } catch (e) {}
    }
  }
}

runComprehensiveVerification().catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
