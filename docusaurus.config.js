module.exports = {
  title: 'dBrowser Docs',
  url: 'https://docs.dbrowser.com',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  themeConfig: {
    navbar: {
      title: 'dBrowser Docs',
      logo: {
        alt: 'dBrowser Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-white.svg'
      },
      items: [
        {
          href: 'https://peepsx.com/dbrowser',
          label: 'Install DBrowser',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://peepsx.com/dwallet',
          label: 'dWallet',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://dwebx.org',
          label: 'About dWeb',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://t.me/peepsology',
          label: 'Support',
          position: 'left',
        },
      ],
    },
    algolia: {
      apiKey: '8e801593bf85623c9a64dfd9470d06ab',
      indexName: 'dbrowser'
    },
    googleAnalytics: {
      trackingID: 'G-FZX9NVXJF9',
      // Optional fields.
      // anonymizeIP: true, // Should IPs be anonymized?
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/dbrowser/docs.dbrowser.com/edit/master/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
