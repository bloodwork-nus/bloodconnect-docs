module.exports = {
  title: 'BloodConnect',
  tagline: 'Give to those who need it the most',
  url: 'https://bloodwork-nus.github.io',
  baseUrl: '/bloodconnect/',
  favicon: 'img/logo.png',
  organizationName: 'bloodwork-nus', // Usually your GitHub org/user name.
  projectName: 'bloodconnect', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'BloodConnect',
      logo: {
        alt: 'BloodConnect Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/bloodwork-nus/bloodconnect-api',
          label: 'API',
          position: 'right',
        },
        {
          href: 'https://github.com/bloodwork-nus/bloodconnect',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bloodwork-nus/bloodconnect',
            },
          ],
        },
      ],
      copyright: `<p>BloodConnect is a project by Bloodwork for NUS Orbital 2020.</p>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/bloodwork-nus/bloodconnect-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/bloodwork-nus/bloodconnect-docs/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
