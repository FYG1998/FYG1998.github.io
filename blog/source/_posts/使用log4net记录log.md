---
title: 使用log4net记录log
date: 2021-08-05 19:00:18
categories:
- C#
tags:
- 学习
---

winform项目中使用log4net

#### 安装log4net
  项目 - 管理Nuget程序包，在浏览框中输入 log4net - 回车 - 选择 log4net - 安装。
 <img  src="https://naiop.github.io/blog/public/images/log4net_img1.png"  />

#### 添加log4net.config
  在工程目录下添加log4net.config文件, `设置log4net.config的文件属性`，自动把log4net.config的内容复制到.exe文件所在的目录
 <img  src="https://naiop.github.io/blog/public/images/log4net_img2.png"  />


 log4net.config源码

<?xml version="1.0" encoding="utf-8" ?>
 ```
<configuration>
	<configSections>
		<section name="log4net" type="System.Configuration.IgnoreSectionHandler" />
	</configSections>
	<!--log4net配置文件-->
	<log4net>
		<root>
			<level value="ALL"/>
			<appender-ref ref="InfoAppender"/>
			<appender-ref ref="ErrorAppender"/>
			<!--<appender-ref ref="ConsoleAppender"/>-->
		</root>
		<!--运行状态信息-->
		<appender name="InfoAppender" type="log4net.Appender.RollingFileAppender">
			<!--日志路径-->
			<File value="log/log_info.txt"/>
			<!--是否是向文件中追加日志-->
			<AppendToFile value="true"/>
			<!--创建新文件的方式-->
			<RollingStyle value="Size"/>
			<!--log文件大小-->
			<MaximumFileSize value="5M"/>
			<!--备份日志数目-->
			<MaxSizeRollBackups value="30"/>
			<!--日志文件名是否是固定不变的-->
			<StaticLogFileName value="true"/>
			<lockingModel type="log4net.Appender.RollingFileAppender+MinimalLock" />
			<!--输出格式-->
			<layout type="log4net.Layout.PatternLayout">
				<!--日期 [级别]-->
				<conversionPattern value="%d [%-5p] [%t%] -%m%n"/>
			</layout>
			<!--控制器,只记录级别在INFO-INFO之间的信息-->
			<filter type="log4net.Filter.LevelRangeFilter">
				<levelMin value="INFO" />
				<levelMax value="INFO" />
			</filter>
		</appender>
		<!--运行错误信息-->
		<appender name="ErrorAppender" type="log4net.Appender.RollingFileAppender">
			<!--日志路径-->
			<File value="log/log_error.txt"/>
			<!--是否是向文件中追加日志-->
			<AppendToFile value="true"/>
			<!--创建新文件的方式-->
			<RollingStyle value="Size"/>
			<!--log文件大小-->
			<MaximumFileSize value="5M"/>
			<!--备份日志数目-->
			<MaxSizeRollBackups value="30"/>
			<!--日志文件名是否是固定不变的-->
			<StaticLogFileName value="true"/>
			<lockingModel type="log4net.Appender.RollingFileAppender+MinimalLock" />
			<!--输出格式-->
			<layout type="log4net.Layout.PatternLayout">
				<!--输出格式-->
				<conversionPattern value="%d [%-5p] [%t%] -%m%n"/>
			</layout>
			<!--控制器,只记录级别在WARN-FATAL之间的信息-->
			<filter type="log4net.Filter.LevelRangeFilter">
				<levelMin value="WARN" />
				<levelMax value="FATAL" />
			</filter>
		</appender>
	</log4net>
</configuration>
 ```

####  修改AssemblyInfo.cs
在工程 - Properties - AssemblyInfo.cs文件中新增如下一行代码:
```
[assembly: log4net.Config.XmlConfigurator(ConfigFile = "Log4Net.config", Watch = true)]
```
<img  src="https://naiop.github.io/blog/public/images/log4net_img3.png"  />


#### 使用
<img  src="https://naiop.github.io/blog/public/images/log4net_img4.png"  />
 ```
public static readonly log4net.ILog logInfo = log4net.LogManager.GetLogger("InfoLog");
public static readonly log4net.ILog logError = log4net.LogManager.GetLogger("Error");

logInfo.Info("logInfo.Info");
logError.Error("logError.Error");
 ```

查看是否生成log
<img  src="https://naiop.github.io/blog/public/images/log4net_img5.png"  />