const path = require('path')
const nav = require('./config/nav/')
const sidebar = require('./config/sidebar/')

module.exports = {
    // dest: 'gb-pages',//打包目录
    title: "GLIMMER小作坊",
    description: '时间太瘦，指尖太宽，且行且珍惜',
    head: [
      ['link', { rel: 'icon', href: '/images.png' }],
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
      [
        "script", {
            "language": "javascript",
            "type": "text/javascript",
            "src": "https://cdn.staticfile.org/jquery/1.7.2/jquery.min.js"
        }
      ],
      [
          "script", {
              "language": "javascript",
              "type": "text/javascript",
              "src": "/js/MouseClickEffect.js"
          }
      ]
    ],

    //主题配置
    theme: 'reco',
    themeConfig: {
        nav: nav,
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // sidebar: 'auto',// 自动形成侧边导航
        sidebar: sidebar,
        sidebarDepth: 2,
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类'     // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'     // 默认文案 “标签”
            }
        },
        // 最后更新时间
        lastUpdated: true,
        lastUpdated: '最后更新时间', // string | boolean
        // 作者
        author: 'LiJun',
        // 备案号
        record: 'Copyrights ©2020 ',
        // 项目开始时间
        startYear: '2020',
        //git地址
        //repo: 'LJoson',//github链接
        // 如果你的文档不在仓库的根部
        docsDir: 'docs',
        // 可选，默认为 master
        //docsBranch: 'vuepress',
        //editLinks: true,
        //editLinkText: '在 GitHub 上编辑此页！',
        //评论
      	valineConfig: {
       		appId: '39hYdbtO1YYRJJQrMbm1daof-gzGzoHsz',
       		appKey: 'EoRNBrPKIMNveUzkk0HGnjGt',
       		placeholder: 'You can leave a message here，也欢迎找bug留言告诉我',
    		  notify: false, // 邮件提醒
          verify: false, // 验证码
    		  recordIP: false
       	},
    },

  markdown: {
    lineNumbers: true
  },

  //插件配置
  plugins: [
   [
      'vuepress-plugin-container',
      {
        type: 'details',
        before: info => `<details class="custom-block details"><summary>${info}</summary>`,
        after: '</details>',
        defaultTitle: '详细信息'
      },
    ],
    [
      '@vuepress/pwa', 
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-162861883-1'//gitee
      },
      {
        ga: 'UA-162861883-2'//github
      }
    ],
    // [
    //   '@vuepress/plugin-register-components',
    //   {
    //     components: [
    //       {
    //         name: 'reco-home-page-one',
    //         path: path.resolve(__dirname, './components/HomePageOne.vue')
    //       }
    //     ],
    //     componentsDir: path.resolve(__dirname, './demo')
    //   }
    // ],
    '@vuepress-reco/extract-code',
    'flowchart',
    "vuepress-plugin-boxx",
    ['vuepress-plugin-smooth-scroll'],
    ['vuepress-plugin-code-copy',true ],
    require('./plugins/detailsOpenFlag/index'),
    //require('./plugins/musicPlayer/index')


  ]
}  