---
title: 使用git上传本地文件到github仓库
date: 2021-05-25 16:37:13
categories:
- git命令
tags:
- 学习
---

## 安装git 

官网下载安装[https://git-scm.com/](https://git-scm.com/)

## 本地文件上传到github仓库
1、接下来在本地创建一个文件夹，

2、把github上面的仓库克隆到本地
```
   git clone  https://github.com/xxxxx.git（自己仓库地址）
```
3、把需要上传的文件拷贝到刚下载的新文件夹内

4、git查看远程仓库地址

```
   git remote -v 
```

5、接下来依次输入以下代码即可完成其他剩余操作：
```
   git add . （注：别忘记后面的 .  注意git 目录）

   git commit -m “提交信息” （注：“提交信息”里面换成你需要，如“first commit”）

   git push -u origin master （注：此操作目的是把本地仓库push到github上面，此步骤需要你输入帐号和密码）
```
## github 访问 下载 上传 慢的issue

- 修改本地host文件
   路径：`C:\Windows\System32\drivers\etc` 在文件中添加ip
   通过访问 [https://www.ipaddress.com/](https://www.ipaddress.com/)
   这个网站来获取当前网络github最新的ip地址。

   我找好久也不行网上复制的如下IP 速度还可以

```
140.82.114.4	github.com
199.232.5.194	github.global.ssl.fastly.net
```

- 刷新Dns

cmd运行 `ipconfig /flushdns`

