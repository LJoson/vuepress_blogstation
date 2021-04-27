---
title: 自制简单操作系统之旅-GlimmerOS
date: 2020-07-17 20:00:12
sidebar: true
sidebarDepth: 5
tags: 
- 操作系统os
categories:
- "计算机技术类"
isShowComments: true
---

[[toc]]
# 引言
GlimmerOS-The GlimmerOS is based on the book "30-day homemade operating system", drawing on many of its ideas, as well as the project[os-tutorial](https://github.com/cfenollosa/os-tutorial)<br>

GlimmerOS是基于《30天自制操作系统》一书，借鉴其中很多思路方法和工具,以及项目[os-tutorial](https://github.com/cfenollosa/os-tutorial)
![](/img/cs/os/1.JPG)

## 进程：

- 汇编阶段

  启动区等引入部分

- C阶段以及32位模式

  中断处理，鼠标控制等

未完仍然在开发学习中

## 知识补充

DB指令是“define byte”的缩写，也就是往文件里直接写入1个字节的指令。笔者喜欢用大写字母来写汇编指令，但小写的“db”也是一样的。在汇编语言的世界里，这个指令是程序员的杀手铜，也就是说只要有了DB指令，我们就可以用它做出任何数据（甚至是程序）。所以可以说，没有用汇编语言做不出来的文件。文本文件也好，图像文件也好，只要能叫上名的文件，我们都能用汇编语言写出来。而其他的语言（比如C语言）就没有这么万能。
RESB指令是“reserve byte”的略写，如果想要从现在的地址开始空出10个字节来，就可以写成RESB10，意思是我们预约了这10个字节（大家可以想象成在对号入座的火车里，预订了10个连号座位的情形）。而且nask不仅仅是把指定的地址空出来，它还会在空出来的地址上自动填入0x00，所以我们这次用这个指令就可以输出很多的0x00，省得我们自己去写18万行程序了，真是帮了个大忙。


::: tip sources

http://oswiki.osask.jp/?FrontPage

https://qemu.weilnetz.de/w64/

https://www.jianshu.com/p/ba6a32d68ed5

[https://github.com/yourtion/30dayMakeOS](https://github.com/yourtion/30dayMakeOS)

[https://github.com/cfenollosa/os-tutorial](https://github.com/cfenollosa/os-tutorial)

http://hrb.osask.jp/

https://wiki.osdev.org/Main_Page

https://my.oschina.net/superkangning/blog/528881

https://blog.csdn.net/jiangwei0512/article/details/56495296

:::