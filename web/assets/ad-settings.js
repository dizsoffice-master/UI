window.siteAdSettings = {
  previewOnLocal: true,
  providers: {
    adsense: {
      enabled: true,
      publisherId: 'ca-pub-4060889454607043',
      scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      slots: {
        horizontal: '1283990566',
        vertical: '9653435176',
        verticalSecondary: '6288156802',
        middle: '',
        bottom: ''
      }
    },
    adsterra: {
      enabled: true,
      scriptUrl: 'https://www.highrevenueformat.com',
      zones: {
        containerTop: {
          type: 'container-script',
          scriptUrl: 'https://pl31462448.profitableratecpmnetwork.com/0a4322fefb485bb82e24bea07cd8c75f/invoke.js',
          containerId: 'container-0a4322fefb485bb82e24bea07cd8c75f',
          scriptAttributes: { 'data-cfasync': 'false' }
        },
        top: {
          key: '4cbdb656a17ae58b35190fde0cff17c1',
          format: 'iframe',
          width: 728,
          height: 90,
          params: {}
        },
        bottom: {
          key: '4cbdb656a17ae58b35190fde0cff17c1',
          format: 'iframe',
          width: 728,
          height: 90,
          params: {}
        },
        rail: {
          key: '6454803855b00a443dad6542bc5de5c6',
          format: 'iframe',
          width: 160,
          height: 600,
          params: {}
        }
      }
    },
    monetag: {
      enabled: true,
      scriptUrl: 'https://n6wxm.com/vignette.min.js',
      zoneId: '11935343',
      insertionTarget: 'body',
      scriptAttributes: { 'data-cfasync': 'false' },
      placementPreferences: ['top', 'right', 'bottom'],
      disabledReason: 'Vignette/interstitial script disabled to prevent screen-covering ads.'
    }
  },
  placements: {
    homepage: { provider: 'adsense', zone: 'horizontal' },
    'top-primary': { provider: 'adsense', zone: 'horizontal' },
    'top-secondary': { provider: 'adsterra', zone: 'containerTop' },
    'top-monetag': { provider: 'monetag', zone: 'vignette' },
    'after-tool': { provider: 'adsense', zone: 'horizontal' },
    'after-info': { provider: 'adsterra', zone: 'bottom' },
    'before-footer': { provider: 'monetag', zone: 'vignette' },
    'rail-top': { provider: 'adsense', zone: 'vertical' },
    'rail-middle': { provider: 'adsterra', zone: 'rail' },
    'rail-bottom': { provider: 'adsense', zone: 'verticalSecondary', shape: 'square' },
    'rail-monetag': { provider: 'monetag', zone: 'vignette' }
  }
};