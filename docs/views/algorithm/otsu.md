---
title: Image Processing 100 Questions之图像二值化
date: 2020-04-03 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 图像处理
categories:
- "算法类"
isShowComments: true
---

[[toc]]

# 图像二值化

## 二值化（Thresholding）

二值化是将图像使用黑和白两种值表示的方法，就是将图像上的像素点的灰度值设置为0或255，也就是将整个图像呈现出明显的黑白效果的过程。
（其中0是黑，255是白）。

```cpp

#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>

int main(int argc, const char* argv[]){
    cv::Mat img = cv::imread("imagepath", cv::IMREAD_COLOR);
    int height = img.rows;
    int width  = img.cols;

    int th = 128;//阈值，Threshold value

    cv::Mat out = cv::Mat::zeros(height, width, CV_8UC1);
    //灰度化
    for (int j=0; j<height; j++){
    for (int i=0; i<width; i++){
      uchar val = (int)((float)img.at<cv::Vec3b>(j,i)[0] * 0.0722 +	\
			(float)img.at<cv::Vec3b>(j,i)[1] * 0.7152 +	\
			(float)img.at<cv::Vec3b>(j,i)[2] * 0.2126);
      if (val < th)
	  {
		  val = 0;
      } 
	  else 
	  {
		  val = 255;
      }
      out.at<uchar>(j,i) = val;//通过跟阈值比较进行二值化
    }
  }
  
  //cv::imwrite("out.jpg", out);
  cv::imshow("answer", out);
  cv::waitKey(0);
  cv::destroyAllWindows();

  return 0;



}

```
::: tip 阈值

RGB三彩图需要先将图片灰度化，再对图像像素设置一个阈值进行二值化操作。<br/>
阈值，可以看作一个分界指，两边的像素（大于阈值或者小于阈值）赋值是0或者255.<br/>

:::
但是图片二值化过程中人工确定阈值往往效果不好。于是有了otsu,大津法二值化提出。

