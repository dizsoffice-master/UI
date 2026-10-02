(function () {
  'use strict';

  const settings = window.siteAdSettings || {};
  const providers = settings.providers || {};
  let adsterraQueue = Promise.resolve();
  let monetagLoaded = false;

  function hideSlot(container) {
    container.hidden = true;
  }

  function observeAdStatus(ad, container) {
    let settled = false;
    const observer = new MutationObserver(() => {
      const status = ad.getAttribute('data-ad-status');
      if (status === 'filled') {
        settled = true;
        observer.disconnect();
      } else if (status === 'unfilled') {
        settled = true;
        observer.disconnect();
        hideSlot(container);
      }
    });
    observer.observe(ad, { attributes: true, attributeFilter: ['data-ad-status'] });
    window.setTimeout(() => {
      observer.disconnect();
      if (!settled && ad.getAttribute('data-ad-status') !== 'filled') hideSlot(container);
    }, 8000);
  }

  function loadAdSense(provider) {
    if (!provider.publisherId || !provider.scriptUrl || document.querySelector('script[data-adsense-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.adsenseLoader = 'true';
    script.src = `${provider.scriptUrl}?client=${encodeURIComponent(provider.publisherId)}`;
    script.onerror = () => {
      document.querySelectorAll('.ad-slot[data-provider="adsense"]').forEach(hideSlot);
    };
    document.head.appendChild(script);
  }

  function initializeThirdPartySlot(container, providerName, provider, placement) {
    const zoneName = placement.zone || container.dataset.adPlacement;
    const zone = provider.zones && provider.zones[zoneName];
    if (!provider.enabled) return false;

    if (providerName === 'monetag') {
      if (monetagLoaded) return true;
      if (!provider.scriptUrl || !provider.zoneId) return false;
      const script = document.createElement('script');
      script.async = true;
      script.src = provider.scriptUrl;
      script.dataset.zone = provider.zoneId;
      Object.entries(provider.scriptAttributes || {}).forEach(([name, value]) => script.setAttribute(name, value));
      script.onerror = () => {
        document.querySelectorAll('.ad-slot[data-provider="monetag"]').forEach(hideSlot);
      };
      const target = provider.insertionTarget === 'head' ? document.head : document.body;
      target.appendChild(script);
      monetagLoaded = true;
      return true;
    }

    if (!zone) return false;

    if (providerName === 'adsterra') {
      if (zone.type === 'container-script') {
        if (!zone.containerId || !zone.scriptUrl) return false;
        const target = document.createElement('div');
        target.id = zone.containerId;
        const script = document.createElement('script');
        script.async = true;
        script.src = zone.scriptUrl;
        script.dataset.adProvider = providerName;
        script.onerror = () => hideSlot(container);
        Object.entries(zone.scriptAttributes || {}).forEach(([name, value]) => script.setAttribute(name, value));
        container.replaceChildren(script, target);
        document.head.appendChild(script);
        window.setTimeout(() => {
          if (!target.hasChildNodes()) hideSlot(container);
        }, 8000);
        return true;
      }

      if (!zone.key || !provider.scriptUrl) return false;
      adsterraQueue = adsterraQueue.then(() => new Promise((resolve) => {
        const script = document.createElement('script');
        script.async = false;
        script.dataset.adProvider = providerName;
        script.dataset.zoneId = zone.key;
        script.src = `${provider.scriptUrl}/${zone.key}/invoke.js`;
        script.onerror = () => { hideSlot(container); resolve(); };
        script.onload = resolve;
        window.atOptions = {
          key: zone.key,
          format: zone.format,
          height: zone.height,
          width: zone.width,
          params: zone.params || {}
        };
        container.replaceChildren(script);
        window.setTimeout(() => {
          if (!container.querySelector('iframe, ins, img')) hideSlot(container);
        }, 8000);
        container.appendChild(script);
      }));
      return true;
    }

    const scriptUrl = typeof zone === 'object' ? zone.scriptUrl || provider.scriptUrl : provider.scriptUrl;
    if (!scriptUrl) return false;

    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.dataset.adProvider = providerName;
    script.onerror = () => hideSlot(container);
    const zoneId = typeof zone === 'object' ? zone.zoneId || zone.key : zone;
    if (zoneId) script.setAttribute(provider.zoneAttribute || 'data-zone-id', zoneId);
    Object.entries(provider.scriptAttributes || {}).forEach(([name, value]) => script.setAttribute(name, value));
    if (provider.siteId) script.dataset.siteId = provider.siteId;
    container.replaceChildren(script);
    window.setTimeout(() => {
      if (!container.querySelector('iframe, ins, img')) hideSlot(container);
    }, 8000);
    return true;
  }

  function initializeSlots() {
    let activeAdSenseSlots = 0;
    document.querySelectorAll('.ad-slot[data-ad-placement]').forEach((container) => {
      if (container.dataset.adInitialized === 'true') return;
      const placementName = container.dataset.adPlacement;
      const placement = settings.placements && settings.placements[placementName];
      if (!placement) {
        hideSlot(container);
        return;
      }

      const providerName = placement.provider;
      const provider = providers[providerName];
      container.dataset.provider = providerName;
      if (placement.shape) container.dataset.adShape = placement.shape;
      container.classList.remove('adsense-ad', 'adsterra-ad', 'monetag-ad');
      container.classList.add(`${providerName}-ad`);

      if (providerName === 'adsense') {
        const slot = provider && provider.slots && provider.slots[placement.zone];
        if (!provider || !provider.enabled || !provider.publisherId || !slot) {
          hideSlot(container);
          return;
        }
        const ad = document.createElement('ins');
        ad.className = 'adsbygoogle';
        ad.dataset.adClient = provider.publisherId;
        ad.dataset.adSlot = slot;
        ad.dataset.adFormat = 'auto';
        ad.dataset.fullWidthResponsive = 'true';
        container.replaceChildren(ad);
        container.dataset.adInitialized = 'true';
        observeAdStatus(ad, container);
        activeAdSenseSlots += 1;
        return;
      }

      if (!provider || !initializeThirdPartySlot(container, providerName, provider, placement)) {
        hideSlot(container);
      } else {
        container.dataset.adInitialized = 'true';
        if (providerName === 'monetag') hideSlot(container);
      }
    });

    if (!activeAdSenseSlots) return;
    const adsense = providers.adsense;
    loadAdSense(adsense);
    document.querySelectorAll('.ad-slot[data-provider="adsense"] ins.adsbygoogle').forEach((ad) => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  window.initializeSiteAdSlots = initializeSlots;
  document.addEventListener('DOMContentLoaded', initializeSlots, { once: true });
}());
