# hand-signature 手写签名

## 介绍

手写签名，支持主题

## 引入

在app.json或index.json中引入组件。

``` json
"usingComponents": {
  "hand-signature": "@piller/weapp/hand-signature/index"
}
```

## 基础用法

``` html
<hand-signature
  theme="{{ theme }}"
  bind:cancel="handleCancel"
  bind:confirm="handleConfirm"
/>
```

``` js
handleCancel() {
  console.log('点击取消');
},
handleConfirm(e) {
  console.log('点击确认', e.detail);
},
```


## 属性

| 参数            | 说明          | 类型          | 默认值         |
| -------------- | ------------- | ------------ | ------------- |
|  orientation |  方向（支持left、right）  | String |  'left'  |
|  placeholder(未实现) |  placeholder  | String |  '请绘制您的签名'  |
|  color |  笔触颜色  | String |  '#000'  |
|  backgroundColor |  背景颜色  | String |  '#fff' |
|  size |  线条粗细  | Number |  10  |
|  tips | 提示  | String |  '请在上方空白处书写您的签字'  |
|  showCancel |  显示取消按钮  | Boolean |  false  |
|  showClean |  显示清除按钮  | Boolean |  false  |
|  showUndo |  显示撤销按钮  | Boolean |  false  |
|  confirmText |  确认按钮文字  | String |  '确认'  |
|  cancelText |  取消按钮文字  | String |  '取消'  |
|  cleanText |  清除按钮文字  | String |  '清除'  |
|  undoText |  撤销按钮文字  | String |  '撤销'  |

## 插槽

| 名称            | 说明          |
| -------------- | ------------- |

## 事件

| 事件名            | 说明          | 参数          |
| --------------   | ------------- | ------------ |
| bind:confirm   | 点击确认按钮触发 | url 签名图片链接 |
| bind:cancel   | 点击取消按钮触发 | - |
