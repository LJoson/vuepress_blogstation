---
title: Python错误及解决集合
date: 2021-02-07 23:00:12
sidebar: true
sidebarDepth: 5
tags: 
- Python
categories:
- "笔记类"
isShowComments: true
---
[[toc]]

# 引言
学习Python总会不可避免的出现一些error，因此做一个解决error的集合，方便查阅。

## error："no encoding declared （没有编码声明）的"解决方法

问题抛出：

```
SyntaxError: Non-ASCII character '\xe8' in file C:/Users/ME/Desktop/Python project/����/request�Ļ����÷�.py on line 8, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

环境是python2无法通过，python3就可以通过。

写代码时往往喜欢注释，而且使用的是中文
```
#params 这个参数是用来构造链接的
```
如果要在python2的py文件里面写中文，则必须要添加一行声明文件编码的注释，否则python2会默认使用ASCII编码。

因此我们必须要在第一行里将编码转换过来，第一行，必须是第一行。因为python是一种解释性语言，从上往下开始解释代码。

可以使用
```
# -*- coding:utf-8 -*- 
```
也可以这样
```
#coding=utf-8  
```
## UnicodeDecodeError: 'gbk' codec can't decode byte 0x93 in position 596: illegal multibyte sequence

使用python读取文件时，需要注意一下编码格式，类似此种错误，可能是要处理的字符串本身不是gbk编码，但是却以gbk编码去解码，所以解决思路就是确定一下编码格式。例如加入如下编码解码格式。
```
encoding='UTF-8'

```