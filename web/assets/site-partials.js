const pageFolder = window.location.pathname.includes('/pages/') ? true : false;
const rootPath = pageFolder ? '../' : '';

const currentPageFile = window.location.pathname.split('/').pop();
const pageSettings = window.toolPageSettings || [];
const currentPage = pageSettings.find((item) => item.file === currentPageFile) || {
  previous: '',
  next: ''
};

const previousPage = currentPage.previous ? rootPath + 'pages/' + currentPage.previous : '';
const nextPage = currentPage.next ? rootPath + 'pages/' + currentPage.next : '';

function headerMarkupIndex() {
  return `<header class="site-header">
    <div class="site-logo">
      <div class="site-logo-mark">SM</div>
      <div class="site-logo-copy">
        <strong>DIZS Software Services Pvt. Ltd.</strong>
      </div>
    </div>
    <nav class="site-nav">
      <a class="home-button" href="${rootPath}index.html">Login</a>
      <a class="home-button" href="${rootPath}index.html">Sign Up</a>
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
        <strong>DIZS Software Services Pvt. Ltd.</strong>
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
      <a class="service-layer-card" href="${rootPath}pages/sql-insert-query-builder-from-json-excel-csv.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/sql-builder.svg" alt="">
        <span class="service-card-text">SQL INSERT Builder</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-viewer-formatter.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/json-viewer.svg" alt="">
        <span class="service-card-text">JSON Viewer Formatter</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-difference-checker.html">
        <img class="service-card-icon" src="${rootPath}assets/icons/json-difference.svg" alt="">
        <span class="service-card-text">JSON Difference Checker</span>
      </a>
      <a class="service-layer-card" href="${rootPath}pages/json-editor.html">
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
          <li>Phone: +91 90000 00000</li>
          <li>Email: info@dizsservices.com</li>
          <li>Address: India</li>
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
  const topGoogleAdHost = document.getElementById('topGoogleAd');
  const footerServicesHost = document.getElementById('footerServicesLayer');
  const bottomGoogleAdHost = document.getElementById('bottomGoogleAd');
  const footerHost = document.getElementById('siteFooter');

  if (headerHost) {
    headerHost.innerHTML = headerMarkup();
  }
  if (headerHostIndex) {
    headerHostIndex.innerHTML = headerMarkupIndex();
  }

  if (headerServicesHost && currentPageFile !== 'private-dashboard-sample.html') {
    headerServicesHost.innerHTML = headerServicesLayerMarkup();
  }

  if (topGoogleAdHost && currentPageFile !== 'private-dashboard-sample.html') {
    topGoogleAdHost.innerHTML = googleAdMarkup();
  }

  if (bottomGoogleAdHost && currentPageFile !== 'private-dashboard-sample.html') {
    bottomGoogleAdHost.innerHTML = googleAdMarkup();
  }

  if (footerServicesHost && currentPageFile !== 'private-dashboard-sample.html') {
    footerServicesHost.innerHTML = footerServicesLayerMarkup();
  }

  if (footerHost) {
    footerHost.innerHTML = footerMarkup();
  }
});
