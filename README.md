## wx-miniprogram-boilerplate
>基于Gulp构建的微信小程序开发工作流

### 适用场景

目前开发微信小程序时，可选的技术方案大概有四种，分别是：
1. [微信小程序原生开发](https://developers.weixin.qq.com/miniprogram/dev/)
2. [使用wepy框架](https://tencent.github.io/wepy/index.html)
3. [使用mpvue框架](http://mpvue.com/)
4. [使用taro框架](https://github.com/NervJS/taro)

几种开发方案，各有优劣。使用第三方框架开发，可以享受框架带来的开发便利，但对于小程序新增的诸多特性和功能，比如**WXS模块**、**自定义组件**和**插件**等，受制于框架实现，无法使用。

而原生小程序的开发模式，又过于简陋，就样式来说，写惯了less，stylus和sass的同学一定无法忍受wxss的这种写法，基于此，决定使用**gulp**自动化工具来构建一套微信小程序开发的基础模板，在完全保留微信小程序功能和特性的基础上，又可以的使用`less`来写样式，同时加入图片压缩，命令行快速创建模板等特性，如此开发，快哉，快哉！

### 特性

+ 基于`gulp+less`构建的微信小程序工程项目
+ 项目图片自动压缩
+ ESLint代码检查
+ 使用命令行快速创建`page`、`template`和`component`
+ 支持生产环境打包

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
$ npm run dev （开发环境打包）
$ npm run test (测试环境打包)
```
##### 4. 新建page、template或者component
```
  gulp auto -p mypage           创建名为mypage的page文件
  gulp auto -t mytpl            创建名为mytpl的template文件
  gulp auto -c mycomponent      创建名为mycomponent的component文件
  gulp auto -s index -p mypage  复制pages/index中的文件创建名称为mypage的页面
```
##### 5. 上传代码前编译
```
$ npm run build （生产环境打包）
```
##### 6. 上传代码，审核，发版

### 工程结构
```
wx-miniprogram-boilerplate
├── dist         // 编译后目录
├── node_modules // 项目依赖
├── src 
│    ├── components // 微信小程序自定义组件
│    ├── env        // 请求域名配置
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
├── .eslintrc.js
├── package-lock.json
├── package.json
└── README.md

```

### Gulp说明

```
Tasks:
  dev              开发编译，同时监听文件变化
  test             整体编译，请求指向测试环境
  build            整体编译

  clean            清空产出目录
  wxml             编译wxml文件（仅仅copy）
  js               编译js文件，同时进行ESLint语法检查
  json             编译json文件（仅仅copy）
  wxss             编译less文件为wxss
  img              编译压缩图片文件
  watch            监听开发文件变化
  devEnv/testEnv/prodEnv 生成对应环境的请求域名配置

  auto             自动根据模板创建page,template或者component(小程序自定义组件)

gulp auto 

选项：
  -s, --src        copy的模板                     [字符串] [默认值: "_template"]
  -p, --page       生成的page名称                                       [字符串]
  -t, --template   生成的template名称                                   [字符串]
  -c, --component  生成的component名称                                  [字符串]
  --msg            显示帮助信息                                           [布尔]

示例：
  gulp auto -p mypage           创建名为mypage的page文件
  gulp auto -t mytpl            创建名为mytpl的template文件
  gulp auto -c mycomponent      创建名为mycomponent的component文件
  gulp auto -s index -p mypage  复制pages/index中的文件创建名称为mypage的页面
```

#### Q&A
- **Q:** 为什么工作流中没有加入js转换，样式补全以及代码压缩？


  **A:** 微信开发者工具中自带babel将ES6转ES5,样式补全以及js代码压缩等功能，在此工作流中不做额外添加。
![](https://img002.qufenqi.com/products/e5/21/e521bb1b6e01b197f22c44ea27f7313d.png)


- **Q:** `_template`目录的文件有什么用？


  **A:** 使用`gulp auto`命令自动生成文件，`-s`参数可以指定copy的对象，默认情况下是以对应目录下文件夹为`_template`中的文件为copy对象的。开发者可以根据业务需求，自定义`_template`下的文件。


- **Q:** `_template`目录的文件是否会被编译到`dist`目录？


  **A:** 不会。

### TODO
- [x] 代码注释
- [x] 规范命令行使用
- [x] eslint
- [x] gulp增量编译
- [x] 生产环境打包

### 最后
将持续更新，如果有新的建议，欢迎创建Issue或发送PR，感谢你的支持和贡献。
