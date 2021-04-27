---
title: WSL上基于Ubuntu18.04搭建arm交叉编译环境
date: 2021-04-03 12:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 嵌入式
categories:
- "电子设计类"
isShowComments: true
---

[[toc]]

# 引言

由于平时使用win10较多，电脑可能带不动虚拟机，所以寻找了一个wsl下做arm虚拟环境开发方案。所谓工欲善其事必先利其器

## WSL配置

可参考[在Windows10上用WSL优雅开发](https://lj_evan.gitee.io/views/freetalk/wsl.html)

查看系统信息
```
# 安装screenfetch
sudo apt install screenfetch
# 启动sceenfetch
screenfetch
```
## ARM交叉编译环境搭建

### 为Ubuntu开启32位支持(非必要)
```
sudo dpkg --add-architecture i386
```

### 安装32位的库和宿主的工具（非必要）
```
# 宿主开发环境
sudo apt install -y build-essential
# 32位库
sudo apt install -y lib32ncurses5 lib32z1
sudo apt install -y lib32stdc++6

```

### 安装交叉编译工具链
```
# 安装gcc
sudo apt install gcc
# 安装arm-linux-gcc
sudo apt-get install gcc-arm-linux-gnueabihf
# 安装arm-linux-g++
sudo apt-get install g++-arm-linux-gnueabihf

```
如果出现
::: tip
E:Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
:::
那么可以运行以下代码修复依赖
```
sudo apt-get update  --fix-missing 
```
### 检查安装
```
# 查看gcc版本
gcc -v
# 查看arm-linux-gcc版本
arm-linux-gnueabihf-gcc -v
# 查看arm-linux-g++版本
arm-linux-gnueabihf-g++ -v
```

执行下面的代码建立软链接，否则后面执行的时候会报动态库找不到的错误：
```
sudo ln -s /usr/arm-linux-gnueabihf/lib/libc.so.6 /lib/libc.so.6
sudo ln -s /usr/arm-linux-gnueabihf/lib/ld-linux-armhf.so.3 /lib/ld-linux-armhf.so.3
```
### 安装arm模拟器qemu
```
sudo apt-get install qemu
```
注意：qemu是需要图形界面的，所以需要装一个图形界面。
#### 为WSL安装图形界面
- 1.在windows上安装[VcXsrv](https://sourceforge.net/projects/vcxsrv/)
原理是WSL会把界面信息发送给VcXsrv，由VcXsrv来绘制界面
Windows上打开XLaunch,一般选择Multiple Window，然后一直下一步，也可以根据提示保存默认配置，之后不用重复配置。
XLaunch会一直在后台运行，要启动WSL图形界面，是需要确定XLaunch启动了。

- 2.在WSL上安装xfce desktop，选择xfce4桌面，它的优点是轻量、美观、占用系统资源少
```
sudo apt-get install xfce4-terminal
sudo apt-get install xfce4
sudo apt install dbus-x11

```
为了方便，打开Ubuntu bash，运行如下代码：
```
echo "export DISPLAY=:0.0" >> ~/.bashrc
```
这样，每次打开图形界面程序就不需要额外指定DISPLAY了。

之后需要关掉所有bash重启wsl！！！

- 运行
```
startxfce4
```
或者
```
xfce4-session
```
::: tip
https://blog.csdn.net/yq_forever/article/details/103632662

https://blog.csdn.net/w_weilan/article/details/82862913

https://www.jianshu.com/p/8404e34feefe

:::


### gdb调试arm程序
在Ubuntu上用gdb调试arm程序的原理：qemu端作为gdb server启动可执行程序，另一端作为gdb client连接gdb server，进行本地远程调试。
- 1.首先安装多平台的gdb工具
```
sudo apt-get install gdb-multiarch
```
::: tip
gdb-multiarch
顾名思义，它是gdb支持多中硬件体系架构的版本。之所以要安装gdb-multiarch，是因为Ubuntu默认安装的gdb只支持x86/x64架构
:::
- 2.编译代码,注意加上参数--static。加上这个参数后，生成的可执行文件为静态链接的。如果不加这个参数，gdb调试的时候单步执行功能不正常，符号表也找不到。 
```
arm-linux-gnueabihf-gcc 编译文件 -static -o 输出文件 -nostdlib 
```
- 3.启动qemu，-g指明了gdb的监听端口，这里选择的是1234
```
qemu-arm -g 1234 编译的输出文件
```
- 4.新开一个命令行窗口，启动gdb client,进入gdb交互界面 
```
gdb-multiarch 编译的输出文件
```
在gdb交互界面输入以下内容就可以连接到server端
```
target remote localhost:1234
```
简单介绍几个常用的 gdb 指令： 
(gdb) disassemble           // 查看反汇编 
(gdb) x /8xw 0x0000808e     // 查看内存 （可查具体参数）  
(gdb) info register         // 查看寄存器 
(gdb) continue              // 继续执行 
(gdb) stepi                 // 汇编级逐过程 
(gdb) nexti                 // 汇编级逐语句 


- 最后远程[sftp服务](http://filezilla-project.org/download.php?type=client),其实win10已经挂载在wsl的mnt上，所以sftp服务感觉可有可无
## issues

- su: Authentication failure
这个问题产生的原因是由于ubtun系统默认是没有激活root用户,需要我们手工进行操作sudo passwd，初始化root。
::: tip
https://blog.csdn.net/cjmcp/article/details/17655187

https://blog.csdn.net/huijiaaa1/article/details/81106337?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control

:::

- qemu: command not found 
建立一条软链接：
```
sudo ln -s /usr/bin/qemu-system-i386 /usr/bin/qemu 
```
然后再
```
vi /etc/profile 
```
添加一行 
```
export PATH=$PATH:/usr/bin/qemu 
```
再使用
```
source /etc/profile 
```
使其生效,就可以使用qemu命令了
- VIM编辑文件权限问题:"E45: 'readonly' option is set (add ! to override)"
解决方案， :q! 强制关闭文件后，在命令行里输入：sudo !! 后回车再次vim打开文件编辑就正常
或者在root权限下wq!强制保存退出
::: tip 解决
https://blog.csdn.net/museions/article/details/90313476?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.control&dist_request_id=1328767.28821.16174542906693085&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.control

https://blog.csdn.net/u012569217/article/details/77530004

:::

- 跨平台仿真arm文件，运行时报错：/lib/ld-linux-armhf.so.3: No such file or directory

编译的时候：

错误编译：arm-linux-gnueabihf-gcc -o ，没有-static

正确编译：arm-linux-gnueabihf-gcc -static -o 需要-static静态参数

::: tip 参考文章
[WSL搭建嵌入式开发环境](https://blog.csdn.net/qq_40977710/article/details/103822555?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&dist_request_id=1328767.27535.16174405789507617&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control)

https://www.jianshu.com/p/d4d892e10adb

https://cloud.tencent.com/developer/article/1578333

:::