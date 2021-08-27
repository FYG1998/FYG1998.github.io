---
title: threejs
date: 2021-05-22 14:14:04
categories:
- js
tags:
- 学习
---

***
###  threejs 主要有 Camera + Sence + light + 几何体+ 渲染
- `three.js编写的3D 地球` 
[https://naiop.github.io/mindex/threeworld.html](https://naiop.github.io/mindex/threeworld.html)

- `源码地址 threeworld.html`
[https://github.com/naiop/naiop.github.io/tree/master/mindex](https://github.com/naiop/naiop.github.io/tree/master/mindex) 

### Camera 相机视觉
```
 const fov = 75;  //视野范围
 const aspect = 2;  // 画布的宽高比 默认2
 const near = 0.1; //近平面
 const far = 100;   //远平面
 const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
 camera.position.set(0, 10, 20); //camera.position.z = 3;
```

### OrbitControls 轨道控制  以便响应我们可能呈现的某些变化。
```
  const controls = new OrbitControls(camera,canvas);
  controls.enableDamping = true; //感觉不那么生硬
  controls.maxPolarAngle = Math.PI * 0.4;   //最大角度 地平面与camera
  controls.minDistance = 10; //最小拉距
  controls.maxDistance = 50;  //最大拉距
  controls.target.set(0, 0, 0);
  controls.update();
```

### Scene 场景
```
  const scene = new THREE.Scene();  //场景
  scene.background = new THREE.Color(0xcce0ff); //背景颜色
  scene.fog = new THREE.Fog( 0xcce0ff, 20, 100 ); //雾 （颜色，近，远）；

// panel 地平面   TextureLoader纹理+PlaneGeometry平面几何
 {
    const planeSize = 1000;

    const loader = new THREE.TextureLoader();
    //const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    const texture = loader.load('js/grasslight-big.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    //PlaneGeometry平面几何
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }
```

### Light 光源
```
// lights  光1

  //const color = 0xcce0ff ;
  // const intensity = 1; 
  // const light = new THREE.DirectionalLight(0xcce0ff, 1);   //Light 光源 new DirectionalLight 是平行光 (颜色，亮度)
  // light.position.set(-1, 2, 4); //光源位置
  // scene.add(light);  //添加到场景
  
// lights  光2
{
    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);  //光源位置
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    const d = 300;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;
    scene.add(light);
}
```

### 几何体 （也可以也可以是3D模型）
```
  //给正方体6个面 添加纹理图片
  const cubes = [];  
  const loader = new THREE.TextureLoader();  //纹理
  const material = [
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
  ];
  //  const boxWidth = 1;
  //  const boxHeight = 1;
  //  const boxDepth = 1; 
    const geometry = new THREE.BoxGeometry(2,2,2); // 立方几何体(BoxGeometry)（长，宽，高）
  //const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 几何体材质	 及颜色
    const cube = new THREE.Mesh(geometry, material);  // 网格mesh对象引入  几何体(Geometry)和材质(Material)。
    cube.position.y = 2;  //网格x y轴 位置
    cubes.push(cube); 
	scene.add(cube); //添加到场景中
  
  //正方体
 {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  
  //球体
  
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }
```

###  渲染
```
//计算画布长宽高，返回需要是否需要调整大小，防止失真
 function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


  function render(time) {
    time *= 0.001;  // convert time to seconds

// 解决拉伸变形
   const canvas = renderer.domElement; 
   camera.aspect = canvas.clientWidth / canvas.clientHeight;
   camera.updateProjectionMatrix();


//resizeRendererToDisplaySize 判断调整渲染器画布宽高
if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x = time;
    cube.rotation.y = time;
	
    controls.update();  // controls.enableDamping = true; //感觉不那么生硬
	
    renderer.render(scene, camera); //最后将场景和摄像机传递给渲染器来渲染出整个场景。
    requestAnimationFrame(render);
	
  }
  requestAnimationFrame(render);  // 回调函数之外在主进程中我们调用一次requestAnimationFrame来开始整个渲染循环。

}
```
	
### 完整代码 

- html
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>   
	<script type="module" src="./js/new_file.js"></script>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<style>
	html, body {
	   margin: 0;
	   height: 100%;
	}
	#c {
	   width: 100%;
	   height: 100%;
	   display: block;
	}
	#debug {
	  position: absolute;
	  left: 1em;
	  top: 1em;
	  padding: 1em;
	  background: rgba(0, 0, 0, 0.8);
	  color: white;
	  font-family: monospace;
	}
	</style>
