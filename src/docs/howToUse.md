---
title: 如何使用组件库
---

# Const WeApp

### Const WeApp 快速搭建属于自己的微信小程序组件库

## 体验

拉取项目源码，用微信开发者工具打开 `examples` 目录运行。

## 快速上手

### 使用之前
在开始使用前，你需要先阅读 [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 的相关文档。

### 如何使用组件库

1. 给npm添加私有地址

``` sh
npm config set @const:registry https://npm.xxxxxxx.com/
```

2. 安装依赖

``` sh
npm i @const/weapp
```

3. 开发者工具，构建npm


4. 添加需要的组件。在页面的 json 中配置（路径根据自己项目位置配置）：

``` json
"usingComponents": {
  "no-data": "@const/weapp/no-data/index"
}
```

5. 在 wxml 中使用组件：

```html
<no-data description-text="暂无数据" />
```

## 开发组件

### 组件库项目

```shell
# 拉取项目
git clone https://github.com/Chef5/const-weapp.git
npm install

# 编译组件
npm run dev
```
然后，将 `examples` 目录在微信开发者工具中打开即可。

### 组件开发规范

xxxx

### 发布组件

xxxxx
