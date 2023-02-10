# check-radio 单选框

## 介绍

单选框

## 引入

在app.json或index.json中引入组件。

``` json
"usingComponents": {
  "check-radio": "@const/weapp/check-radio/index"
}
```

## 基础用法

``` html
<check-radio
  checked="{{isRead}}"
  label="我已阅读《隐私协议》并同意"
  bind:change="handleCheck"
/>

默认选中：

<check-radio
  checked="{{ true }}"
  label="面包"
/>
```

``` js
{
  data: {
    isRead: false,
  },

  handleCheck(e) {
    this.setData({
      isRead: e.detail,
    });
  },
}
```

## 属性

| 参数            | 说明          | 类型          | 默认值         |
| -------------- | ------------- | ------------ | ------------- |
| checked        | 初始选中状态        | Boolean |  false  |
| size        | 大小   | String |  '36rpx'  |
| label         | 标签    | String  |  ''  |

## 插槽

| 名称            | 说明          |
| -------------- | ------------- |

## 事件

| 事件名            | 说明          | 参数          |
| --------------   | ------------- | ------------ |
| bind:change      | 选中改变触发      | checkStatus |
