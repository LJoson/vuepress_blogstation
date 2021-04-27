---
title: 目标检测及识别在服务端部署demo
date: 2020-05-24 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 目标检测
categories:
- "AI及大数据类"
isShowComments: true
---

[[toc]]


# 引言
将网络模型部署在服务端
## 前后端分离的目标检测演示

### 工具
- 1.node.js(或者git):两款都是开源应用，就在官方网站就可下载安装，放心食用。
- 2.pycharm(anaconda)
- 3.netron：神经网络模型可视化工具
- 4.vscode或者jetbrain家的webstorm:前端页面源码开发或者查看
### 使用
貌似一键运行就可以，想加载或者训练自己模型,细节都可以查看
[几十行代码构建一个前后端分离的目标检测演示网站](https://mp.weixin.qq.com/s/MIBNjqfx0yG-Bdq2OaeOuA)
<br/>
::: tip 错误日记

https://github.com/d1y/MoePiku/issues/14
主要涉及到前后端交互内容，注意在本机运行前端和后台容易出现port端口被占用的情况，导致前后端交互不能正常进行，具体需要对TCP协议，IP地址等知识进行深入理解。

```
GET / HTTP/1.1" 404
```
- 检查前端的请求是否报错：在chrome中按F12进入开发者模式，然后查看控制台；看有没有POST“ http://127.0.0.1:5000/api/”。的报错，如果报错，说明网页连不到后台服务；自己查看端口是否一致，路由是否正确；
- 如果前端请求没有问题，请调试后台服务代码；查看tensorflow处理的数据有没有结果，结果是否正确，一般都是版本或者库引起的问题，另外
另外就是pyweb跟node.js的port的端口会有所不同，需要根据具体情况自己更改。
- 在app.run(host='127.0.0.1', port=5000)处，默认的是5000，可更改其他port.
- 需要注意，index.js中18行，写死了var url = protocol + '//' + host + ":5000/api/";需要一起更换掉
- 在前后端交互是前后端的端口port是不能相同的，相同的时候会无法正常交互。

:::

## TensorFlow.js版
[在浏览器进行人脸口罩识别](https://mp.weixin.qq.com/s?__biz=MzIyMDY2MTUyNg==&mid=2247483795&idx=1&sn=05e5e3e7d895d8993592b3141e39446b&chksm=97c9d3eaa0be5afcb36b8ac124eb5e7d6d86f549f15b634db194eddc784e85f3d7d8abccc216&mpshare=1&scene=1&srcid=&sharer_sharetime=1585995559259&sharer_shareid=cfe18de94f3a847e5ada278bbc490577&exportkey=AYmJnEAPff9hYzZVMv21kss%3D&pass_ticket=mWIVA3QAV6s8RB5LXrZtstiHlu59hNAG7UDhJOnA43G9Pe8xmbQCr%2FksIbtTbVUi#rd)


## 微信小程序版
待更新