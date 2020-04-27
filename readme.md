# 目录

## 准备工作
+ node.js环境（npm包管理器）
+ yarn(可选安装，相对npm安装依赖速度更快)
+ vue-cli3脚手架构建工具
+ cnpm（npm淘宝镜像）


## 开始
```
# 克隆项目
git clone http://10.18.6.177/eams/eams-frontend.git

# 进入项目
cd web

# 安装依赖
npm install
// or 出现安装速度慢，可以设置淘宝镜像
npm install --registry=https://registry.npm.taobao.org
// or 使用yarn安装(需要已经全局安装yarn)
yarn

# 开启本地开发服务
npm run dev
// or 
yarn dev
```

## 发布构建
```
# 发布到测试环境
npm build:test

# 发布到生产环境
npm build:prod
```
