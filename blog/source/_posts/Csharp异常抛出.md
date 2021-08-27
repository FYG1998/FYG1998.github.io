---
layout: C#中try catch finally
title: Csharp异常抛出
date: 2021-07-08 22:03:23
categories:
- C#
tags:
- 学习
---

***
## C#中try catch finally
  try-catch 块的用途是捕获并处理工作代码产生的异常。 某些异常可以在 catch 块中进行处理，问题得以解决并不再出现异常；但是，大多数情况下你唯一可做的是确保引发的异常是合理异常。
  - 将预见可能引发异常的代码包含在try语句块中。 
  - 如果发生了异常，则转入catch的执行。
  - finally可以没有。无论有没有发生异常，它总会在这个异常处理结构的最后运行。即使你在try块内用return返回了，在返回前，finally总是要执行，这以便让你有机会能够在异常处理最后做一些清理工作。如关闭数据库连接等等。

```
       public bool mTasktimer = true;
      
        private void TaskTimer_One(object sender, System.Timers.ElapsedEventArgs e)
        {
            lock (new object())   //加锁执行下面代码块，执行完让线程休眠5秒钟
            {
                if (mTasktimer)
                {
                    
                    try
                    {
                        mTasktimer = false;

                        logNet4("TaskTimer_Elapsed------try"); //输出日志

                    }
                    catch (Exception ex)
                    {
                        logNet4($"程序出现异常，错误原因是{ex.Message}");

                        logNet4("TaskTimer_Elapsed------try---Exception");  //输出日志
                    }
                    finally
                    {

                        mTasktimer = true;
                        Thread.Sleep(5000);

                        logNet4("TaskTimer_Elapsed------try---finally");  //输出日志
                        
                    }
                }
            }
        }

    //     lock语句：

    //     lock 语句获取给定对象的互斥 lock，执行语句块，然后释放 lock。 持有 lock 时，持有 lock 的线程可以再次获取并释放 lock。 阻止任何其他线程获取 lock 并等待释放 lock。


    //     C#中try catch finally 用法：
    //     try-catch 块的用途是捕获并处理工作代码产生的异常。 某些异常可以在 catch 块中进行处理，问题得以解决并不再出现异常；但是，大多数情况下你唯一可做的是确保引发的异常是合理异常。

    //    1、将预见可能引发异常的代码包含在try语句块中。 2、如果发生了异常，则转入catch的执行。3.finally可以没有。无论有没有发生异常，它总会在这个异常处理结构的最后运行。即使你在try块内用return返回了，在返回前，finally总是要执行，这以便让你有机会能够在异常处理最后做一些清理工作。如关闭数据库连接等等。

```