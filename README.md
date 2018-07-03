## wx-miniprogram-boilerplate
>基于Gulp构建的微信小程序开发工作流

### 适用场景

目前开发微信小程序时，可选的技术方案大概有三种，分别是：
1. [微信小程序原生开发](https://developers.weixin.qq.com/miniprogram/dev/)
2. [使用wepy框架](https://tencent.github.io/wepy/index.html)
3. [使用mpvue框架](http://mpvue.com/)

三种开发方案，各有优劣。使用第三方框架开发，可以享受框架带来的开发便利，但对于小程序新增的诸多特性和功能，比如**WXS模块**、**自定义组件**和**插件**等，受制于第三方框架，无法使用。

而原生小程序的开发模式，又过于简陋，就样式来说，写惯了less，stylus和sass的同学一定无法忍受wxss的这种写法，基于此，决定使用**gulp**自动化工具来构建一套微信小程序开发的基础模板，在完全保留微信小程序功能和特性的基础上，又可以的使用`less`来写样式，同时加入图片压缩，命令行快速创建模板等特性，如此开发，快哉，快哉！

### 特性
+ 基于`gulp+less`构建的微信小程序工程项目
+ 项目图片自动压缩
+ 使用命令行快速创建`page`、`template`和`component`

### Getting Started

##### 0. 开始之前，请确保已经安装node和npm，全局安装gulp-cli
```
$ npm install --global gulp-cli
```
##### 1. 下载代码
```
$ git clone https://github.com/YangQiGitHub/wx-miniprogram-boilerplate.git
```
##### 2. 进目录，安装依赖
```
$ cd wx-miniprogram-boilerplate && npm install
```
##### 3. 编译代码，生成dist目录，使用开发者工具打开dist目录
```
$ npm run dev
```
##### 4. 新建page、template或者component
```
$ gulp auto -d=mypage // 生成page
$ gulp auto -d=mytemplate -t=t  // 生成template
$ gulp auto -d=mycomponent -t=c // 生成component
```
##### 5. 上传代码前编译
```
$ npm run build
```
##### 6. 上传代码，审核，发版，维护master分支

### 工程结构
```
wx-miniprogram-boilerplate
├── dist         // 编译后目录
├── node_modules // 项目依赖
├── src 
│    ├── components // 微信小程序自定义组件
│    ├── images     // 页面中的图片和icon
│    ├── pages      // 小程序page文件
│    ├── styles     // ui框架，公共样式
│    ├── template   // 模板
│    ├── utils      // 公共js文件
│    ├── app.js
│    ├── app.json
│    ├── app.less
│    ├── project.config.json // 项目配置文件
│    └── api.config.js       // 项目api接口配置
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

```


### TODO
- [x] 代码注释
- [ ] eslint
- [ ] 规范命令行使用
