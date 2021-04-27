---
title: Window10下cmake编译Yolov4
date: 2020-05-13 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 图像处理
- 机器学习
categories:
- "计算机技术类"
isShowComments: true
---

[[toc]]

# 引言

- 年初 YOLO 之父Joseph Redmon宣布推出CV界，引起轩然大波，大家纷纷猜测YOLO是否不会再出v4版，而四月份，YOLOv4重磅发布，作者为俄罗斯开发者 Alexey Bochkovskiy 和两位中国台湾开发者 Chien-Yao Wang、Hong-Yuan Mark Liao。YOLOv4没有理论创新，而是在原有YOLO目标检测架构的基础上增加了近年CNN改进的众多技术，从数据处理到网络训练再到损失函数，遵行“拿来主义”，加上漂亮的工程实践，打造实现最佳速度与精度平衡的目标检测新基准！
在MS COCO 数据集 实现 43.5% AP (65.7% AP50 )， 速度也更快了，在Tesla V100 GPU上 ∼65 FPS！

[code](https://github.com/AlexeyAB/darknet)

[paper](https://arxiv.org/pdf/2004.10934.pdf)

## 论文解读

待更新
https://mp.weixin.qq.com/s/3vdhQ5wsacxuvmpQ4Jl5pw
## 在windows环境下使用Cmake-GUI编译yolov4

在linux中编译yolo比较简单，只需要配置好cuda和cudnn之后通过makefile直接编译就可以，但是在windows平台下编译起来比较麻烦，并且可能会遇到各种各样奇妙的bug，这里使用官方推荐的cmake-gui的方式来进行编译，相对比较方便。

### 工具

- cuda、cudnn：在nvidia官网下载，cuda版本10.0以上,对应的cudnn也可以在官网查，通过nvidia-smi,nvcc -V可以验证安装
- opencv：4.2以上，注意这里使用的是直接安装，非源码编译。
- Cmake-GUI：官网下载安装即可

### 编译
- 1.进入darknet的目录，打开cmake-gui
- 2.设置好源码目录和生成目录后，依次点击依次点击配置（configure）、生成(generate)和打开项目(open project)<br/>

::: tip 错误日记

如果你跟我一样电脑同时有源码编译和直接安装两个版本opencv，需要在configure时指定直接安装的opencv目录，其次可能会出现错误

```
but it set OpenCV_FOUND to FALSE so package "OpenCV" is considered to be NOT FOUND.
```

原因据csdn上描述是版本检测问题，可opencv->build中找到OpenCVConfig.cmake,在OpenCVConfig.cmake的最后加一句
```
set(OpenCV_FOUND 1)  
```
应该是因为里面有错误检查， set(OpenCV_FOUND 1)貌似就是忽略错误的意思,我设置之后可以正常编译

:::

- 3.点击打开文件后会在vs打开，选择release模式依次右键生成all_build以及install，生成成功之后你就可以在darknet目录下看到darknet.exe了（可能也需要配置opencv的环境，但是我没有遇到error），至此就可以使用作者的源码以及模型进行识别了。

::: tip 参考链接

https://blog.csdn.net/Discoverhfub/article/details/79951480

https://blog.csdn.net/ECHOSON/article/details/105862074

[YOLOv4简读](https://mp.weixin.qq.com/s?__biz=MzUzODkxNzQzMw==&mid=2247484251&idx=1&sn=ae336111261f1a92a015a41a08f9eb80&scene=21#wechat_redirect)

[yolov4训练自己的数据模型](https://blog.csdn.net/yapifeitu/article/details/105749693)

:::