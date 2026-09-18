(function () {
  'use strict';

  const config = window.siteAdConfig || {
    publisherId: 'ca-pub-4060889454607043',
    adSlots: {
      top: '',
      middle: '',
      bottom: ''
    },
    showDevelopmentPreview: true
  };

  const isDevelopment = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) || window.location.protocol === 'file:';
  const placements = ['top', 'middle', 'bottom'];

  function createPlacement(name) {
    const container = document.createElement('section');
    container.className = `site-ad site-ad-${name}`;
    container.dataset.adPlacement = name;
    container.setAttribute('aria-label', 'Advertisement');

    const slot = config.adSlots && config.adSlots[name];
    if (slot) {
      container.innerHTML = `
        <ins class="adsbygoogle"
          style="display:block;min-height:90px"
          data-ad-client="${config.publisherId}"
          data-ad-slot="${slot}"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>`;
      return container;
    }

    if (isDevelopment && config.showDevelopmentPreview) {
      container.innerHTML = '<div class="site-ad-preview">AdSense preview: add this placement\'s ad-slot ID in assets/adsense.js</div>';
      return container;
    }

    container.hidden = true;
    return container;
  }

  function insertPlacements() {
    const main = document.querySelector('main') || document.body;
    const existing = main.querySelectorAll('[data-ad-placement]');
    if (existing.length) return;

    const top = createPlacement('top');
    const middle = createPlacement('middle');
    const bottom = createPlacement('bottom');
    main.insertBefore(top, main.firstChild);
    main.appendChild(middle);
    main.appendChild(bottom);

    if (config.adSlots && Object.values(config.adSlots).some(Boolean)) {
      document.querySelectorAll('.adsbygoogle').forEach((ad) => {
        observeAdStatus(ad);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    }
  }

  function observeAdStatus(ad) {
    const hideIfUnfilled = () => {
      if (ad.dataset.adStatus === 'unfilled' && !isDevelopment) {
        ad.closest('.site-ad').hidden = true;
      }
    };
    hideIfUnfilled();
    new MutationObserver(hideIfUnfilled).observe(ad, { attributes: true, attributeFilter: ['data-ad-status'] });
  }

  function loadAdSense() {
    if (!config.publisherId || document.querySelector('script[data-adsense-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.adsenseLoader = 'true';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.publisherId)}`;
    script.onerror = () => {
      if (!isDevelopment) {
        document.querySelectorAll('.site-ad').forEach(container => { container.hidden = true; });
      }
    };
    document.head.appendChild(script);
  }

  function addStyles() {
    if (document.getElementById('site-ad-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-ad-styles';
    style.textContent = `
      .site-ad { width: 100%; min-height: 90px; margin: 16px 0; text-align: center; }
      .site-ad-preview { min-height: 90px; display: grid; place-items: center; padding: 12px; border: 1px dashed #f6a700; border-radius: 10px; background: #fffdf2; color: #071b3d; font: 700 13px/1.5 sans-serif; }
      .site-ad[hidden] { display: none !important; }
      .site-ad .adsbygoogle { display: block; min-height: 90px; }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    insertPlacements();
    loadAdSense();
  });
}());
