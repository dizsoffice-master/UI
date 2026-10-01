window.siteAdSettings = {
  previewOnLocal: true,
  providers: {
    adsense: {
      enabled: true,
      publisherId: 'ca-pub-4060889454607043',
      scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      slots: {
        top: '',
        middle: '',
        bottom: ''
      }
    },
    adsterra: {
      enabled: false,
      scriptUrl: '',
      zones: {}
    },
    monetag: {
      enabled: false,
      siteId: '3c364ad8fa45fcf9a283832bdc28435b',
      scriptUrl: '',
      zones: {}
    }
  },
  placements: {
    homepage: { provider: 'adsense', zone: 'top' },
    'top-primary': { provider: 'adsense', zone: 'top' },
    'top-secondary': { provider: 'adsterra', zone: 'top' },
    'after-tool': { provider: 'adsense', zone: 'middle' },
    'after-info': { provider: 'monetag', zone: 'middle' },
    'before-footer': { provider: 'adsense', zone: 'bottom' },
    'rail-top': { provider: 'adsense', zone: 'top' },
    'rail-middle': { provider: 'adsterra', zone: 'rail' },
    'rail-bottom': { provider: 'monetag', zone: 'rail' }
  }
};