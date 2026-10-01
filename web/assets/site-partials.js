const pageFolder = window.location.pathname.includes('/pages/') ? true : false;
const rootPath = pageFolder ? '../' : '';

const currentPageFile = window.location.pathname.split('/').pop();
const pageSettings = window.toolPageSettings || [];
const currentPage = pageSettings.find((item) => item.file === currentPageFile) || null;

const previousPage = currentPage && currentPage.previous ? rootPath + 'pages/' + currentPage.previous : '';
const nextPage = currentPage && currentPage.next ? rootPath + 'pages/' + currentPage.next : '';

const serviceGroups = [
  { title: 'SQL Tools', items: [
    ['SQL Formatter', 'sql-syntax-formatter-online-free-tool.html'],
    ['SQL Structure Designer', 'sql-syntax-formatter-online-free-tool.html'],
    ['SQL Query Builder', 'postgres-and-sql-all-query-builder-online-free-tool-for-fresher-developer.html'],
    ['SQL Difference Checker', 'sql-difference-checker-online-free-service-tool.html'],
    ['SQL Blank Line Remover', 'sql-blank-line-remover-online-free-service-tool.html'],
    ['SQL Indent & Alignment Tool', 'sql-syntax-formatter-online-free-tool.html'],
    ['SQL INSERT Query Generator', 'sql-insert-query-builder-from-json-excel-csv-free-online-tool.html']
  ] },
  { title: 'JSON Tools', items: [
    ['JSON Formatter', 'json-viewer-formatter-online-free-tool.html'],
    ['JSON Difference Checker', 'json-difference-checker-sql-postgres-correction-database-free-online.html'],
    ['JSON Editor', 'json-editor-free-online-add-remove-replace-key-value-pair.html'],
    ['JSON Sorter', 'json-sorter-online-free-service-tool.html'],
    ['JSON Validator', 'json-validator-online-free-service-tool.html'],
    ['JSON to CSV', 'json-to-csv-converter-online-free-service-tool.html'],
    ['CSV to JSON', 'csv-to-json-converter-online-free-service-tool.html']
  ] },
  { title: 'CSV / Excel Tools', items: [
    ['CSV Difference Checker', 'excel-csv-difference-checker-sql-query-builder-free-online-tool.html'],
    ['CSV Duplicate Finder', 'duplicate-finder-duplicate-remover-duplicate-value-delete-duplicate-value-count-reparter-list-highest-repeat-value-finder.html'],
    ['Excel Difference Checker', 'excel-csv-difference-checker-sql-query-builder-free-online-tool.html'],
    ['Excel to CSV', 'excel-to-csv-converter-online-free-service-tool.html'],
    ['CSV to Excel', 'csv-to-excel-converter-online-free-service-tool.html'],
    ['CSV Data Cleaner', 'csv-data-cleaner-online-free-service-tool.html']
  ] },
  { title: 'Image Tools', items: [
    ['JPEG to PNG', 'jpeg-to-png-converter-online-free-service-tool.html'],
    ['PNG to JPEG', 'png-to-jpeg-converter-online-free-service-tool.html'],
    ['Image Compressor', 'image-compressor-online-free-service-tool.html'],
    ['Image Resizer', 'image-resizer-online-free-service-tool.html'],
    ['Image Converter', 'image-converter-online-free-service-tool.html'],
    ['Image Cropper', 'image-cropper-online-free-service-tool.html'],
    ['Passport Photo Maker', 'passport-photo-maker-online-free-service-tool.html']
  ] },
  { title: 'Developer Tools', items: [
    ['Base64 Encoder / Decoder', 'base64-encoder-decoder-online-free-service-tool.html'],
    ['URL Encoder / Decoder', 'url-encoder-decoder-online-free-service-tool.html'],
    ['HTML Formatter', 'html-formatter-online-free-service-tool.html'],
    ['CSS Formatter', 'css-formatter-online-free-service-tool.html'],
    ['JavaScript Formatter', 'javascript-formatter-online-free-service-tool.html'],
    ['XML Formatter', 'xml-formatter-online-free-service-tool.html'],
    ['Timestamp Converter', 'timestamp-converter-online-free-service-tool.html']
  ] },
  { title: 'Other Tools', items: [
    ['Text Difference Checker', 'text-difference-checker-online-free-service-tool.html'],
    ['Duplicate Finder', 'duplicate-finder-duplicate-remover-duplicate-value-delete-duplicate-value-count-reparter-list-highest-repeat-value-finder.html'],
    ['Word Counter', 'word-counter-online-free-service-tool.html'],
    ['Character Counter', 'character-counter-online-free-service-tool.html'],
    ['QR Code Generator', 'qr-code-generator-online-free-service-tool.html'],
    ['Password Generator', 'password-generator-online-free-service-tool.html']
  ] }
];

