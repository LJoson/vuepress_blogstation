---
title: tensorflow2.0学习笔记
date: 2020-07-7 12:41:12
sidebar: true
sidebarDepth: 5
tags: 
- 机器学习
- 深度学习
categories:
- "AI及大数据类"
isShowComments: true
---

[[toc]]
# 引言
虽然之前有过相关知识学习及项目的部署经验，却都是碎片化知识，而对于原理上并没有太多的理解认识。在一个大创项目的机会下开始系统的学习相关内容。总的计划是tf入手，paddle为辅，后面会以C++为主学习实现李航博士《统计学习方法》，《算法导论》，《西瓜书》，花书以及其他入门书籍的相关算法和网络结构。


## 环境
- win10
- anaconda
- pycharm

新手必备，至于tf版本是cpu还是gpu，如果电脑驱动支持cudnn和cuda就优先gpu版本。[更多详细安装](https://blog.csdn.net/qq_43743037/article/details/104242758)


## 入门

```python
import tensorflow as tf
#载入并准备好 MNIST 数据集。将样本从整数转换为浮点数：
mnist = tf.keras.datasets.mnist

(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
#将模型的各层堆叠起来，以搭建 tf.keras.Sequential 模型。为训练选择优化器和损失函数：
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
#训练并验证模型：
model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)

```