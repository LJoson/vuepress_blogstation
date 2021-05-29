//导航栏
module.exports = [
    { text: 'Home', link: '/index.html', icon: 'reco-home' },
    { text: '我的', icon: 'reco-document',
      items: [{
          text: 'Projects🎈',
          items: [{
              text: 'Project on github',
              link: '/projects/github',
            }]
        },
        {

          text: 'Station🎈',
          items: [{
              text: 'GitHub', link:'https://github.com/LJoson', },
              {text: 'CSDN', link: 'https://blog.csdn.net/qq_43743037',}]//跟project同级
            },]
    },
    { text: '时间线', link: '/timeLine/', icon: 'reco-date' },
    { text: '关于坊主', link:'/aboutme', icon: 'reco-message' },
]