---
title: Nanopi neo笔记-认识及环境配置
date: 2021-03-07 15:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 嵌入式
categories:
- "电子设计类"
isShowComments: true
---
[[toc]]


[官方wiki](https://wiki.friendlyarm.com/wiki/index.php/NanoPi_NEO/zh)
- 连接WiFi
```
vi /etc/network/interfaces
```
:::

auto lo 
iface lo inet loopback 

:::

```
sudo nmcli dev wifi connect "LJoson" password "junli117"
```

- 记得关机
```
shutdown -h now

```

::: tip 笔记

1.玄学问题，使用串口登录，日记抛出一个错误：

```
mv64xxx: I2C bus locked, block: 1, time_left: 0

```
原因I2C SCL/SDA 没有上拉，将SDA上拉之后重启不再出现该错误，但是看到部分说法上拉依然没有解决问题，后面出现再解决了。
https://whycan.com/t_3612.html

补充：非常幸运在使用过程中遇到上拉依然没有解决问题的玄学问题，但是不上拉之后又恢复正常，原因需要进一步分析。

2.网络连接


:::

3.远程
sftp服务
http://filezilla-project.org/download.php?type=client


xftp
https://www.netsarang.com/zh/all-downloads/