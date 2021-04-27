---
home: true
heroImage: '/vuepress/topic.jpg'
heroImageStyle: {
  maxWidth: '800px',
  width: '100%',
  height: '15%',,
  display: block,
  margin: '24% auto -18% auto',
  //border: '1px dashed #000',
  box-shadow: '8px 8px 20px #022',
  borderRadius: '1rem',
  background: 'rgba(0, 0, 0, 0.8) none repeat scroll !important',
}
#heroText: Joson's personal station
#tagline: 时间太瘦，指尖太宽，且行且珍惜
isShowTitleInHome: true
#isShowComments: true
actionText: 开启探索之旅→
actionLink: /views/
features:
- title: 特点
  details: 简洁易懂，以技术分享为中心（狗头保命）。
- title: 简介
  details: 一个纪录学习以及diy日记的随时会崩的个人blog。
- title: 不定期更新
  details: 本人有点懒且佛系，并没有确定的分享时间。
footer: #NO Licensed | Copyright © 2020-present Lj
---



# Hello World!

::: tip 寄语

欢迎来到Glimmer小作坊，愿在此相遇的我们初心未变，追梦不止~

:::


<CanvasNest color='0,23,255' zIndex='-2'></CanvasNest>

<style>
.home .content__default:not(.custom) {
  max-width: 100% !important;
  margin: 0  !important;
  padding: 0 !important;
}
.home .hero h1 {
    display: none;
}
.home img {
   transform: scale(0.8,0.8) !important;
   transition: all 1s!important;
}
.home img:hover {
   transform: scale(1)!important;
   transition:all 2s !important;
}
/* 阻止描述冒泡 */
.home .hero .description{
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
.home .feature p {
    color: #476582 !important;
}
.home .hero .description {
    color: #476582 !important;
}
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    min-height: 10vh;
    background: transparent none repeat scroll!important;
    position: fixed;
    top: -120%;
    left: -1%;
}

@media screen and (max-width: 768px){
  .clock {
    margin-top: -35%
  }
}

@media screen and (max-width: 700px){
  .wrap {
    top:-107%;
    transform: scale(0.68,0.58);
  }
  .home img {    
    margin: 24% auto -6% auto !important;
  }
  .home .feature {
    width: 100%;
    text-align: center;
    color: rgb(71, 101, 130) !important;
    padding: 5px !important;
    margin: -12px;
    margin-left: 0px;
  }
  
}

.wrap {
  transition: all 2s;
}

.wrap:hover {
  transform: scale(1.15) !important;
  transition: all 2s;
}

</style>