function serviceNavigationMarkup() {
  return serviceGroups.map((group) => `<section class="service-group">
    <h2>${group.title}</h2>
    <ul>${group.items.map(([label, file]) => {
      if (!file) return `<li><span class="service-link is-unavailable" aria-disabled="true">${label}</span></li>`;
      const active = file === currentPageFile;
      return `<li><a class="service-link${active ? ' is-active' : ''}" href="${rootPath}pages/${file}"${active ? ' aria-current="page"' : ''}><span>${label}</span><span aria-hidden="true">${active ? '✓' : '→'}</span></a></li>`;
    }).join('')}</ul>
  </section>`).join('');
}

function homeToolDirectoryMarkup() {
  return serviceGroups.map((group) => `<section class="home-tool-group">
    <h3>${group.title}</h3>
    <ul>${group.items.map(([label, file]) => file
      ? `<li><a class="home-tool-link" href="${rootPath}pages/${file}"><span>${label}</span><span aria-hidden="true">→</span></a></li>`
      : `<li><span class="home-tool-link is-unavailable" aria-disabled="true"><span>${label}</span></span></li>`
    ).join('')}</ul>
  </section>`).join('');
}

function sharedHeaderMarkup() {
  return `<header class="site-header">
    <a class="site-logo" href="${rootPath}index.html" aria-label="OnlineDataTool.com home">
      <span class="site-logo-mark" aria-hidden="true">OD</span>
      <span class="site-logo-copy"><strong>OnlineDataTool.com</strong><span>Useful tools, right in your browser</span></span>
    </a>
    <nav class="site-nav" aria-label="Main navigation">
      <div class="site-nav-links">
        <a href="${rootPath}index.html">Home</a>
        <a href="${rootPath}index.html#about">About</a>
        <a href="${rootPath}index.html#contact">Contact</a>
        <a href="${rootPath}index.html#privacy">Privacy</a>
        <a href="${rootPath}index.html#terms">Terms</a>
      </div>
      <label class="site-search"><span class="visually-hidden">Search tools</span><input type="search" placeholder="Search tools" autocomplete="off"></label>
      <button class="site-tools-toggle" type="button" aria-controls="siteServices" aria-expanded="false"><span aria-hidden="true">☰</span> All Tools</button>
    </nav>
  </header>`;
}

function adSlotMarkup(placement) {
  const provider = window.siteAdSettings?.placements?.[placement]?.provider || 'adsense';
  const providerLabels = { adsense: 'AdSense', adsterra: 'Adsterra', monetag: 'Monetag' };
  return `<section class="ad-slot ${provider}-ad" data-provider="${provider}" data-ad-placement="${placement}" aria-label="Advertisement">
    <span class="ad-slot-title">Advertisement</span><span class="ad-slot-provider">${providerLabels[provider] || 'Ad'} placement</span>
  </section>`;
}

