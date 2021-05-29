---
title: Google搜索错误"隐私设置错误,您的连接不是私密连接"解决
date: 2021-01-20 22:00:12
sidebar: true
sidebarDepth: 5
tags: 
- bug
categories:
- "笔记类"
isShowComments: true
---
[[toc]]


# 引言

一直正常使用的chrome 突然出现了一个异常：打开其他网页均正常，但是在地址栏用默认搜索引擎Google进行搜索时就跳转到隐私设置错误，“您的连接不是私密连接”，并且点击【高级】选项后不能继续访问，如图

![](https://img-blog.csdnimg.cn/20210114170923900.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzQzMDM3,size_16,color_FFFFFF,t_70)
期间换过代理，也根据网络上许多博客说法，针对HSTS的情况，对chrome 操作

```bash
1、在Chrome地址栏中输入:
   chrome://net-internals/#hsts; 进入Domain Sercurity Policy界面。
2、在下图中输入二级域名查询是否使用了强制 HTTPS 请求。
3、如果有查询结果，则在最下方的delete栏处，删除该域名的信息
4、再次查询，如下图所示，“NOT FOUND”则表示删除成功。
```
无果。

## 问题分析

因为打开其他网页正常，所以不是网络连接问题，关闭防火墙、更改代理模式等等手段不起作用；
搜索栏默认搜索引擎换成百度等等后可以进行搜索，定位到是 Google 搜索的问题，查看设置-搜索引擎。可以看到查询网址是

```bash
{google:baseURL}/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}
```

而其他的搜索引擎都是 https:// 开头，回顾一下提示错误：

> 您目前无法访问 www.google.com，因为此网站使用了 HSTS。

可见问题出在没有使用 https 加密，因此重新添加一个搜索引擎，把查询网址改为

```bash
https://www.google.com.hk/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}
```
主要是把开头改成 https://www.google.com.hk ，再设置为默认引擎，就可以正常在地址栏进行搜索。
如图，进入chrome的搜索引擎管理，添加：
![](https://img-blog.csdnimg.cn/20210114172302995.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzQzMDM3,size_16,color_FFFFFF,t_70)



::: tip 参考

[https://blog.csdn.net/m0_46471347/article/details/107114822](https://blog.csdn.net/m0_46471347/article/details/107114822)

:::