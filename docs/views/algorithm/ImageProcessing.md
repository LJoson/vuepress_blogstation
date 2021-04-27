---
title: Image Processing
date: 2020-03-24 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 图像处理
categories:
- "算法类"
isShowComments: true
---

[[toc]]

# 引言

- 此学习是基于gitnub上一个[Image Processing 100 Questions](https://github.com/KuKuXia/Image_Processing_100_Questions),有日语等三个版本，这是英文版，讨论的是结合opencv进行图像处理问题，有python和c++，文章以c++为主。
- Image Processing指的是计算机等处理图像的一种技术，所以首先要知道图像在计算机中的存储方式。图像文件格式是记录和存储影像信息的格式。对数字图像进行存储、处理、传播，必须采用一定的图像格式，也就是把图像的像素按照一定的方式进行组织和存储，把图像数据存储成文件就得到图像文件。而图像以一个二维数组形式存储，要访问其像素点，可看如图(RGB图像中每个点（像素）由3个byte表示（红，绿，蓝或R,G,B三分量）)

![](/img/algorithm/image.png)

上图展示了图片在计算机中的二维存储坐标系，图片的高度对应y轴和行数，而宽度对应了x轴及列数，因此一张宽度为640像素，高度为480像素分辨率的灰度图就可以表示为：
```
unsigned char image[480][640]

```
根据这种定义方式,如果我们讨论一个位于 x, y 处的像素,那么它在程序中的访问方式应该是：
```
unsigned char pixel = image[y][x];

```
- 而在我学习图形化游戏编程时，遇到一个graphic(图形)的概念，非常有趣，我觉得[计算机中的图形（Graphic）和图像（Image）](https://blog.csdn.net/xingfuyusheng/article/details/81564038)这篇文章为我们展现了相关概念。

## 1.通道交换

将计算机中图像的 RGB 通道替换成 BGR 通道。（R:red,G:green,B:blue)
以red通道为例，
```cpp
//导入opencv库
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>

int main(int argc, const char* argv[]){
  cv::Mat img = cv::imread("path", cv::IMREAD_COLOR);//运用opencv读取图像，以BGR存储，path为计算机中图片的绝对路径或者相对路径

  int height = img.rows;//高为行数
  int width = img.cols;//宽为列数

  cv::Mat out = img.clone(); //复制定义一个图像

  for (int y=0; y<height; y++){
    for (int x=0; x<width; x++){
      unsigned char tmp = out.at<cv::Vec3b>(y, x)[0];//定义第三个参数，并把B通道赋值
      out.at<cv::Vec3b>(y,x)[0] = img.at<cv::Vec3b>(y,x)[2];//把R通道赋值给B通道
      out.at<cv::Vec3b>(y,x)[2] = tmp;//把B通道赋值给R通道
    }
  }

  //cv::imwrite("out.jpg", out);
  cv::imshow("sample", out);
  cv::waitKey(0);//窗口悬浮
  cv::destroyAllWindows();//释放内存空间

  return 0;

}

```


::: tip cv::Vec3b

 - vector(向量): C++中的一种数据结构,确切的说是一个类.它相当于一个动态的数组,当程序员无法知道自己需要的数组的规模多大时,用其来解决问题可以达到最大节约空间的目的.<br/>
 - 比如Vec<uchar, 3>：
 其实这句就是定义一个uchar类型的数组，长度为3而已，例如 8U 类型的 RGB 彩色图像可以使用 <Vec3b>，<br/>
 3 通道 float 类型的矩阵可以使用 <Vec3f>。<br/>
 对于 Vec 对象，可以使用[]符号如操作数组般读写其元素，如：Vec3b color; 用 color 变量描述一种 RGB 颜色<br/>
 color[0]=255; //0通道的B 分量<br/>
 color[1]=0; //1通道的G 分量<br/>
 color[2]=0; //2通道的R 分量<br/>
- opencv中RGB彩图通道顺序为BGR，从[0]~[1]~[2]<br/>

:::



::: tip .at
 - cv::mat的成员函数： .at(int y， int x)可以用来存取图像中对应坐标为（x，y）的元素坐标。
:::


:::  tip 读写像素

一个RGB像素点的像素值：<br/>
Vec3f intensity  = Mat.at<Vec3f>(y,x) <br/>
float blue = intensity.val[0]   //获得蓝色通道的像素值<br/>
float green = intensity.val[1]   //获得绿色通道的像素值<br/>
float red = intensity.val[2]      //获得红色通道的像素值<br/>
整型：<br/>
int b = srcImage.at<Vec3b>(row, col)[0];  //获取像素值b <br/>
int g = srcImage.at<Vec3b>(row, col)[1];  //获取像素值g<br/>
int r = srcImage.at<Vec3b>(row, col)[2];  //获取像素值r<br/>

:::

## 2. 灰度化（Grayscale）

将图像灰度化！灰度是一种图像亮度的表示方法，通过下式计算：

Y = 0.2126 R + 0.7152 G + 0.0722 B

```cpp

#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>

int main(int argc, const char* argv[]){
  cv::Mat img = cv::imread("path", cv::IMREAD_COLOR)//cv::IMREAD_COLOR默认本身彩图格式读取

  int height = img.rows;
  int width = img.cols;

  cv::Mat out = cv::Mat::zeros(height, width, CV_8UC1); //定义相同分辨率的单通道矩阵
  
  for (int y=0; y<height; y++){
    for (int x=0; x<width; x++){
      out.at<uchar>(y, x) = (int)((float)img.at<cv::Vec3b>(y,x)[0] * 0.0722 + \
				  (float)img.at<cv::Vec3b>(y,x)[1] * 0.7152 + \
				  (float)img.at<cv::Vec3b>(y,x)[2] * 0.2126);  //公式
    }
  }
  
  //cv::imwrite("out.jpg", out);
  cv::imshow("answer", out);
  cv::waitKey(0);
  cv::destroyAllWindows();//释放内存

  return 0;

}

```

::: tip CV_8UC1

矩阵数据类型:<br/>
– CV_<bit_depth>(S|U|F)C<number_of_channels><br/>
S = 符号整型 U = 无符号整型 F = 浮点型<br/>

CV_8UC1 是指一个8位无符号整型单通道矩阵<br/>
CV_32FC2是指一个32位浮点型双通道矩阵<br/>
CV_8UC1 CV_8SC1 CV_16U C1 CV_16SC1<br/>
CV_8UC2 CV_8SC2 CV_16UC2 CV_16SC2<br/>
CV_8UC3 CV_8SC3 CV_16UC3 CV_16SC3<br/>
CV_8UC4 CV_8SC4 CV_16UC4 CV_16SC4<br/>
CV_32SC1 CV_32FC1 CV_64FC1<br/>
CV_32SC2 CV_32FC2 CV_64FC2<br/>
CV_32SC3 CV_32FC3 CV_64FC3<br/>
CV_32SC4 CV_32FC4 CV_64FC4<br/>

其中，通道表示每个点能存放多少个数，类似于RGB彩色图中的每个像素点有三个值，即三通道的。<br/>
图片中的深度表示每个值由多少位来存储，是一个精度问题，一般图片是8bit（位）的，则深度是8.<br/>

:::