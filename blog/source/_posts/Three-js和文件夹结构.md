---
title: Three.js和文件夹结构
date: 2021-05-25 09:06:05
categories:
 - js
tags:
- 学习
---

***

## 前言
 最近学习这个three.js ，总是报错 大多都是引入的js的问题，和es6模块，下面是官网说明 然后一步一步根据说明 建文件结构 导入js就可以了

## es6模块，three.js，
从r106版本开始，使用three.js的首选方式是通过[es6模块。](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

在一个脚本中，es6模块可以通过`import`关键字加载或者通过`<script type="module">`行内标签。这有一个两种方法都用的例子。
```
<script type="module">
import * as THREE from './resources/threejs/r127/build/three.module.js';
...
</script>
```
路径必须是绝对或相对的。相对路径通常由`./`或者`../`开头，和其他标签不同如`<img>`和`<a>`.

只要它们的绝对路径完全相同，对同一脚本的引用将只被加载一次。对于three.js这意味着它需要你把所有的实例的库放在正确的文件夹结构中。


## 和文件夹结构
```
someFolder
 |
 ├-build
 | |
 | +-three.module.js
 |
 +-examples
   |
   +-jsm
     |
     +-controls
     | |
     | +-OrbitControls.js
     | +-TrackballControls.js
     | +-...
     |
     +-loaders
     | |
     | +-GLTFLoader.js
     | +-...
     |
     ...
```
之所以需要这种文件夹结构，是因为像 `OrbitControls.js`这样的示例中的脚本有一个复杂的相对路径，像下面这样

```
import * as THREE from '../../../build/three.module.js';
```

使用相同的结构保证了当你导入three和任一示例库时，它们都会引用同一个three.module.js文件。
```
import * as THREE from './someFolder/build/three.module.js';
import {OrbitControls} from './someFolder/examples/jsm/controls/OrbitControls.js';
```

在使用CDN时，是同样的道理。确保`three.modules.js`的路径以` /build/three.modules.js`结尾，比如

```
import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';

```
***
如果你偏向于旧式的`<script src="path/to/three.js"></script>`样式，你可以查看[这个网站的旧版本](https://r105.threejsfundamentals.org)。 Three.js的政策是不担心向后的兼容性。他们希望你使用特定的版本，就像希望你下载代码并把它放在你的项目中一样。当升级到较新的版本时，你可以阅读 [迁移指南](https://github.com/mrdoob/three.js/wiki/Migration-Guide) 看看你需要改变什么。如果要同时维护一个es6模块和一个类脚本版本的网站，那工作量就太大了，所以今后本网站将只显示es6模块样式。正如其他地方说过的那样，为了支持旧版浏览器，请考虑使用[转换器](https://babeljs.io/)。