---
title: CSharp读写ini文件
date: 2021-08-05 19:23:33
categories:
- C#
tags:
- 学习
---


#### 认识INI文件结构
INI文件格式由节、键、值组成。
节
`[section]`
参数
（键=值）
name=value

#### 纸上得来终觉浅，绝知此事要躬行 (实操代码)

引入命名空间using System.Runtime.InteropServices;
2个主要的库函数

```
/// 写入INI文件
[DllImport("kernel32")]
private static extern long WritePrivateProfileString(string section, string key, string val, string filepath);

/// 读取INI文件
[DllImport("kernel32")]
private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retval, int size, string filePath);

```


源码
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Demo
{
    public class IniFiles
    {
        public string Path;

        /// <summary> 
        /// 构造方法 
        /// </summary> 
        /// <param name="INIPath">文件路径</param> 
        public IniFiles(string path)
        {
            this.Path = path;
        }

        ///声明API函数 

        /// 写入INI文件      
        /// section节点名称 ,key键 ,val值 ,filepath文件路径
        [DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filepath);
       
        /// 读取INI文件
        ///section节点名称, key键 , def值 , retval stringbulider对象  ,size字节大小 ,filePath文件路径
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retval, int size, string filePath);


        /// 写入INI文件中的内容方法      
        public bool IniWriteValue(string section, string key, string iValue)
        {
            long result = WritePrivateProfileString(section, key, iValue, this.Path);
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
        /// 读取INI文件中的内容方法      
        public string IniReadValue(string Section, string key)
        {
            StringBuilder temp = new StringBuilder(1024);
            GetPrivateProfileString(Section, key, "", temp, 1024, this.Path);
            return temp.ToString();
        }
    }
}
```