function mountToolLayout(content) {
  if (!content || !currentPage) return;
  const mount = content.closest('.tool-layout') || content;
  const shell = document.createElement('div');
  shell.className = 'site-page-layout';
  shell.innerHTML = `<aside class="site-sidebar" id="siteServices" aria-label="All tools">
      <div class="sidebar-heading"><strong>All Tools</strong><button class="site-sidebar-close" type="button" aria-label="Close tools menu">×</button></div>
      <nav class="service-navigation" aria-label="Tool categories">${serviceNavigationMarkup()}</nav>
    </aside>
    <button class="site-drawer-backdrop" type="button" aria-label="Close tools menu" hidden></button>
    <div class="site-center-column" id="mainContent">
      <div class="top-ad-container">${adSlotMarkup('top-primary')}${adSlotMarkup('top-secondary')}</div>
      <div class="site-tool-host"></div>
      <div class="site-after-tool-ads">${adSlotMarkup('after-tool')}${adSlotMarkup('after-info')}${adSlotMarkup('before-footer')}</div>
    </div>
    <aside class="site-right-ads" aria-label="Advertisement sidebar"><div class="ad-stack">
      ${adSlotMarkup('rail-top')}${adSlotMarkup('rail-middle')}${adSlotMarkup('rail-bottom')}
    </div></aside>`;
  mount.parentElement.insertBefore(shell, mount);
  shell.querySelector('.site-tool-host').append(content);
  if (mount !== content) mount.remove();
}

function setToolMetadata(content) {
  if (!currentPage || !content) return;
  const heading = content.querySelector('h1');
  const description = content.querySelector('[data-tool-description], .page-subtitle, .duplicate-subtitle, #json-diff-header p') || content.querySelector('p');
  const title = heading ? heading.textContent.trim() : currentPage.label;
  const summary = description ? description.textContent.trim().replace(/\s+/g, ' ').slice(0, 155) : `${currentPage.label} online. Use this free browser-based tool on OnlineDataTool.com.`;
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.name = 'description';
    document.head.append(descriptionMeta);
  }
  descriptionMeta.content = summary;
  [['og:title', title], ['og:description', summary], ['og:type', 'website'], ['og:url', window.location.href]].forEach(([property, contentValue]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.append(meta);
    }
    meta.content = contentValue;
  });
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description: summary, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', url: window.location.href });
  document.head.append(schema);
}

