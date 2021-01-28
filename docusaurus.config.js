module.exports = {
  title: 'dWeb Docs',
  url: 'https://developers.dwebx.org',
  baseUrl: '/',
  favicon: 'img/dweb-logo.png',
  themeConfig: {
    navbar: {
      title: 'dWeb Docs',
      logo: {
        alt: 'dBrowser Logo',
        src: 'img/dweb-logo.png',
        srcDark: 'img/logo-white.svg'
      },
      items: [
        {
          href: 'http://dbrowser.com',
          label: 'Download dBrowser',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://docs.arisen.network',
          label: 'ARISEN Docs',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://docs.dbrowser.com',
          label: 'dBrowser Docs',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://t.me/dweb1776',
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
          editUrl: 'https://github.com/DistributedWeb/developers.dwebx.org/edit/master/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
