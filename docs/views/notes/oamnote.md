---
title: 运维错误及解决笔记
date: 2021-02-17 17:00:12
sidebar: true
sidebarDepth: 5
tags: 
- bug
categories:
- "笔记类"
isShowComments: true
---


[[toc]]
# WIN10

**背景：有时windows会莫名没有网，此时可能需要重置下网络**

操作：用**管理员身份**，打开cmd窗口，一般输入下面1、2条目，然后**重启系统**

 

1、重置IP 设置，恢复到默认自动获取IP 和DNS 服务器地址

```bash
netsh int ip reset
```

2、修复网络配置及winsock协议

```bash
netsh winsock reset
```

3、解除代理设置

```bash
netsh winhttp  reset  proxy
```

4、重置防火墙设置。

```bash
netsh advfirewall reset
```

5、清除DNS缓存

```bash
ipconfig /flushdns
```



# Linux