---
title: FPGA环境搭建与示例
date: 2021-04-10 12:41:12
sidebar: true
sidebarDepth: 5
tags: 
- FPGA
categories:
- "电子设计类"
isShowComments: true
---
[[toc]]
# 引言

借着EDA课程学习的契机，搭建起一个cpu等设计的环境，慢慢的推进自己设计芯片项目的计划。
## fpga简介
FPGA（Field-Programmable Gate Array，现场可编程门阵列），正如其名，FPGA内部有大量的可编程逻辑功能块，使用verilog HDL（硬件描述语言）实现设计，当今，半导体市场格局已成三足鼎立之势，FPGA，ASIC和ASSP三分天下。市场统计数据表明，FPGA已经逐步侵蚀ASIC和ASSP的传统市场，并处于快速增长阶段。而在全球市场中，Xilinx、 Altera 两大公司对FPGA的技术与市场仍然占据绝对垄断地位。so,本篇也是基于Altera以及Xilinx两个巨头的芯片的开发环境搭建。

## Quartus环境(Altera)
下载,需要在官网注册账号，lite为免费版。
[Quartus Prime 精简版](https://fpgasoftware.intel.com/20.1/?edition=lite&platform=windows)

[网盘链接](https://pan.baidu.com/s/1OGnDUalP8b7ara-SIv2ckg)

提取码：ce3z 

![image-20210417162630200](https://gitee.com/Lj_Evan/images/raw/master/fpgaenv/20210417162630.png)
在页面选择仿真器以及器件支持包(除非是CPU设计，MAX V系列就够了)

下载完成后，把所有安装包放进一个目录，方便安装，然后打开QuartusLiteSetup-你的版本-windows.exe，点next就行,如果前面下载的安装包都在一起，那么软件会自己勾选好所下的器件包，后面有更多的器件包需要也可以点击安装文件另外进行添加。

::: tip 更多可参考

https://blog.csdn.net/weifengdq/article/details/103131472

https://blog.csdn.net/ixunmo/article/details/79338650

https://blog.csdn.net/weixin_41082948/article/details/85948688


:::

### 仿真

由于版本问题，有的软件不自带modelsim-altera,建议去官网下载，可以解决。
在tool-option-eda tool option设置仿真工具路径

![image-20210417232139170](https://gitee.com/Lj_Evan/images/raw/master/fpgaenv/20210417232139.png)

![image-20210417232224811](https://gitee.com/Lj_Evan/images/raw/master/fpgaenv/20210417232224.png)


另外由于在高版本仿真时会出现
- **Error (suppressible): (vsim-12110) The -novopt option has no effect on this product. -novopt option is now deprecated and will be removed in future releases.**

原因：“-novopt ”参数不支持新版本，并且打算在未来版本中删除，所以仿真时就在设置里面删除-novopt参数即可


### usb驱动

- 通过自带drives安装即可
- 遇到没有数字签名的情况

第二个情况会有点复杂

可以直接参考
[USB-Blaster驱动安装](https://blog.csdn.net/grace_fight/article/details/82961367?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161822552316780366569135%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=161822552316780366569135&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-1-82961367.pc_search_result_cache&utm_term=quartus%E7%9A%84usb%E4%B8%8B%E8%BD%BD)

[Win10系统出现Windows 无法验证此文件的数字签名](https://blog.csdn.net/weixin_43559850/article/details/103646893?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161822379016780274186866%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=161822379016780274186866&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-1-103646893.pc_search_result_cache&utm_term=quartus%E7%9A%84usb%E6%B2%A1%E6%9C%89%E7%AD%BE%E5%90%8D)

值得注意的是，quartus的drives有两款USB-Blaster,如果有一个无法安装，可以直接尝试第二个驱动安装。
## vivado(Xilinx)
vivado很大，在笔记本电脑上只是做了简单安装，还是建议在官网下载安装。

[百度网盘链接](https://pan.baidu.com/s/14GwiTJMeX9CdP-3uRWEsqA)
提取码：o697 

篇幅目前过多，可直接参考:

**https://blog.csdn.net/weixin_44737922/article/details/106733317**
https://blog.csdn.net/weixin_30267697/article/details/98185174

https://blog.csdn.net/MicroTalent12/article/details/106553599