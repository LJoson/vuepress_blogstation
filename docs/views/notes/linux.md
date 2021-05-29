---
title: Linux常用命令实录
date: 2021-05-15 22:11:12
sidebar: true
sidebarDepth: 5
tags: 
- 文档笔记
categories:
- "笔记类"
isShowComments: true
---
# 引言
Linux系统使用的过程中常用命令实录，多为Ubuntu下的命令，注意文件夹与文件的区别，相对路径与绝对路径的区别。
不断更新之中

- Linux 查看文件大小常用命令

1. 使用stat命令查看

stat命令一般用于查看文件的状态信息。stat命令的输出信息比ls命令的输出信息要更详细。

stat命令 - display file or file system status<br>
显示文件状态信息：stat <file name><br>
显示文件在系统的状态信息：stat -f <file name><br>
简明显示文件的状态信息：stat -t <file name><br>
2. 使用wc命令

wc命令一般用于统计文件的信息，比如文本的行数，文件所占的字节数。

3. 使用du命令

du命令一般用于统计文件和目录所占用的空间大小。

5. 使用ls命令

ls 命令一般用于查看文件和目录的信息，包括文件和目录权限、拥有者、所对应的组、文件大小、修改时间、文件对应的路径等等信息。<br>
ls命令 - list directory contents<br>
显示文件详细信息：ls -l <file name><br>

6. file命令 — determine file type

determine file type ：file <file name><br>
output MIME type strings (--mime-type and --mime-encoding) ：file -i <file name><br>
