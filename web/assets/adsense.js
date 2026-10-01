(function () {
  'use strict';

  const settings = window.siteAdSettings || {};
  const providers = settings.providers || {};
  const isDevelopment = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) || window.location.protocol === 'file:';

  function loadAdSense(provider) {
    if (!provider.publisherId || !provider.scriptUrl || document.querySelector('script[data-adsense-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.adsenseLoader = 'true';
    script.src = `${provider.scriptUrl}?client=${encodeURIComponent(provider.publisherId)}`;
    document.head.appendChild(script);
  }

  function initializeThirdPartySlot(container, providerName, provider, placement) {
    const zoneName = placement.zone || container.dataset.adPlacement;
    const zone = provider.zones && provider.zones[zoneName];
    const scriptUrl = zone && typeof zone === 'object' ? zone.scriptUrl || provider.scriptUrl : provider.scriptUrl;
    if (!provider.enabled || !scriptUrl || !zone) return false;

    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.dataset.adProvider = providerName;
    if (zone.zoneId || typeof zone === 'string') script.dataset.zoneId = zone.zoneId || zone;
    if (provider.siteId) script.dataset.siteId = provider.siteId;
    container.replaceChildren(script);
    return true;
  }

  function initializeSlots() {
    let activeAdSenseSlots = 0;
    document.querySelectorAll('.ad-slot[data-ad-placement]').forEach((container) => {
      const placementName = container.dataset.adPlacement;
      const placement = settings.placements && settings.placements[placementName];
      if (!placement) {
        if (!isDevelopment || !settings.previewOnLocal) container.hidden = true;
        return;
      }

      const providerName = placement.provider;
      const provider = providers[providerName];
      container.dataset.provider = providerName;
      container.classList.remove('adsense-ad', 'adsterra-ad', 'monetag-ad');
      container.classList.add(`${providerName}-ad`);

      if (providerName === 'adsense') {
        const slot = provider && provider.slots && provider.slots[placement.zone];
        if (!provider || !provider.enabled || !provider.publisherId || !slot) {
          if (!isDevelopment || !settings.previewOnLocal) container.hidden = true;
          return;
        }
        const ad = document.createElement('ins');
        ad.className = 'adsbygoogle';
        ad.dataset.adClient = provider.publisherId;
        ad.dataset.adSlot = slot;
        ad.dataset.adFormat = 'auto';
        ad.dataset.fullWidthResponsive = 'true';
        container.replaceChildren(ad);
        activeAdSenseSlots += 1;
        return;
      }

      if (!provider || !initializeThirdPartySlot(container, providerName, provider, placement)) {
        if (!isDevelopment || !settings.previewOnLocal) container.hidden = true;
      }
    });

    if (!activeAdSenseSlots) return;
    const adsense = providers.adsense;
    loadAdSense(adsense);
    document.querySelectorAll('.ad-slot[data-provider="adsense"] ins.adsbygoogle').forEach((ad) => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  document.addEventListener('DOMContentLoaded', initializeSlots);
}());