##  大津二值化算法（Otsu's Method）
大津法（OTSU）是一种图像灰度自适应的阈值分割算法，是1979年由日本学者大津提出，并由他的名字命名的。大津法按照图像上灰度值的分布，将图像分成背景和前景两部分看待，前景就是我们要按照阈值分割出来的部分。背景和前景的分界值就是我们要求出的阈值。遍历不同的阈值，计算不同阈值下对应的背景和前景之间的类内方差，当类内方差取得极大值时，此时对应的阈值就是大津法（OTSU算法）所求的阈值。
[来源](https://blog.csdn.net/dcrmg/article/details/52216622)

::: tip 算法描述

对于图像I(x,y)，前景(即目标，白色部分)和背景的分割阈值记作T，属于前景（大于阈值）的像素点数占整幅图像的比例记为ω0，其平均灰度μ0；<br/>
背景像素（小于阈值）点数占整幅图像的比例为ω1，其平均灰度为μ1。图像的总平均灰度记为μ1，类间方差记为g。<br/>

假设图像的背景较暗，并且图像的大小为M×N，图像中像素的灰度值大于阈值T的像素个数记作N0，像素灰度小于阈值T的像素个数记作N1，<br/>

则有：<br/>
    ω0=N0/ M×N    (1)  <br/>
    ω1=N1/ M×N    (2）<br/>
    N0+N1=M×N    (3)    <br/> 
    ω0+ω1=1　　　 (4)<br/>
    μ=ω0*μ0+ω1*μ1 (5)<br/>
    g=ω0(μ0-μ)^2+ω1(μ1-μ)^2 (6)<br/>

将式(5)代入式(6),得到等价公式:<br/>
    g=ω0ω1(μ0-μ1)^2   (7)　<br/>
这个就是类间方差的公式表述,采用遍历的方法得到使类间方差g最大的阈值T,即为所求。

:::
::: tip 实现思路

1. 计算0~255各灰阶对应的像素个数，保存至一个数组中，该数组下标是灰度值，保存内容是当前灰度值对应像素数
2. 计算背景图像的平均灰度、背景图像像素数所占比例
3. 计算前景图像的平均灰度、前景图像像素数所占比例
4. 遍历0~255各灰阶，计算并寻找类间方差极大值

:::

实现代码<br/>

```cpp
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>
#include <math.h>

int main(int argc, const char* argv[]) {
	cv::Mat img = cv::imread("imagepath", cv::IMREAD_COLOR);

	int height = img.rows;
	int width = img.cols;

	cv::Mat out = cv::Mat::zeros(height, width, CV_8UC1);

	// gray灰度化
	int val = 0;
	for (int j = 0; j < height; j++) {
		for (int i = 0; i < width; i++) {
			val = (int)((float)img.at<cv::Vec3b>(j, i)[0] * 0.0722 + \
				(float)img.at<cv::Vec3b>(j, i)[1] * 0.7152 + \
				(float)img.at<cv::Vec3b>(j, i)[2] * 0.2126);
			out.at<uchar>(j, i) = (uchar)val;
		}
	}

	// determine threshold
	double w0 = 0, w1 = 0;
	double N = 0, N1 = 0;
	double max_g = 0, g = 0;
	int th = 0;

	for (int T = 0; T < 255; T++)//遍历求阈值
	{
		w0 = 0;
		w1 = 0;
		N = 0;
		N1 = 0;
		for (int j = 0; j < height; j++)
		{
			for (int i = 0; i < width; i++)
			{
				val = (int)(out.at<uchar>(j, i));
				if (val > T) {
					w0++;
					N += val;
				}
				else {
					w1++;
					N1 += val;
				}
			}
		}

		N /= w0;//前景平均灰度
		N1 /= w1;//背景平均灰度
		w0 /= (height * width);//比例
		w1 /= (height * width);
		g = w0 * w1 * pow((N - N1), 2);//类间方差

		if (g > max_g) { //判断最大类间方差
			max_g = g;
			th = T;
		}

	}

	// binalization二值化
	for (int j = 0; j < height; j++)
	{
		for (int i = 0; i < width; i++)
		{
			val = (int)(out.at<uchar>(j, i));
			if (val < th)
			{
				val = 0;
			}
			else {
				val = 255;
			}
			out.at<uchar>(j, i) = (uchar)val;
		}
	}

	std::cout << "threshold >> " << th << std::endl;

	//cv::imwrite("out.jpg", out);
	cv::imshow("answer", out);
	cv::waitKey(0);
	cv::destroyAllWindows();

	return 0;

}
```


##  Kittle算法

Kittler算法与Otsu方法效果接近，但速度更快，更适宜应用于像素质量较高的图像中。<br/>
它的中心思想是，计算整幅图像的梯度灰度的平均值，以此平均值做为阈值。

::: tip 图像梯度

在微积分中，一维函数的一阶微分的基本定义是这样的：

![](/img/algorithm/kittle/1.png)

而图像是一个二维函数f(x,y)，其微分当然就是偏微分。因此有：

![](/img/algorithm/kittle/2.png)

图像是一个离散的二维函数，ϵ不能无限小，我们的图像是按照像素来离散的，最小的ϵ就是0像素。因此，上面的图像微分又变成了如下的形式（ϵ=1）：

![](/img/algorithm/kittle/3.png)

这分别是图像在(x, y)点处x方向和y方向上的梯度，从上面的表达式可以看出来，图像的梯度相当于2个相邻像素之间的差值.<br/>
我们先考虑下x方向，选取某个像素，假设其像素值是100，沿x方向的相邻像素分别是90,90,90，则根据上面的计算其x方向梯度分别是10,0,0，如图：

![](/img/algorithm/kittle/grad.jpg)


我们看到，相加后的新图像，原图像像素点100与90亮度只相差10，现在是110与90，亮度相差20了，对比度显然增强了，尤其是图像中物体的轮廓和边缘，与背景大大加强了区别，这就是用图像梯度来增强图像的原理。y方向同理,而x和y结合可以用如下式子表示在一起：

![](/img/algorithm/kittle/5.png)

由于计算量比较大，于是一般用绝对值来近似平方和平方根的操作，来降低计算量：

![](/img/algorithm/kittle/4.png)

:::

代码：

```cpp
/*该代码未必合理，主要是在梯度灰度平均值的计算原理上有偏差*/
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>
#include <math.h>

int main(int argc, const char* argv[]) {
	cv::Mat img = cv::imread("imori.jpg", cv::IMREAD_COLOR);

	int height = img.rows;
	int width = img.cols;

	cv::Mat out = cv::Mat::zeros(height, width, CV_8UC1);
	int tmp = 0;
	// gray
	int val = 0;
	for (int j = 0; j < height; j++) {
		for (int i = 0; i < width; i++) {
			val = (int)((float)img.at<cv::Vec3b>(j, i)[0] * 0.0722 + \
				(float)img.at<cv::Vec3b>(j, i)[1] * 0.7152 + \
				(float)img.at<cv::Vec3b>(j, i)[2] * 0.2126);
			out.at<uchar>(j, i) = (uchar)val;
			tmp += val;
		}
	}
	double grad = 0.0;
//梯度灰度计算
	for (int ii = 0; ii < height-1; ii++)
	{
		for (int jj = 0; jj < width - 1; jj++) 
		{
			
			double dx = out.at<uchar>(ii, jj + 1) - out.at<uchar>(ii, jj);
			double dy = out.at<uchar>(ii+ 1, jj) - out.at<uchar>(ii, jj);
			//double ds = std::sqrt((dx*dx + dy * dy) / 2);//求法有异议，看到部分资料没有除以二，有的部分有除以二
			double ds = abs(dx) + abs(dy);
			grad += ds;
		}

	}
	double imageAvG = grad + tmp;
	int th = imageAvG / (height*width);
	//二值化
	for (int j = 0; j < height; j++)
	{
		for (int i = 0; i < width; i++)
		{
			val = (int)(out.at<uchar>(j, i));
			if (val < th)
			{
				val = 0;
			}
			else {
				val = 255;
			}
			out.at<uchar>(j, i) = (uchar)val;
		}
	}

	std::cout << "threshold >> " << th << std::endl;
	
	//cv::imwrite("out.jpg", out);
	cv::imshow("answer", out);
	cv::waitKey(0);
	cv::destroyAllWindows();

	return 0;

}


```
[参考链接](https://blog.csdn.net/mutex86/article/details/9169303)