function wireToolNavigation() {
  const shell = document.querySelector('.site-page-layout');
  const toggle = document.querySelector('.site-tools-toggle');
  const sidebar = document.querySelector('.site-sidebar');
  const backdrop = document.querySelector('.site-drawer-backdrop');
  const closeButton = document.querySelector('.site-sidebar-close');
  if (!shell || !toggle || !sidebar || !backdrop) return;
  const closeMenu = () => {
    shell.classList.remove('is-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  };
  toggle.addEventListener('click', () => {
    const open = !shell.classList.contains('is-menu-open');
    shell.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    backdrop.hidden = !open;
    if (open) sidebar.querySelector('.service-link:not(.is-unavailable)')?.focus();
  });
  backdrop.addEventListener('click', closeMenu);
  closeButton.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  sidebar.querySelectorAll('.service-link[href]').forEach((link) => link.addEventListener('click', closeMenu));
  document.querySelector('.site-search input')?.addEventListener('input', (event) => {
    const query = event.currentTarget.value.trim().toLocaleLowerCase();
    sidebar.querySelectorAll('.service-group').forEach((group) => {
      let visible = 0;
      group.querySelectorAll('li').forEach((item) => {
        const match = !query || item.textContent.toLocaleLowerCase().includes(query);
        item.hidden = !match;
        if (match) visible += 1;
      });
      group.hidden = visible === 0;
    });
  });
}

function sharedFooterMarkup() {
  return `<footer class="site-footer">
    <div class="site-footer-grid">
      <div class="footer-col"><h4>Tools</h4><ul>
        <li><a href="${rootPath}pages/sql-syntax-formatter-online-free-tool.html">SQL Tools</a></li>
        <li><a href="${rootPath}pages/json-viewer-formatter-online-free-tool.html">JSON Tools</a></li>
        <li><a href="${rootPath}pages/excel-csv-difference-checker-sql-query-builder-free-online-tool.html">CSV Tools</a></li>
        <li><a href="${rootPath}pages/excel-csv-difference-checker-sql-query-builder-free-online-tool.html">Excel Tools</a></li>
        <li><a href="#siteFooter">Image Tools</a></li><li><a href="#siteFooter">Developer Tools</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul><li><a href="${rootPath}index.html#about">About Us</a></li><li><a href="${rootPath}index.html#contact">Contact Us</a></li><li><a href="${rootPath}index.html#privacy">Privacy Policy</a></li><li><a href="${rootPath}index.html#terms">Terms &amp; Conditions</a></li><li><a href="${rootPath}index.html#disclaimer">Disclaimer</a></li></ul></div>
      <div class="footer-col"><h4>Useful Links</h4><ul><li><a href="${rootPath}index.html">All Tools</a></li><li><a href="${rootPath}index.html">Latest Tools</a></li><li><a href="${rootPath}index.html">Popular Tools</a></li><li><a href="${rootPath}sitemap.xml">Sitemap</a></li></ul></div>
      <div class="footer-col"><h4>OnlineDataTool.com</h4><p>Free online tools for data, documents, and everyday development tasks.</p></div>
    </div>
    <div class="footer-bottom">© 2026 OnlineDataTool.com. All Rights Reserved.</div>
  </footer>`;
}

function headerMarkupIndex() {
  return `<header class="site-header">
    <div class="site-logo">
      <div class="site-logo-mark">D</div>
      <div class="site-logo-copy">
        <strong>DIZS</strong>
      </div>
    </div>
    <nav class="site-nav">
   <!--   <a class="home-button" href="${rootPath}index.html">Login</a>
      <a class="home-button" href="${rootPath}index.html">Sign Up</a> 
-->
    </nav>
  </header>`;
}

function headerMarkup() {
  const prevLink = previousPage ? `<a class="page-ctrl" href="${previousPage}">Previous</a>` : '';
  const nextLink = nextPage ? `<a class="page-ctrl" href="${nextPage}">Next</a>` : '';

  return `<header class="site-header">
    <div class="site-logo">
      <div class="site-logo-mark">SM</div>
      <div class="site-logo-copy">
        <strong>DIZS</strong>
      </div>
    </div>
    <nav class="site-nav">
      <a class="home-button" href="${rootPath}index.html">Home</a>
      ${prevLink}
      ${nextLink}
    </nav>
  </header>`;
}

function headerServicesLayerMarkup() {
  return `<section class="site-service-layer site-service-layer-header">
    <div class="service-layer-title">Featured Tools</div>
    <div class="service-layer-grid">
      <a class="service-layer-card" href="${rootPath}pages/sql-syntax-formatter-online-free-tool.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/sql-formatter.svg" alt="">
        <span class="service-card-text">SQL Formatter</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/sql-insert-query-builder-from-json-excel-csv-free-online-tool.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/sql-builder.svg" alt="">
        <span class="service-card-text">SQL INSERT Builder</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/postgres-and-sql-all-query-builder-online-free-tool-for-fresher-developer.html">
        <span class="service-card-icon">SQL</span>
        <span class="service-card-text">SQL Query Builder</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-viewer-formatter-online-free-tool.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/json-viewer.svg" alt="">
        <span class="service-card-text">JSON Viewer Formatter</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-difference-checker-sql-postgres-correction-database-free-online.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/json-difference.svg" alt="">
        <span class="service-card-text">JSON Difference Checker</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/excel-csv-difference-checker-sql-query-builder-free-online-tool.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/excel-difference.svg" alt="">
        <span class="service-card-text">Excel CSV Difference Checker</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/duplicate-finder-duplicate-remover-duplicate-value-delete-duplicate-value-count-reparter-list-highest-repeat-value-finder.html">
        <span class="service-card-icon">DUP</span>
        <span class="service-card-text">Duplicate Finder</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-editor-free-online-add-remove-replace-key-value-pair.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/json-editor.svg" alt="">
        <span class="service-card-text">JSON Editor</span>
      </a>

      <!--
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">API</span>
        <span class="service-card-text">API Tools</span>
      </a> 
      -->
    </div>
  </section>`;
}

function googleAdMarkup() {
  return `<section class="google-ad-strip">
    <span class="google-ad-label">Google Ads</span>
    <span class="google-ad-size">728 × 90</span>
  </section>`;
}

function footerServicesLayerMarkup() {
  return `<section class="site-service-layer site-service-layer-footer">
    <div class="service-layer-title">Website Services</div>
    <div class="service-layer-grid">
      <a class="service-layer-card" href="${rootPath}index.html">
        <span class="service-card-icon">H</span>
        <span class="service-card-text">Home</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">TXT</span>
        <span class="service-card-text">Text Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">JSON</span>
        <span class="service-card-text">JSON Tools</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/sql-syntax-formatter-online-free-tool.html">
        <span class="service-card-icon">SQL</span>
        <span class="service-card-text">SQL Tools</span>
      </a>
      <a class="service-layer-card" href="#">
        <span class="service-card-icon">GUIDE</span>
        <span class="service-card-text">Developer Guides</span>
      </a>
    </div>
  </section>`;
}

function footerMarkup() {
  return `<footer class="site-footer">
    <div class="site-footer-grid">
      <div class="footer-col">
        <h4>DIZS Software Services Pvt. Ltd.</h4>
        <p>Software, website, app, and school management services.</p>
      </div>
      <div class="footer-col">
        <h4>Useful Links</h4>
        <ul>
          <li><a href="${rootPath}index.html">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Tools</a></li>
          <li><a href="${rootPath}${currentPageFile}">Page</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li>Phone: +91 9045029002</li>
          <li>Email: dizs.office@gmail.com</li>
          <li>Address: Haridwar, UK India</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Social</h4>
        <div class="footer-socials">
          <a href="#">f</a>
          <a href="#">x</a>
          <a href="#">in</a>
          <a href="#">▶</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © 2026 DIZS Software Services Pvt. Ltd. All rights reserved.
    </div>
  </footer>`;
}

window.addEventListener('DOMContentLoaded', () => {
  const headerHost = document.getElementById('siteHeader');
  const headerHostIndex = document.getElementById('siteHeaderIndex');
  const headerServicesHost = document.getElementById('headerServicesLayer');
  const homeToolsHost = document.getElementById('homeToolGroups');
  const homeAdHost = document.getElementById('homepageAdPlacement');
  const topGoogleAdHost = document.getElementById('topGoogleAd');
  const footerServicesHost = document.getElementById('footerServicesLayer');
  const bottomGoogleAdHost = document.getElementById('bottomGoogleAd');
  const footerHost = document.getElementById('siteFooter');

  if (headerHost) headerHost.innerHTML = sharedHeaderMarkup();
  if (headerHostIndex) headerHostIndex.innerHTML = sharedHeaderMarkup();
  if (headerServicesHost && currentPage) headerServicesHost.remove();
  if (homeToolsHost) homeToolsHost.innerHTML = homeToolDirectoryMarkup();
  if (homeAdHost) homeAdHost.outerHTML = adSlotMarkup('homepage');

  if (topGoogleAdHost && currentPageFile !== 'private-dashboard-sample.html') {
    topGoogleAdHost.innerHTML = googleAdMarkup();
  }

  if (bottomGoogleAdHost && currentPageFile !== 'private-dashboard-sample.html') {
    bottomGoogleAdHost.innerHTML = googleAdMarkup();
  }

  if (footerServicesHost && currentPage) footerServicesHost.remove();
  if (footerHost) footerHost.innerHTML = sharedFooterMarkup();

  const content = document.querySelector('main.tool-content, main.duplicate-content, #json-diff-wrapper') || (currentPage ? document.querySelector('main') : null);
  if (content && currentPage) {
    mountToolLayout(content);
    setToolMetadata(content);
    wireToolNavigation();
  }

  const homeSearch = document.querySelector('.site-search input');
  if (homeSearch && homeToolsHost) {
    homeSearch.addEventListener('input', () => {
      const query = homeSearch.value.trim().toLocaleLowerCase();
      homeToolsHost.querySelectorAll('.home-tool-group').forEach((group) => {
        let visibleItems = 0;
        group.querySelectorAll('li').forEach((item) => {
          item.hidden = Boolean(query) && !item.textContent.toLocaleLowerCase().includes(query);
          if (!item.hidden) visibleItems += 1;
        });
        group.hidden = visibleItems === 0;
      });
    });
  }
});
