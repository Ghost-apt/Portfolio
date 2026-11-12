const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const { spawn, execSync } = require('child_process');

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

async function runSectionBackgroundVerification() {
  console.log('========================================================');
  console.log('--- SECTIONS BACKGROUND INTEGRATION VERIFICATION ---');
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
    // TEST 1: DARK MODE - SKILLS, PROJECTS & CONTACT SECTIONS
    // -------------------------------------------------------------
    console.log('[Test 1] Testing Dark Mode section backgrounds (1440px)...');
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto(`http://${HOST}:${PORT}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      localStorage.setItem('anurag-portfolio-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1500));

    // A. Skills Section
    console.log('\n--> Inspecting Skills Section...');
    await page.evaluate(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 800));

    const skillsDarkMetrics = await page.evaluate(() => {
      const el = document.querySelector('#skills');
      const cs = el ? window.getComputedStyle(el) : null;
      const blueGlow = el ? el.querySelector('.bg-blue-600\\/10') : null;
      return {
        exists: Boolean(el),
        hasBlueGlow: Boolean(blueGlow),
        computedBgColor: cs ? cs.backgroundColor : null,
        computedBgImage: cs ? cs.backgroundImage : null,
      };
    });
    console.log('Skills Dark Metrics:', JSON.stringify(skillsDarkMetrics, null, 2));
    if (skillsDarkMetrics.hasBlueGlow) throw new Error('Skills section still contains blue-600 glow!');

    const shotSkillsDark = path.join(ARTIFACT_DIR, 'skills_section_dark_1440.png');
    const skillsEl = await page.$('#skills');
    if (skillsEl) await skillsEl.screenshot({ path: shotSkillsDark });
    console.log(`✓ Captured Skills Dark screenshot: ${shotSkillsDark}`);

    // B. Projects Section
    console.log('\n--> Inspecting Projects Section...');
    await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 800));

    const projectsDarkMetrics = await page.evaluate(() => {
      const el = document.querySelector('#projects');
      const cs = el ? window.getComputedStyle(el) : null;
      const cyanGlow = el ? el.querySelector('.bg-cyan-500\\/10') : null;
      return {
        exists: Boolean(el),
        hasCyanGlow: Boolean(cyanGlow),
        computedBgColor: cs ? cs.backgroundColor : null,
        computedBgImage: cs ? cs.backgroundImage : null,
      };
    });
    console.log('Projects Dark Metrics:', JSON.stringify(projectsDarkMetrics, null, 2));
    if (projectsDarkMetrics.hasCyanGlow) throw new Error('Projects section still contains cyan-500 glow!');

    const shotProjectsDark = path.join(ARTIFACT_DIR, 'projects_section_dark_1440.png');
    const projectsEl = await page.$('#projects');
    if (projectsEl) await projectsEl.screenshot({ path: shotProjectsDark });
    console.log(`✓ Captured Projects Dark screenshot: ${shotProjectsDark}`);

    // C. Contact Section
    console.log('\n--> Inspecting Contact Section...');
    await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 800));

    const contactDarkMetrics = await page.evaluate(() => {
      const el = document.querySelector('#contact');
      const cs = el ? window.getComputedStyle(el) : null;
      const vignette = el ? el.querySelector('.contact-vignette') : null;
      const colorfulGlow = el ? el.querySelector('.bg-gradient-to-tr.from-blue-600\\/20') : null;
      return {
        exists: Boolean(el),
        hasVignette: Boolean(vignette),
        hasColorfulGlow: Boolean(colorfulGlow),
        computedBgColor: cs ? cs.backgroundColor : null,
        computedBgImage: cs ? cs.backgroundImage : null,
      };
    });
    console.log('Contact Dark Metrics:', JSON.stringify(contactDarkMetrics, null, 2));
    if (!contactDarkMetrics.hasVignette) throw new Error('Contact section is missing .contact-vignette layer!');
    if (contactDarkMetrics.hasColorfulGlow) throw new Error('Contact section still contains blue/indigo/cyan glow!');

    const shotContactDark = path.join(ARTIFACT_DIR, 'contact_section_dark_1440.png');
    const contactEl = await page.$('#contact');
    if (contactEl) await contactEl.screenshot({ path: shotContactDark });
    console.log(`✓ Captured Contact Dark screenshot: ${shotContactDark}`);

    // -------------------------------------------------------------
    // TEST 2: MOBILE RESPONSIVENESS (390px)
    // -------------------------------------------------------------
    console.log('\n[Test 2] Testing Mobile Viewport (390px)...');
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));

    // Mobile Skills
    await page.evaluate(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const mobileSkillsEl = await page.$('#skills');
    const shotSkillsMobile = path.join(ARTIFACT_DIR, 'skills_section_dark_390.png');
    if (mobileSkillsEl) await mobileSkillsEl.screenshot({ path: shotSkillsMobile });
    console.log(`✓ Captured Skills Mobile: ${shotSkillsMobile}`);

    // Mobile Projects
    await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const mobileProjectsEl = await page.$('#projects');
    const shotProjectsMobile = path.join(ARTIFACT_DIR, 'projects_section_dark_390.png');
    if (mobileProjectsEl) await mobileProjectsEl.screenshot({ path: shotProjectsMobile });
    console.log(`✓ Captured Projects Mobile: ${shotProjectsMobile}`);

    // Mobile Contact
    await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const mobileContactEl = await page.$('#contact');
    const shotContactMobile = path.join(ARTIFACT_DIR, 'contact_section_dark_390.png');
    if (mobileContactEl) await mobileContactEl.screenshot({ path: shotContactMobile });
    console.log(`✓ Captured Contact Mobile: ${shotContactMobile}`);

    // -------------------------------------------------------------
    // TEST 3: LIGHT MODE COMPATIBILITY
    // -------------------------------------------------------------
    console.log('\n[Test 3] Testing Light Mode Compatibility...');
    await page.setViewport({ width: 1440, height: 900 });
    const toggleBtn = await page.$('#theme-toggle');
    if (!toggleBtn) throw new Error('#theme-toggle not found in DOM!');
    await toggleBtn.click();
    await new Promise((r) => setTimeout(r, 800));

    const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`Theme after toggle: "${lightTheme}" (Expected: "light")`);
    if (lightTheme !== 'light') throw new Error(`Expected "light", got "${lightTheme}"`);

    // Light Skills
    await page.evaluate(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const lightSkillsEl = await page.$('#skills');
    const shotSkillsLight = path.join(ARTIFACT_DIR, 'skills_section_light_1440.png');
    if (lightSkillsEl) await lightSkillsEl.screenshot({ path: shotSkillsLight });
    console.log(`✓ Captured Skills Light: ${shotSkillsLight}`);

    // Light Projects
    await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const lightProjectsEl = await page.$('#projects');
    const shotProjectsLight = path.join(ARTIFACT_DIR, 'projects_section_light_1440.png');
    if (lightProjectsEl) await lightProjectsEl.screenshot({ path: shotProjectsLight });
    console.log(`✓ Captured Projects Light: ${shotProjectsLight}`);

    // Light Contact
    await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));
    const lightContactEl = await page.$('#contact');
    const shotContactLight = path.join(ARTIFACT_DIR, 'contact_section_light_1440.png');
    if (lightContactEl) await lightContactEl.screenshot({ path: shotContactLight });
    console.log(`✓ Captured Contact Light: ${shotContactLight}`);

    // Switch back to Dark Mode
    await toggleBtn.click();
    await new Promise((r) => setTimeout(r, 600));

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
    console.log('🎉 ALL SECTION BACKGROUND TESTS PASSED SUCCESSFULLY!');
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

runSectionBackgroundVerification().catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
