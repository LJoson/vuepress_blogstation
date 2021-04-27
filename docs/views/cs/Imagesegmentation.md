---
title: 图像分割（Imagesegmentation）
date: 2020-05-23 20:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 图像处理
- 计算机视觉
categories:
- "算法类"
- "计算机技术类"
isShowComments: true
---

[[toc]]

# 引言

图像分割，作为计算机视觉的基础，是图像理解的重要组成部分，也是图像处理的难点之一。<br/>
## 为什么要用到图像分割？
我们都知道每个图像都是有一组像素值组成。简单来说，图像分割就是在像素级上，对图像进行分类的任务。<br/>

图像分割中使用的一些“独门秘技”，使它可以处理一些关键的计算机视觉任务。主要分为2类：

- 语义分割：就是把图像中每个像素赋予一个类别标签，用不同的颜色来表示。

- 实例分割：它不需要对每个像素进行标记，它只需要找到感兴趣物体的边缘轮廓就行。

它的身影也经常会出现在比较重要的场景中：

- 无人驾驶汽车视觉系统，可以有效的理解道路场景。

- 医疗图像分割，可以帮助医生进行诊断测试。

- 卫星图像分析，等等。

而在python中有一个库PixelLib，PixelLib这个库可以非常简单的实现图像分割——5行代码就可以实现语义分割和实例分割。后面会对其原理以及结构进行剖析。

## python实现
::: tip 环境工具

TensorFlow

Pillow

OpenCV-Python

scikit-image

PixelLib

:::

[xception模型下载地址](https://github.com/bonlime/keras-deeplab-v3-plus/releases/download/1.1/deeplabv3_xception_tf_dim_ordering_tf_kernels.h5)

[Mask RCNN模型下载地址](https://github.com/matterport/Mask_RCNN/releases/download/v2.0/mask_rcnn_coco.h5)

### 语义分割:

```python
'''
@Semantic_segmentation
@opencv
'''
import pixellib
from pixellib.semantic import semantic_segmentation
import time
import cv2
segment_image = semantic_segmentation()
segment_image.load_pascalvoc_model('deeplabv3_xception_tf_dim_ordering_tf_kernels.h5')
start = time.time()
#segment_image.segmentAsPascalvoc('./Images/resize2.jpg', output_image_name= 'image_new.jpg',overlay= True) #调用函数
segmap, segoverlay = segment_image.segmentAsPascalvoc("./Images/resize2.jpg", overlay= True)
cv2.imwrite("img.jpg", segoverlay)
end = time.time()
time = end-start
print("Inference Time: ",'%.2f'%time,'seconds')
cv2.namedWindow("img.jpg",0)
cv2.imshow("img.jpg", segoverlay)
cv2.waitKey(0)
cv2.destroyAllWindows()
print(segoverlay.shape)


```
### 实例分割：
- 虽然语义分割的结果看起来还不错，但在图像分割的某些特定任务上，可能就不太理想。

在语义分割中，相同类别的对象被赋予相同的colormap，因此语义分割可能无法提供特别充分的图像信息。

```python

'''
@case_segmentation
@opencv
'''

import pixellib
from pixellib.instance import instance_segmentation
import cv2
import time
instance_seg = instance_segmentation()
instance_seg.load_model("mask_rcnn_coco.h5")
start1 = time.time()
#segment_image.segmentImage("./Images/sample2.jpg", output_image_name= "image_new1.jpg", show_bboxes= True)   #调用函数
segmask, output = instance_seg.segmentImage("./Images/sample2.jpg", show_bboxes= True)
cv2.imwrite("img1.jpg", output)
end1 = time.time()
time1 = end1-start1
print("Inference Time: ",'%.2f'%time1,'seconds')
cv2.namedWindow("img1.jpg",0)
cv2.imshow("img1.jpg", output)
cv2.waitKey(0)
cv2.destroyAllWindows()
print(output.shape)


```

:::tip 参考链接

https://github.com/ayoolaolafenwa/PixelLib

https://mp.weixin.qq.com/s/z5GPOr7-cz99p_nWOzkrfg

:::

## 结语

接下来会对Deeplabv3+框架，以及在pascalvoc上预训练的Xception模型，以及框架Mask RCNN进行原理上的剖析，并基于<br/>
c++以及paddle进行图像分割上的复现。

- 参考文献:<br/>

[Bonlime, Keras implementation of Deeplab v3+ with pretrained weights](https://github.com/bonlime/keras-deeplab-v3-plus)

[Liang-Chieh Chen. et al, Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation](https://arxiv.org/abs/1802.02611)

[Matterport, Mask R-CNN for object detection and instance segmentation on Keras and TensorFlow](https://github.com/matterport/Mask_RCNN)

[Kaiming He et al, Mask R-CNN](https://arxiv.org/abs/1703.06870)