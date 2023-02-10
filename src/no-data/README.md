# no-data 无数据缺省

## 介绍

无数据时，页面缺省显示

## 引入

在app.json或index.json中引入组件。

``` json
"usingComponents": {
  "no-data": "@const/weapp/no-data/index"
}
```

## 基础用法

默认样式：

``` html
<no-data description-text="暂无数据" />
```

## 属性

| 参数            | 说明          | 类型          | 默认值         |
| -------------- | ------------- | ------------ | ------------- |
| image  | 缺省图标   | String |  ''  |
| description-text  | 描述文字   | String |  '暂无数据'  |

## 插槽

| 名称            | 说明          |
| -------------- | ------------- |

## 事件

| 事件名            | 说明          | 参数          |
| --------------   | ------------- | ------------ |
