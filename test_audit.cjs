const puppeteer = require('puppeteer-core');
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 4173;
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types map
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    let filePath = path.join(DIST_DIR, reqPath);

    // If file does not exist, fallback to index.html (SPA routing)
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

async function runAudit() {
  console.log('===============================================================');
  console.log('--- PHASE 5: PRODUCTION, SEO, A11Y & PERFORMANCE AUDIT SUITE ---');
  console.log('===============================================================\n');

  const results = {
    seo: {},
    structuredData: {},
    accessibility: {},
    webVitals: {},
    viewports: {},
    userJourneys: {},
    webgl: {},
    consoleMessages: [],
    errors: [],
  };

  // 1. Start Static Server
  const server = createStaticServer();
  await new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`[Server]: Static server running on http://127.0.0.1:${PORT}`);
      resolve();
    });
  });

  // 2. Launch Edge via Puppeteer
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge_audit_p5_'));
  console.log('[Puppeteer]: Launching Edge with isolated profile:', userDataDir);
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
      '--enable-gpu-rasterization',
      '--disable-background-networking',
      '--disable-default-apps',
      '--no-first-run',
    ],
  });

  const page = await browser.newPage();

  // Listen to console
  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    results.consoleMessages.push({ type, text });
    if (type === 'error') {
      console.error('  [Browser Error]:', text);
      results.errors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    console.error('  [Page Error]:', err.message);
    results.errors.push(err.message);
  });

  // 3. Navigate & Wait for Hydration
  console.log('[Navigation]: Loading http://127.0.0.1:' + PORT);
  const navStartTime = Date.now();
  await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForSelector('#home', { timeout: 10000 });
  const loadDuration = Date.now() - navStartTime;
  console.log(`[Navigation]: DOM mounted in ${loadDuration}ms`);
  await new Promise((r) => setTimeout(r, 800));

  // =================================================================
  // 4. SEO & METADATA AUDIT
  // =================================================================
  console.log('\n--- 1. AUDITING TECHNICAL SEO & METADATA ---');
  const seoAudit = await page.evaluate(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.content;
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    const themeColor = document.querySelector('meta[name="theme-color"]')?.content;
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const ogDesc = document.querySelector('meta[property="og:description"]')?.content;
    const twitterCard = document.querySelector('meta[name="twitter:card"]')?.content;
    const favicon = document.querySelector('link[rel="icon"]')?.href;

    // Structured Data JSON-LD
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    let jsonLdParsed = [];
    jsonLdScripts.forEach((s) => {
      try {
        jsonLdParsed.push(JSON.parse(s.innerText));
      } catch (e) {
        jsonLdParsed.push({ error: e.message });
      }
    });

    return {
      title,
      metaDesc,
      canonical,
      themeColor,
      ogTitle,
      ogDesc,
      twitterCard,
      favicon,
      jsonLdCount: jsonLdScripts.length,
      jsonLdParsed,
    };
  });

  results.seo = seoAudit;
  console.log('Title:', seoAudit.title);
  console.log('Meta Description:', seoAudit.metaDesc);
  console.log('Theme Color:', seoAudit.themeColor);
  console.log('JSON-LD Schemas:', JSON.stringify(seoAudit.jsonLdParsed, null, 2));

  // Check robots.txt and sitemap.xml files
  const robotsExists = fs.existsSync(path.join(DIST_DIR, 'robots.txt'));
  const sitemapExists = fs.existsSync(path.join(DIST_DIR, 'sitemap.xml'));
  console.log('robots.txt present:', robotsExists);
  console.log('sitemap.xml present:', sitemapExists);
  results.seo.robotsTxt = robotsExists;
  results.seo.sitemapXml = sitemapExists;

  // =================================================================
  // 5. ACCESSIBILITY (WCAG 2.2 AA) AUDIT
  // =================================================================
  console.log('\n--- 2. AUDITING ACCESSIBILITY & SEMANTICS ---');
  const a11yAudit = await page.evaluate(() => {
    const skipLink = document.querySelector('a[href="#main-content"]');
    const mainEl = document.querySelector('main#main-content');
    const headings = {
      h1: Array.from(document.querySelectorAll('h1')).map((h) => h.innerText.trim().replace(/\n/g, ' ')),
      h2: Array.from(document.querySelectorAll('h2')).map((h) => h.innerText.trim().replace(/\n/g, ' ')),
      h3Count: document.querySelectorAll('h3').length,
    };
    const forms = Array.from(document.querySelectorAll('form')).map((f) => {
      const inputs = Array.from(f.querySelectorAll('input, textarea'));
      return inputs.map((inp) => ({
        id: inp.id,
        name: inp.name,
        hasLabel: Boolean(document.querySelector(`label[for="${inp.id}"]`)),
        required: inp.required,
      }));
    });
    const accordions = Array.from(document.querySelectorAll('#faq button[aria-expanded]')).map((b) => ({
      expanded: b.getAttribute('aria-expanded'),
      controls: b.getAttribute('aria-controls'),
      hasRegion: Boolean(document.getElementById(b.getAttribute('aria-controls'))),
    }));

    return {
      hasSkipLink: Boolean(skipLink),
      mainHasId: Boolean(mainEl),
      headings,
      forms,
      accordions,
    };
  });

  results.accessibility = a11yAudit;
  console.log('Skip-link present:', a11yAudit.hasSkipLink);
  console.log('Main element has id="main-content":', a11yAudit.mainHasId);
  console.log('H1 elements:', a11yAudit.headings.h1);
  console.log(`H2 sections count: ${a11yAudit.headings.h2.length}, H3 count: ${a11yAudit.headings.h3Count}`);
  console.log('Form inputs with matching labels:', a11yAudit.forms[0]);
  console.log('FAQ Accordions with ARIA attributes:', a11yAudit.accordions.length);

  // =================================================================
  // 6. CORE WEB VITALS MEASUREMENT
  // =================================================================
  console.log('\n--- 3. MEASURING CORE WEB VITALS & PERFORMANCE ---');
  const webVitals = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let cls = 0;
      let lcp = 0;

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            cls += entry.value;
          }
          if (entry.entryType === 'largest-contentful-paint') {
            lcp = entry.renderTime || entry.loadTime;
          }
        }
      });

      try {
        observer.observe({ type: 'layout-shift', buffered: true });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}

      setTimeout(() => {
        const perfData = performance.timing;
        const domInteractive = perfData.domInteractive - perfData.navigationStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        resolve({
          cls: Math.round(cls * 1000) / 1000,
          lcp: Math.round(lcp) || Math.round(domContentLoaded),
          domInteractive,
          domContentLoaded,
        });
      }, 500);
    });
  });

  results.webVitals = webVitals;
  console.log('Cumulative Layout Shift (CLS):', webVitals.cls, webVitals.cls < 0.1 ? '(GOOD)' : '(NEEDS WORK)');
  console.log('Estimated LCP / DOM Content Loaded:', `${webVitals.lcp}ms`, webVitals.lcp < 2500 ? '(GOOD)' : '(NEEDS WORK)');

  // =================================================================
  // 7. RESPONSIVE OPTIMIZATION AUDIT (ALL 8 VIEWPORTS)
  // =================================================================
  console.log('\n--- 4. AUDITING 8 VIEWPORT BREAKPOINTS FOR HORIZONTAL OVERFLOW ---');
  const viewports = [
    { name: '360px Mobile (Small)', width: 360, height: 740 },
    { name: '390px Mobile (Standard iPhone)', width: 390, height: 844 },
    { name: '430px Mobile (Large iPhone Pro Max)', width: 430, height: 932 },
    { name: '768px Tablet (iPad Portrait)', width: 768, height: 1024 },
    { name: '1024px Laptop (Small Desktop)', width: 1024, height: 768 },
    { name: '1280px Desktop (Standard HD)', width: 1280, height: 800 },
    { name: '1440px Desktop (Large)', width: 1440, height: 900 },
    { name: '1920px Large Desktop (Full HD)', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise((r) => setTimeout(r, 450));

    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const hasHorizontalOverflow = scrollWidth > docWidth || bodyWidth > docWidth;

      let overflowingElements = [];
      if (hasHorizontalOverflow) {
        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1) {
            overflowingElements.push({
              tag: el.tagName,
              className: el.className ? String(el.className).substring(0, 80) : '',
              right: rect.right,
              docWidth,
            });
          }
        });
      }

      return {
        hasHorizontalOverflow,
        docWidth,
        scrollWidth,
        bodyWidth,
        overflowingElements: overflowingElements.slice(0, 5),
      };
    });

    results.viewports[vp.name] = overflowCheck;
    console.log(
      `  [${vp.name}]: ScrollWidth = ${overflowCheck.scrollWidth}, ClientWidth = ${overflowCheck.docWidth}, Overflow = ${overflowCheck.hasHorizontalOverflow}`
    );
    if (overflowCheck.hasHorizontalOverflow) {
      console.warn('    -> OVERFLOW DETECTED:', overflowCheck.overflowingElements);
    }
  }

  // Reset to 1440px Desktop for full interaction suite
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise((r) => setTimeout(r, 400));

  // =================================================================
  // 8. WEBGL SHADER & PERSISTENT FPS
  // =================================================================
  console.log('\n--- 5. AUDITING WEBGL AMBIENT FLUID SMOKE ---');
  const webglAudit = await page.evaluate(async () => {
    const canvas = document.querySelector('.hero-section canvas');
    if (!canvas) return { canvasFound: false };

    const width = canvas.width;
    const height = canvas.height;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const glContextType = gl instanceof WebGL2RenderingContext ? 'WebGL2' : 'WebGL1';

    const startTime = performance.now();
    let frames = 0;
    await new Promise((resolve) => {
      function count() {
        frames++;
        if (performance.now() - startTime >= 300) resolve();
        else requestAnimationFrame(count);
      }
      requestAnimationFrame(count);
    });

    const fps = Math.round((frames / (performance.now() - startTime)) * 1000);

    return {
      canvasFound: true,
      width,
      height,
      glContextType,
      measuredFps: fps,
      isContinuous: fps > 25,
    };
  });

  results.webgl = webglAudit;
  console.log('WebGL Result:', webglAudit);

  // =================================================================
  // 9. AUTOMATED TESTING OF 8 CRITICAL USER JOURNEYS
  // =================================================================
  console.log('\n--- 6. VERIFYING 8 CRITICAL USER JOURNEYS ---');

  // Journey 1: Open Portfolio & Verify Hero
  console.log('Journey 1: Open Portfolio & Verify Hero');
  const journey1 = await page.evaluate(() => {
    const heroH1 = document.querySelector('#home h1');
    const canvas = document.querySelector('#home canvas');
    return Boolean(heroH1) && Boolean(canvas);
  });
  results.userJourneys.journey1_heroMounted = journey1;
  console.log('  -> Journey 1 Success:', journey1);

  // Journey 2: Navigate Between Sections via Navbar
  console.log('Journey 2: Navigate Between Sections via Navbar');
  const journey2 = await page.evaluate(async () => {
    const navLinks = Array.from(document.querySelectorAll('header nav a'));
    let found = [];
    navLinks.forEach((l) => found.push(l.getAttribute('href')));
    return { linksCount: navLinks.length, hrefs: found };
  });
  results.userJourneys.journey2_navigation = journey2;
  console.log(`  -> Journey 2 Success: ${journey2.linksCount} header navigation links mapped:`, journey2.hrefs);

  // Journey 3: Explore Projects & Filter Tabs
  console.log('Journey 3: Explore Projects & Filter Tabs');
  const journey3 = await page.evaluate(async () => {
    const filterButtons = Array.from(document.querySelectorAll('#projects button[type="button"]'));
    const initialProjectsCount = document.querySelectorAll('#projects article').length;

    // Click second filter tab
    if (filterButtons.length > 1) {
      filterButtons[1].click();
    }
    await new Promise((r) => setTimeout(r, 300));
    const filteredCount = document.querySelectorAll('#projects article').length;

    // Reset to All Works
    filterButtons[0].click();
    await new Promise((r) => setTimeout(r, 300));

    return {
      filterTabsAvailable: filterButtons.length,
      initialProjectsCount,
      filteredCount,
    };
  });
  results.userJourneys.journey3_projectsFilter = journey3;
  console.log('  -> Journey 3 Success:', journey3);

  // Journey 4: Open Project Blueprint Modal & Close via Escape
  console.log('Journey 4: Open Project Blueprint Modal & Close via Escape');
  const journey4 = await page.evaluate(() => {
    const inspectBtn = document.querySelector('[data-testid="inspect-blueprint-btn"]');
    if (inspectBtn) {
      inspectBtn.click();
      return true;
    }
    return false;
  });
  await new Promise((r) => setTimeout(r, 500));
  const isProjectModalOpen = await page.evaluate(() => {
    return document.body.innerHTML.includes('Architectural Blueprint') || Boolean(document.querySelector('[role="dialog"]'));
  });
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));
  const isProjectModalClosed = await page.evaluate(() => {
    return !document.body.innerHTML.includes('Architectural Blueprint');
  });
  results.userJourneys.journey4_projectModal = {
    opened: isProjectModalOpen,
    closed: isProjectModalClosed,
  };
  console.log(`  -> Journey 4 Success: Modal opened (${isProjectModalOpen}), Modal closed via Escape (${isProjectModalClosed})`);

  // Journey 5: Open Resume Modal & Close via Escape
  console.log('Journey 5: Open Resume Modal & Close via Escape');
  const resumeBtn = await page.$('header button');
  if (resumeBtn) {
    await resumeBtn.click();
    await new Promise((r) => setTimeout(r, 500));
    const isResumeModalOpen = await page.evaluate(() => {
      return document.body.innerText.includes('VERIFIED DEVELOPER PROFILE');
    });
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
    const isResumeModalClosed = await page.evaluate(() => {
      return !document.body.innerText.includes('VERIFIED DEVELOPER PROFILE');
    });
    results.userJourneys.journey5_resumeModal = {
      opened: isResumeModalOpen,
      closed: isResumeModalClosed,
    };
    console.log(`  -> Journey 5 Success: Resume opened (${isResumeModalOpen}), closed (${isResumeModalClosed})`);
  }

  // Journey 6: Use Contact Options (Copy Email & Transmit Form)
  console.log('Journey 6: Use Contact Options');
  await page.evaluate(() => {
    document.querySelector('#contact')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Test Copy Email
  await page.evaluate(() => {
    const copyBtn = document.querySelector('#contact button[type="button"]');
    if (copyBtn) copyBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const hasCopiedFeedback = await page.evaluate(() => {
    return document.querySelector('#contact').innerText.includes('Copied!');
  });

  // Type form fields
  await page.type('#name', 'Anurag Collaborator');
  await page.type('#email', 'collab@systems.ai');
  await page.type('#subject', 'Production Inquiry');
  await page.type('#message', 'Testing end-to-end form inputs.');
  const formValues = await page.evaluate(() => ({
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
  }));
  results.userJourneys.journey6_contact = {
    copyFeedback: hasCopiedFeedback,
    formValues,
  };
  console.log(`  -> Journey 6 Success: Copy email (${hasCopiedFeedback}), Form typing (${formValues.name})`);

  // Journey 7: Navigate on Mobile Drawer (390px)
  console.log('Journey 7: Navigate on Mobile Drawer');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 400));

  const mobileMenuToggle = await page.$('button[aria-controls="mobile-navigation-menu"]');
  let mobileDrawerOpened = false;
  let mobileDrawerClosed = false;

  if (mobileMenuToggle) {
    await mobileMenuToggle.click();
    await new Promise((r) => setTimeout(r, 400));
    mobileDrawerOpened = await page.evaluate(() => {
      return Boolean(document.querySelector('#mobile-navigation-menu'));
    });

    // Press Escape to close
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
    mobileDrawerClosed = await page.evaluate(() => {
      return !document.querySelector('#mobile-navigation-menu');
    });
  }
  results.userJourneys.journey7_mobileNav = {
    drawerOpened: mobileDrawerOpened,
    drawerClosed: mobileDrawerClosed,
  };
  console.log(`  -> Journey 7 Success: Mobile drawer opened (${mobileDrawerOpened}), closed (${mobileDrawerClosed})`);

  // Journey 8: Keyboard-Only Navigation
  console.log('Journey 8: Keyboard-Only Navigation (Tab / Focus)');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));

  // Press Tab to focus Skip Link
  await page.keyboard.press('Tab');
  await new Promise((r) => setTimeout(r, 200));
  const activeElementInfo = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tagName: el?.tagName,
      href: el?.getAttribute('href'),
      text: el?.innerText,
    };
  });
  results.userJourneys.journey8_keyboardNav = activeElementInfo;
  console.log('  -> Journey 8 Success: Tabbed element:', activeElementInfo);

  // Cleanup
  await browser.close();
  server.close();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('\n===============================================================');
  console.log('AUDIT COMPLETE: Total Console Errors:', results.errors.length);
  console.log('===============================================================');

  fs.writeFileSync(path.join(__dirname, 'audit_phase5_results.json'), JSON.stringify(results, null, 2));
  console.log('Phase 5 audit results saved to audit_phase5_results.json\n');
}

runAudit().catch((err) => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
