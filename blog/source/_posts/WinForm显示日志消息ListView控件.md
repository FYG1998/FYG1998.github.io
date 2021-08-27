---
title: WinForm显示日志消息ListView控件
date: 2021-08-05 19:22:17
categories:
- C#
tags:
- 学习
---

WinForm显示日志消息ListView控件
ListView控件 View选择Details，添加列，列宽度调大(这列是显示消息用的)
 <img  src="https://naiop.github.io/blog/public/images/listView_img1.png"  />
 <img  src="https://naiop.github.io/blog/public/images/listView_img2.png"  />
 
源码：
```
ShowLog("消息1111111", "Msg", Color.Green);
ShowLog("消息2222222", "Msg", Color.Blue);
ShowLog("消息3333333", "Msg", Color.Red);
ShowLog("消息4444444", "Msg", Color.Yellow);
```
```
public void ShowLog(string strLog, string type, Color color)
{
    ListView lv = null;
    if (type == "Msg")
        lv = listView1;
    else
    {
        //log.txt
    }
    if (lv != null)
    {
        lv.Invoke((MethodInvoker)delegate
        {
            string strLogTmp = strLog.Insert(0, DateTime.Now.ToString() + " ");
            if (lv.Items.Count > 100)
            {
                lv.Items.RemoveAt(lv.Items.Count - 1);
            }
            if (strLogTmp.Length > lv.Columns[0].Width) //lv.Columns[0].Width ：lsitView 第一列的宽度
                lv.Columns[0].AutoResize(ColumnHeaderAutoResizeStyle.ColumnContent);
            ListViewItem objLVI = lv.Items.Insert(0, strLogTmp);
            lv.TopItem = objLVI;
            objLVI.ForeColor = color;
        });
    }
}
```

运行效果
<img  src="https://naiop.github.io/blog/public/images/listView_img3.png"  />

