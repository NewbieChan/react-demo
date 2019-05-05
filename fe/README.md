## 介绍
这个是一个简单的博客系统，是本人最近在学react弄的一个小demo。ps(本人是非常喜欢react，奈何公司一直用vue开发，所以只能在业余时间自己玩耍，没有人带，都是自己瞎折腾看视频，看别人代码自己撸的)

## 项目结构
```
├── README.md   // 项目总体说明
├── package.json
├── public  // 项目模版目录
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.js     // 项目登录权限判断
│   ├── index.css  // 项目css
│   ├── index.js   // 项目的入口文件
│   ├── layouts   // 项目布局
│   ├── pages     // 项目页面组件
│   ├── routes    // 项目路由
│   ├── service   // 项目接口
│   ├── store     // store
│   └── utils     // 工具方法（axios 封装，history)
└── yarn.lock

```

## 技术栈
> 站在巨人的肩膀上
- **React**: 用于构建用户界面的 JavaScript 库
- **Webpack**: 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
- **react-router**: 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。
- **redux**: 一个面向JavaScript应用的可预测状态容器。
- **redux-thunk**: 是一个比较流行的 redux 异步 action 中间件，比如 action 中有 ****setTimeout**** 或者通过 ****fetch****通用远程 API 这些场景，那么久应该使用 redux-thunk 了。redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响。
- **axios**: 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js中。
- **antd**: 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。(阿里出品，必属精品)