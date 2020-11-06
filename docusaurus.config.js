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
      links: [
        {
          href: 'https://dbrowser.com/install/',
          label: 'Install',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://beaker.dev/docs/templates/',
          label: 'Templates',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://beaker.dev/docs/tutorials/',
          label: 'Tutorials',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://github.com/dbrowser/beaker/discussions',
          label: 'Ask Questions',
          position: 'left',
        },
      ],
    },
    algolia: {
      apiKey: '8e801593bf85623c9a64dfd9470d06ab',
      indexName: 'dbrowser'
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