</head>
<body>
<canvas id="c"></canvas>
<div id="debug">
  <div>msg:<span id="x"></span></div>

</div>
  
</body>
</html>


```

- js 引用的一张图片，随便找一张引用即可
```
import * as THREE from 'https://threejs.org/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';

function main() {

  const canvas = document.querySelector('#c'); //对应html ID为c的 canvas
  const renderer = new THREE.WebGLRenderer({canvas}); //传入canvas

//Camera 相机视觉
  const fov = 85;  //视野范围
  const aspect = 2;  // 画布的宽高比 默认2
  const near = 0.1; //近平面
  const far = 100;   //远平面
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20); //camera.position.z = 3;

//
  const xElem = document.querySelector('#x');
  xElem.textContent = "Test";

// OrbitControls 轨道控制  以便响应我们可能呈现的某些变化。
  const controls = new OrbitControls(camera,canvas);
  controls.enableDamping = true; //感觉不那么生硬
  controls.maxPolarAngle = Math.PI * 0.4;   //最大角度 地平面与camera
  controls.minDistance = 10; //最小拉距
  controls.maxDistance = 100;  //最大拉距
  controls.target.set(0, 5, 0);
  controls.update();

// Scene 场景
  const scene = new THREE.Scene();  //场景
  scene.background = new THREE.Color(0xcce0ff); //背景颜色
  scene.fog = new THREE.Fog( 0xcce0ff, 20, 100 ); //雾 （颜色，近，远）；

// panel 地平面   TextureLoader纹理+PlaneGeometry平面几何
 {
    const planeSize = 1000;

    const loader = new THREE.TextureLoader();
    //const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    const texture = loader.load('js/grasslight-big.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    //PlaneGeometry平面几何
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }


//Light 光源
/*  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  } */
//Light 光源

  //const color = 0xcce0ff ;
  // const intensity = 1; 
  // const light = new THREE.DirectionalLight(0xcce0ff, 1);   //Light 光源 new DirectionalLight 是平行光 (颜色，亮度)
  // light.position.set(-1, 2, 4); //光源位置
  // scene.add(light);  //添加到场景
  
// lights  光
{
    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);  //光源位置
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    const d = 300;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;
    scene.add(light);
}


  //给正方体6个面 添加纹理图片
  const cubes = [];  
  const loader = new THREE.TextureLoader();  //纹理
  const material = [
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('js/grasslight-big.jpg')}),
  ];
  //  const boxWidth = 1;
  //  const boxHeight = 1;
  //  const boxDepth = 1; 
    const geometry = new THREE.BoxGeometry(2,2,2); // 立方几何体(BoxGeometry)（长，宽，高）
  //const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 几何体材质	 及颜色
    const cube = new THREE.Mesh(geometry, material);  // 网格mesh对象引入  几何体(Geometry)和材质(Material)。
    cube.position.y = 2;  //网格x y轴 位置
    cubes.push(cube); 
	scene.add(cube); //添加到场景中
  
  //正方体
 {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  
  //球体
  
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }


//计算画布长宽高，返回需要是否需要调整大小，防止失真
 function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


  function render(time) {
    time *= 0.001;  // convert time to seconds

// 解决拉伸变形
   const canvas = renderer.domElement; 
   camera.aspect = canvas.clientWidth / canvas.clientHeight;
   camera.updateProjectionMatrix();


//resizeRendererToDisplaySize 判断调整渲染器画布宽高
if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x = time;
    cube.rotation.y = time;
	
    controls.update();  // controls.enableDamping = true; //感觉不那么生硬
	
    renderer.render(scene, camera); //最后将场景和摄像机传递给渲染器来渲染出整个场景。
    requestAnimationFrame(render);
	
  }
  requestAnimationFrame(render);  // 回调函数之外在主进程中我们调用一次requestAnimationFrame来开始整个渲染循环。

}

	
main();
	
```