---
title: PicGo+typora搭建在线图床
date: 2021-04-02 11:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 杂谈
categories:
- "杂谈"
isShowComments: true
---

[[toc]]

# 引言
由于经常使用markdown记录笔记以及码博客，而typora的图床问题一直是个不舒服的点，而在线图床问题就是慢，还是不方便，不过还是尝试一下。


## 安装picGo

PicGo 是一款在 github 上开源的用于快速上传图片并获取图片 URL 连接的工具。

[PicGO](https://molunerfinn.com/PicGo/)

## picGo设置

打开picgo，可以选择GitHub图床(使用多)，但是网络会慢，所以还做了gitee图床设置。

### Github图床
在github新建一个仓库，公开的才可以。

在PicGO里面找到图床设置

![image-20210405161436388](https://gitee.com/Lj_Evan/images/raw/master/imgs/20210405161436.png)

配置参数说明：

仓库名：用户名/仓库名
分支名：所属分支
token：
```
|-setings
|-- Developer settings
|------Personal access tokens 下生成

注意：token 只会显示一次，记得保存如果你不建议重新配置一次的话

```

指定路径：仓库下的指定文件夹,方便整理
自定义域名：使用了 CDN 加速，配置格式为：
```
https://cdn.jsdelivr.net/gh/github用户名/github仓库名
```

### gitee图床
在gitee新建一个仓库，公开的才可以。
gitee图床需要安装插件，选择**插件设置**菜单，在里面输入**gitee**，搜索插件，随便安装一个即可
在PicGO里面找到图床设置
![image-20210405162314415](https://gitee.com/Lj_Evan/images/raw/master/imgs/20210405162314.png)

配置参数说明：

repo: gitee用户名/仓库名(是用户名不是昵称)；
branch: 分支名（如：master）;
token: gitee私人令牌
在设置->私人令牌生成
path: 用于仓库下存储的目录
customPath和customUrl可以不用填

PS：在picgo图床设置里面可以把时间戳重命名开一下。

### 设置 Typora

需要升级Typora到最新版本，在偏好设置里面，找到图像，设置参考如图：

![image-20210405163731500](https://gitee.com/Lj_Evan/images/raw/master/imgs/20210405163731.png)

验证上传，如果验证失败，可以在picgo设置里面

设置server

![image-20210405164014056](https://gitee.com/Lj_Evan/images/raw/master/imgs/20210405164014.png)



至此，便可通过 Typora 优雅的编写 Markdown 文档。。。大概吧

更多可以参考：

[https://blog.csdn.net/disILLL/article/details/104944710](https://blog.csdn.net/disILLL/article/details/104944710)

[https://blog.csdn.net/weixin_43967679/article/details/108672790](https://blog.csdn.net/weixin_43967679/article/details/108672790)