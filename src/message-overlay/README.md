# message-overlay 提示弹窗

## 介绍

提示弹窗，弹窗内容支持文字、slot，弹窗按钮可配置

## 引入

在app.json或index.json中引入组件。

``` json
"usingComponents": {
  "message-overlay": "@const/weapp/message-overlay/index"
}
```

## 基础用法

基础用法：

``` html
<message-overlay
  id="overlay"
  showClose
  showCancel
  title="确认收货"
  desc="是否确认收到当前订单药品？"
  cancel-btn="没有"
  confirm-btn="是的，已收到"
/>
```

``` js
{
  showMessageOverlay() {
    this.selectComponent('#$overlay').onClickShow();
  },
}
```

使用插槽：

``` html
<message-overlay
  id="overlay"
  showClose
  showCancel
  title="插槽演示"
  cancel-btn="取消"
  confirm-btn="确定"
  data="{{ optionData }}"
  bind:cancel="handleCancel"
  bind:confirm="handleConfirm"
>
  <view>
    <span style="color: red;">使用了插槽渲染</span>
  </view>
</message-overlay>
```

``` js
{
  data: {
    optionData: {
      name: 'Chef'
    }
  },
  showMessageOverlay() {
    this.selectComponent('#$overlay').onClickShow();
  },
  handleCancel(e) {
    console.log('点击取消', e.detail);
  },
  handleConfirm(e) {
    console.log('点击确认', e.detail);
  }
}
```


## 属性

| 参数            | 说明          | 类型          | 默认值         |
| -------------- | ------------- | ------------ | ------------- |
| title        | 弹窗标题        | String |  ''  |
| desc        | 弹窗内容   | String |  ''  |
| show-close         | 是否显示关闭按钮     | Boolean  |  false |
| show-cancel  | 是否显示取消按钮        | Boolean |  false  |
| cancel-btn      | 取消按钮文字     | String |  '取消'  |
| confirm-btn      | 确定按钮文字     | String |  '确定'  |
| data      | 附加数据     | Object |  null  |

## 插槽

| 名称            | 说明          |
| -------------- | ------------- |
| - | 自定义弹窗内容 |

## 事件

| 事件名            | 说明          | 参数          |
| --------------   | ------------- | ------------ |
| bind:cancel      | 点击取消触发      | data |
| bind:confirm      | 点击确认触发      | data |
