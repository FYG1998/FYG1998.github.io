---
title: WebApi的创建和简单实现
date: 2021-08-05 19:22:53
categories:
- C# 
tags:
- 学习
---

WebApi的创建和简单实现
### WebApi
对接各种客户端（浏览器，移动设备），构建http服务的框架
部署在IIS中给外部应用提供数据，方便管理可控前后端分离
#### 创建WebApi
开发环境：vs2019.
 创建项目
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img1.png"  />

点击创建
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img2.png"  />

选择Web API 创建
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img3.png"  />

点击运行可以看到默认已经创建了几个API 接口
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img4.png"  />

#### 按需求创建API
1创建实体类
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img5.png"  />

2创建控制器
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img6.png"  />

<img  src="https://naiop.github.io/blog/public/images/WebAPI_img7.png"  />

代码
```
public class testController : ApiController
{
    entity[] contacts = new entity[] {
            new entity(){ id=10001,name="设备1",  status="1",  explain="1开启0关闭"},
            new entity(){ id=10002,name="设备2",  status="1",  explain="1开启0关闭"},
            new entity(){ id=10003,name="设备3",  status="1",  explain="1开启0关闭"},
            new entity(){ id=10004,name="设备4",  status="0",  explain="1开启0关闭"}
        };

    public IEnumerable<entity> GetListAll()
    {
        return contacts;
    }

    public entity PostContactByID(int id)
    {
        entity entity = contacts.FirstOrDefault<entity>(item => item.id == id);
        if (entity == null)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }
        return entity;
    }
}
```

运行程序  用postman 请求就可以看到返回的值
<img  src="https://naiop.github.io/blog/public/images/WebAPI_img8.png"  />

<img  src="https://naiop.github.io/blog/public/images/WebAPI_img9.png"  />

到这简单的 一个webApi 就成功了
