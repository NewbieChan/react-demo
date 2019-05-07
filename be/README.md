## 介绍
这个是一个简单的博客系统后台接口服务，是跟着（某课）视频学习写的。

## 项目构建
- `npm i / yarn `: 安装需要的依赖
- `npm run dev / yarn dev`: 启动后端服务

## 项目结构
```
.
├── app.js        统一在这个文件引用其他目录以及一些中间件
├── bin           项目启动目录
├── config        配置目录
├── controller    控制器
├── db            数据库的封装
├── logs          日志目录
├── middleware    中间件
├── model         数据模型
├── routes        路由
└── utils         工具函数

```

## 技术栈
> 站在巨人的肩膀上
- **express**
- **uuid** 生成一个唯一的token
- **redis** 存用户登录的token和用户名
- **mysql** 存储用户和博客信息


## 注意⚠️
> - 没有用到orm，有空的时候补上

> - 没有考虑到xss攻击

> - 没有对密码进行加密

> - 登录验证没有用到session而是自己将登录信息存到redis中

> - 需要安装redis，和mysql，同时需要在mysql创建数据库和两张表

> - 配置目录文件需要填写自己的安装的mysql 用户名和密码，以及自己创建的数据库名字等

## 数据库
> 库 
```
create database db_blog;
```

>  blog 表
```
create table tbl_blogs (
  id  int(11) not null auto_increment primary key,
  title varchar(20) not null,
  content longtext not null,
  create_at bigint(20) not null default 0,
  author varchar(20) not null,
  status int(11) not null default 1
);
```
> user 表
```
create table tbl_users (
  id  int(11) not null auto_increment primary key,
  username varchar(20) not null,
  password varchar(20) not null,
  realname varchar(20) not null,
  status int(11) not null default 1
);
```
