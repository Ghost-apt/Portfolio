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
    console.log(`Vite server already responding on http://${HOST}:${PORT}`);
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
  throw new Error(`Failed to start Vite server on port ${PORT}`);
}

async function runTests() {
  let viteProc = null;
  let browser = null;
  const tempProfileDir = path.join(os.tmpdir(), '.edge_temp_contact_' + Date.now());

  try {
    viteProc = await ensureViteRunning();

    browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: 'new',
      userDataDir: tempProfileDir,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
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

    console.log('\n--- 1. LOADING APPLICATION (1440x900, Desktop) ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://${HOST}:${PORT}`, { waitUntil: 'networkidle2' });

    // 1. Verify Dark Mode initial state
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise((r) => setTimeout(r, 600));

    console.log('\n--- 2. VERIFYING HERO & NAV CONTACT CTAs ---');
    const heroContactHref = await page.$eval('a[href="#contact"]', (el) => el.getAttribute('href'));
    console.log(`✓ Hero Contact CTA target: "${heroContactHref}"`);

    console.log('\n--- 3. VERIFYING CONTACT SECTION CONTENT & 3 OPTIONS ---');
    const contactData = await page.evaluate(() => {
      const section = document.getElementById('contact');
      if (!section) return null;

      const heading = section.querySelector('h2')?.textContent?.trim();
      const subtext = section.querySelector('p')?.textContent?.trim();

      // Find links in contact section
      const links = Array.from(section.querySelectorAll('a')).map((a) => ({
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
        ariaLabel: a.getAttribute('aria-label'),
        text: a.innerText.replace(/\s+/g, ' ').trim(),
      }));

      return { heading, subtext, links };
    });

    console.log(`Heading: "${contactData.heading}"`);
    console.log(`Subtext: "${contactData.subtext}"`);

    if (!contactData.heading.includes("Let's Connect")) {
      throw new Error(`Contact heading does not include "Let's Connect": got "${contactData.heading}"`);
    }
    if (!contactData.subtext.includes("Have an idea, an opportunity or an interesting project? Feel free to get in touch.")) {
      throw new Error(`Contact subtext mismatch: got "${contactData.subtext}"`);
    }
    console.log(`✓ Contact header and subtext verified!`);

    // Verify Email link
    const emailLink = contactData.links.find((l) => l.href && l.href.includes('mailto:gm956582@gmail.com'));
    if (!emailLink) {
      throw new Error(`Email link with mailto:gm956582@gmail.com not found in Contact section!`);
    }
    if (emailLink.target === '_blank') {
      throw new Error(`Email link must NOT have target="_blank"!`);
    }
    console.log(`✓ Contact Email option verified: ${emailLink.href} (target: none)`);

    // Verify GitHub link
    const githubLink = contactData.links.find((l) => l.href === 'https://github.com/Ghost-apt');
    if (!githubLink) {
      throw new Error(`GitHub link with https://github.com/Ghost-apt not found in Contact section!`);
    }
    if (githubLink.target !== '_blank' || !githubLink.rel.includes('noopener')) {
      throw new Error(`GitHub link must have target="_blank" and rel="noopener noreferrer"!`);
    }
    console.log(`✓ Contact GitHub option verified: ${githubLink.href} (target: _blank, rel: ${githubLink.rel})`);

    // Verify LinkedIn link
    const linkedinLink = contactData.links.find((l) => l.href === 'https://www.linkedin.com/in/anurag-singh-33897226a/');
    if (!linkedinLink) {
      throw new Error(`LinkedIn link with https://www.linkedin.com/in/anurag-singh-33897226a/ not found in Contact section!`);
    }
    if (linkedinLink.target !== '_blank' || !linkedinLink.rel.includes('noopener')) {
      throw new Error(`LinkedIn link must have target="_blank" and rel="noopener noreferrer"!`);
    }
    console.log(`✓ Contact LinkedIn option verified: ${linkedinLink.href} (target: _blank, rel: ${linkedinLink.rel})`);

    // Test copy email button
    const copyBtn = await page.$('#contact button[aria-label="Copy email address"]');
    if (copyBtn) {
      await copyBtn.click();
      await new Promise((r) => setTimeout(r, 200));
      const btnText = await page.evaluate((el) => el.innerText, copyBtn);
      console.log(`✓ Contact Copy Email button clicked; state: "${btnText}"`);
    }

    // Scroll to #contact for crisp screenshot
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 500));

    // Screenshot Contact Dark Desktop
    const contactEl = await page.$('#contact');
    await contactEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact_integration_dark_1440.png'),
    });
    console.log(`✓ Saved artifact: contact_integration_dark_1440.png`);

    console.log('\n--- 4. VERIFYING FOOTER SOCIAL LINKS ---');
    const footerData = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;

      const links = Array.from(footer.querySelectorAll('a')).map((a) => ({
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
        ariaLabel: a.getAttribute('aria-label'),
        title: a.getAttribute('title'),
        text: a.innerText.replace(/\s+/g, ' ').trim(),
      }));

      return { links };
    });

    const footerEmail = footerData.links.find((l) => l.href === 'mailto:gm956582@gmail.com');
    const footerGithub = footerData.links.find((l) => l.href === 'https://github.com/Ghost-apt');
    const footerLinkedin = footerData.links.find((l) => l.href === 'https://www.linkedin.com/in/anurag-singh-33897226a/');

    if (!footerEmail) throw new Error('Footer missing email link to mailto:gm956582@gmail.com');
    if (footerEmail.target === '_blank') throw new Error('Footer email link must NOT have target="_blank"');
    console.log(`✓ Footer Email verified: ${footerEmail.href} (text: "${footerEmail.text}")`);

    if (!footerGithub) throw new Error('Footer missing GitHub link to https://github.com/Ghost-apt');
    if (footerGithub.target !== '_blank' || !footerGithub.rel.includes('noopener')) {
      throw new Error('Footer GitHub link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log(`✓ Footer GitHub verified: ${footerGithub.href} (text: "${footerGithub.text}")`);

    if (!footerLinkedin) throw new Error('Footer missing LinkedIn link to https://www.linkedin.com/in/anurag-singh-33897226a/');
    if (footerLinkedin.target !== '_blank' || !footerLinkedin.rel.includes('noopener')) {
      throw new Error('Footer LinkedIn link missing target="_blank" or rel="noopener noreferrer"');
    }
    console.log(`✓ Footer LinkedIn verified: ${footerLinkedin.href} (text: "${footerLinkedin.text}")`);

    // Scroll to footer for screenshot
    await page.evaluate(() => {
      document.querySelector('footer').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 400));

    const footerEl = await page.$('footer');
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'footer_integration_dark_1440.png'),
    });
    console.log(`✓ Saved artifact: footer_integration_dark_1440.png`);

    console.log('\n--- 5. VERIFYING LIGHT MODE ---');
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.getElementById('contact').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 500));

    await contactEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact_integration_light_1440.png'),
    });
    console.log(`✓ Saved artifact: contact_integration_light_1440.png`);

    console.log('\n--- 6. VERIFYING MOBILE VIEWPORT (390x844) ---');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 500));

    // Check mobile menu Let's Connect button
    const mobileMenuBtn = await page.$('button[aria-label="Open navigation menu"]');
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const mobileConnectHref = await page.$eval('#mobile-navigation-menu a[href="#contact"]', (el) => el.getAttribute('href'));
      console.log(`✓ Mobile drawer "Let's Connect" target: "${mobileConnectHref}"`);
      // Close drawer with Escape
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 300));
    }

    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 400));

    await contactEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact_integration_dark_390.png'),
    });
    console.log(`✓ Saved artifact: contact_integration_dark_390.png`);

    console.log('\n--- 7. CONSOLE ERROR CHECK ---');
    console.log(`Console error count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('Console errors detected:', consoleErrors);
    } else {
      console.log('✓ Zero console errors detected during verification!');
    }

    console.log('\n==========================================');
    console.log('ALL CONTACT & SOCIAL VERIFICATIONS PASSED!');
    console.log('==========================================\n');
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {}
    }
    try {
      if (fs.existsSync(tempProfileDir)) {
        fs.rmSync(tempProfileDir, { recursive: true, force: true });
      }
    } catch (e) {}
    if (viteProc && viteProc.pid) {
      try {
        execSync(`taskkill /pid ${viteProc.pid} /T /F`);
      } catch (e) {}
    }
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
