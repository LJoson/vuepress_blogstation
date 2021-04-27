---
title: 多尺度Retinex图像增强
date: 2020-06-30 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 图像处理
categories:
- "算法类"
isShowComments: true
---

[[toc]]

[工程代码](https://github.com/LJoson/Imageprocess/tree/master/Retinex)
# 引言

Land在1963年首次提出的这种 Retinex模型是以下面这几个基础理论为出发点的：首先，现实中的各种物体本身中是不存在颜色的，这是经过生物大脑皮层神经系统的处理后产生的主观印象，我们的视觉知觉是光线的照射与物体反射性质相互作用后出现的最终状态。其次，人眼中所获取到的所有颜色信息其实是由三种特定频率的波长决定的，色彩分别表现为红色、绿色和蓝色(即三原色)，这三种颜色可以构成可观察到的所有其他颜色。这也就是说Retinex算法的主要理论基础是光学三原色理论和颜色恒常性理论。相机拍摄图像与人眼直接观察场景的过程非常类似，所以研究者们希望利用颜色恒常性理论来处理图像，以达到像大脑处理复杂场景光照条件变化时能够得到的良好效果。和人眼不同，相机获取图像时场景的光照变化会对图像质量产生较大的影响，当场景中的光源照射照不充足时会引起具体细节在图像上的缺失，致使对比度下降等影响图片质量的问题。如果能够像大脑皮层处理场景信息一样消除光照变化带来的这些问题，就能够让图像更加真实生动的展现出场景信息。Retinex理论正是Land依据这种出发点，并基于颜色恒常性提出的。<br>
Retinex算法理论有两个经典算法：基于路径的Retinex以及基于中心环绕Retinex。由于基于中心围绕的Retinex图像增强算法的运算不会过于繁琐，又能够提供较好的处理效果，so这种算法成为了是目前备受关注和研究较为深入的一类Retinex算法。中心围绕Retine算法的中心思想是：像素的亮度的通过相关邻域之间的像素值加权进行估计的，其权值是由中心围绕函数计算确定的。在基于高斯核计算的中心围绕Retinex算法中，从最初非常经典且简练的单尺度Retinex（Single Scale Retinex，SSR）到后来的多尺度Retinex（Multi Scale Retinex，MSR）和带有色彩恢复的多尺度Retinex（Multi Scale Retinex with Color Restoration，MSRCR），到现在诸多研究人员根据色彩恢复还提出了许多其他的改进算法。

## Retinex算法分析

Retinex理论模型中，图像I(x,y)被分为了反射分量R(x,y)和入射分量L(x,y)两部分，分别表示物体的本质特征的信息和代表入射光照的亮度图像，图像中的光照分量决定了一幅图像光信号最大值和最小值的区间大小。原理模型如下图所示：

![](/img/algorithm/retinex/1.png)

从模型中可以看出，图像是通过两部分相互作用完成的，入射光线照射物体后物体所反射的信号进入人眼后，得到人类所看到的图像，即可以将这种图像形成的过程看作是光照分量与物体反射分量相乘，用公式可以表示为:

![](https://img-blog.csdnimg.cn/20190418103243208.png)

通常将上式取对数，将乘法转换为加法，就可以得到图像的各分量之间发关系：

![](https://img-blog.csdnimg.cn/20190418103337945.png)

因此，Retinex的图像增强方法可以根据估计图像中光照分量的计算方式的不同分为很多种，尽管很多改进算法在各个环节可能会有不同的方法，但算法的实质还是大体如下面的流程图：

![](https://img-blog.csdnimg.cn/20190418103943447.png)

## Retinex（SSR）

单尺度Retinex算法处理图像的过程和人眼获取场景信息的视觉成像过程非常类似。根据Retinex理论的假设可知：人眼所观察到的物体颜色并不是物体本身就存在的，而是由物体不同波长的反射能力来决定的。SSR实现的算法流程为：首先对图像进行数据准备，将其分解为三个通道分别对其进行处理，接着准备用于滤波的合适尺度大小取值的中心环绕函数，用该函数对各个通道的信息进行高斯滤波，得到图像中的光照分量，然后在对数域中减去光照分量，得到表示物体实际反射性质的分量，最后将三通道数据进行合并就得到了单尺度Retinex增强图像。其具体表达式如下：

![](https://img-blog.csdnimg.cn/20190418104222972.png)
      
其中， *表示卷积运算， i表示第 i个颜色通道，I(x,y) 是原始图像，r(x,y)、R(x,y)表示反射分量，G(x,y) 为高斯环绕函数，具体表达式为：

![](https://img-blog.csdnimg.cn/2019041810430079.png)

其中δ为高斯环绕函数的尺度参数(即尺度值)，这个参数决定了中心围绕函数进行卷积运算时的邻域大小，即高斯滤波中的标准差的大小。这个参数直接影响着SSR处理效果的好坏，δ的取值越小，SSR的动态压缩能力就越强，但是色彩保真度相应变差，会在局部出现色彩失真的现象；反之，δ越大的话，SSR的颜色保真度就会越高，动态范围压缩相应减弱。SSR算法一般都是在动态范围压缩和色彩恢复能力之间进行取舍。而最佳的高斯函数应是：

![](/img/algorithm/retinex/2.jpg)

虽然SSR在图像增强方面的应用非常广泛，优势明显，但也存在一些不足之处：利用单尺度Retinex算法对图像进行处理以后，图像整体的亮度相比于原图有大幅度提高，对于原图整体亮度非常低而导致细节缺失的图像来说，这种处理对图像增强来说非常有效，但是对于不是这么极端的图像而言，处理之后的图像整体就会显得过于明亮。另外这种明亮程度的过高也会影响到图像的对比度，会出现整体偏白甚至偏灰的情况。Retinex算法首先是将分量转换到对数域中进行运算的，这种变换虽然在局部和人眼视觉的光线知觉十分相近，但是范围有限，也会出现一些失真的现象。比如：

![](/img/algorithm/retinex/3.jpg)

![](/img/algorithm/retinex/4.jpg)

### ssr算法实现步骤
单尺度Retinex算法的实现步骤：
- 将图像分解为RGB三通道分量，并进行对数变换，以及统计相关图像信息（信息熵，均值，方差），进行评估
- 构建高斯环绕函数，将各通道的灰度图像分别与高斯环绕函数卷积，得到三通道的照度估计图像
- 在对数域用原图像减去照度估计分量，改变高斯卷积尺度参数δ的大小，查看不同尺度值得到反射分量不同。
- 将得到的反射分量的结果线性拉伸或者指数变换，转化为图像输出的数据类型。
- 将得到的三通道的反射分量图像合并为一幅图像得到SSR增强图像。

## 多尺度Retinex（MSR）

SSR算法在动态范围压缩和色调恢复的两种效果中，只能以牺牲一种功能为代价来改进另一个，因此Jobson等一批研究者们针对单尺度Retinex模型中存在的不足，提出了将不同尺度下的增强结果线性地组合在一起，充分将局部信息和整体信息考虑进去的多尺度Retinex算法。这种算法的主要思想就是结合几种不同的尺度的中心围绕函数通过加权平均以后来估计光照分量。MSR算法可以产生同时拥有良好动态范围压缩、色彩稳定性以及良好色调恢复的单一输出图像。MSR算法的公式为：

![](https://img-blog.csdnimg.cn/20190418104808637.png)	  	

其中， N表示尺度个数， N=1时即为SSR，为保证MSR算法同时具有高尺度和低尺度所具有的优点，一般将N的取值选为3，用三个不同尺度的高斯滤波器对原始图像进行滤波处理时效果较好。 Wк是第k个尺度在进行加权时的加权系数，需要满足

![](https://img-blog.csdnimg.cn/20190418104904595.png)

通常取W1=W2=W3=1/3 ，经过实验发现，当取平均时，能适用于大量的低照度图像，且运算简单。最后Fk(x,y)是在第 k 个尺度上的高斯滤波函数，即

![](https://img-blog.csdnimg.cn/20190418105003523.png)

通过实验证明了多尺度的 Retinex在颜色保持和细节突出等方面比单尺度的SSR要好很多，但是一般情况下尺度数选择为3，所以一次 MSR 等同于三次的 SSR ，而三个尺度值比例在15：80：250比较合适。

### MSR(多尺度Retienx增强算法)的实现步骤：
MSR的实现步骤中除了第二步中用三个尺度参数分别构成三个高斯环绕函数，以及三个高斯环绕函数分别与三通道进行卷积，并加权平均得到各通道照度分量外，其他步骤与SSR算法步骤相同

## 带色彩恢复的多尺度Retinex（MSRCR）

由于单尺度Retinex既具有动态范围压缩的能力，也可以实现大面积的色调恢复，但二者不能同时实现。Jobson等人为了弥补MSR算法的缺陷提出了带有色彩恢复的多尺度Retinex算法（MSRCR）。这种算法将两种Retinex结合了起来，即低尺度retinex的动态范围压缩，以及高尺度retinex的色调恢复。这种色彩恢复对于克服MSR在包含违反灰度世界的场景的色彩恢复时的问题是必要的。它合并了所有的必要因素，以相当自动化和相当简单的计算来逼近人类视觉的性能。MSRCR的公式表示如下：

![](https://img-blog.csdnimg.cn/20190418161344649.png)

其中

![](https://img-blog.csdnimg.cn/20190418161222359.png)

指的是第i个色彩通道的色彩恢复函数（CRF），用来调节三个通道颜色在图像中所占的比例。Jobson等人通过几种不同的色彩恢复函数在实验场景上进行处理，函数包含线性和非线性两种，通过对比实验发现能够提供最佳整体色彩还原的函数形式为

![](https://img-blog.csdnimg.cn/20190418161222359.png)
	  
其中，β是增益常数，α的取值大小控制着非线性的强度。其中β=46，α=125时为经验参数，MSRCR可以提供必要的颜色恢复，从而把相对较暗区域而无法观察到的信息图像细节展现出来，消除了MSR输出中明显的颜色失真和灰色区域。可以为大多数图像提供良好的效果。比如

![](/img/algorithm/retinex/5.jpg)

![](/img/algorithm/retinex/6.jpg)

### MSRCR(带色彩恢复的多尺度Retinex算法)的实现步骤：
- 按照MSR算法实现步骤得到三个通道的MSR增强分量。
- 按照式2.23的Ci(x,y)得到各通道的色彩恢复函数CRF。
- 将色彩恢复函数CRF与MSR增强函数相乘，并按照式2.24的ri得到最终三通道的图像增强分量。
- 将三个图像增强分量合并得到MSRCR增强图像。


## MSRCP
 
对于一些原始图像HUE较为合理的图，如果用经典的MSRCR算法，会导致处理后的图容易偏色，上述论文提出了对图像的Intensity数据进行Retinex处理，然后再把数据根据原始的RGB的比例映射到每个通道，这样就能在保留原始颜色分布的基础上增强图像，文章中称其为MSRCP。

### 实现步骤

![](https://img-blog.csdn.net/20180722161553568?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x6MDQ5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

:::tip 参考资料
http://www.ipol.im/pub/art/2014/107/?utm_source=doi

https://ieeexplore.ieee.org/document/6113573

https://blog.csdn.net/lilingyu520/article/details/46755767?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.nonecase

https://blog.csdn.net/lz0499/article/details/81154937?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5.channel_param

https://blog.csdn.net/ajianyingxiaoqinghan/article/details/71435098

https://blog.csdn.net/PPLLO_o/article/details/89375445

https://blog.csdn.net/Gordon_Wei/article/details/102173309?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase

https://blog.csdn.net/yayan01/article/details/50129391

https://blog.csdn.net/bluecol/article/details/45675615?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-7.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-7.channel_param

https://github.com/ShadowCoo/The-Retinex-algorithm-based-Lab-Color-Space
:::

