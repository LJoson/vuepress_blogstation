---
title: 灵魂画手——‘Midbot’
date: 2020-03-24 20:47:14
sidebar: true
sidebarDepth: 5
tags: 
- 开源写字机
categories:
- "电子设计类"
isShowComments: true
---


# 结构
市面上有很多结构写字机，我要介绍的是经典的corexy结构的写字机。该写字机是基于T站上一个开源[写字机项目](https://www.thingiverse.com/thing:2587684).其结构如图：

![](/img/projects/midbot/1.jpg)
<br/>
而一般的corexy十字架构写字机两个电机是分开，不好的一点就是占空间，而midbot将两个控制电机集中在了中间，极大节省了空间。
想补充的是在我diy的过程中也发现几点可改进的地方：
- （1）底部支撑：不稳，容易倒
- （2）舵机抬笔：卡同步带地方易断裂

# 工具
T站上控制主板多是esp32以及arduino nano,我使用的是arduino uno+cnc sheild控制器，控制算法就是经典的GRBL，网络上也有在stm32上移植grbl,我还没有实现，后面实现了进行补充。

所有资料获取：[https://github.com/LJoson/midbot](https://github.com/LJoson/midbot)