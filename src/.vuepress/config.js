module.exports = {
  title: 'Const Weapp',
  description: 'Const WeApp 快速搭建属于自己的微信小程序组件库',
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: '组件库',
        link: '/docs/howToUse'
      },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/package',
        target: '_blank'
      },
      {
        text: 'Git仓库',
        link: 'https://github.com/Chef5/const-weapp',
        target: '_blank'
      },
    ],
    sidebar: {
      '/': [
        'docs/howToUse',
        {
          title: '组件',
          // path: '/docs/components',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'check-radio/',
            'drop-select/',
            'hand-signature/',
            'message-overlay/',
            'no-data/'
          ], // compile-docs
        },
      ],

    }
  }
}
