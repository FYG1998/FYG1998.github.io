---
title: C#程序只允许运行一个实例
date: 2021-05-27 14:01:49
categories:
- C#
tags:
- 学习
---
***
## C#程序只允许运行一个实例

 互斥进程(程序), 简单点说,就是在系统中只能有该程序的一个实例运行.

 使用线程互斥变量. 通过定义互斥变量来判断是否已运行实例.C#实现如下:
 ```
        System.Threading.Mutex mutex;

         private void CheckExe()
        {
            bool ret;

            //ElectronicNeedleTherapySystem互斥体名称随便定义
            mutex = new System.Threading.Mutex(true, "ElectronicNeedleTherapySystem", out ret);  
            if (!ret)
            {
                MessageBox.Show("已有一个程序实例运行，请勿重新运行");
                Environment.Exit(0);
            }
        }

 ```
 程序中通过语句:
 
 `System.Threading.Mutex mutex = new System.Threading.Mutex(true, "ElectronicNeedleTherapySystem", out ret)`

来申明一个互斥体变量`mutex`,其中`ElectronicNeedleTherapySystem`为互斥体名,布尔变量`ret`用来保存是否已经运行了该程序事例.