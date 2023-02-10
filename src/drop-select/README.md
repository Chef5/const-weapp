# drop-select 下拉选择

## 介绍

下拉选择，含有placeholder

## 引入

在app.json或index.json中引入组件。

``` json
"usingComponents": {
  "drop-select": "@const/weapp/drop-select/index"
}
```

## 基础用法

``` html
<drop-select
  title="用药频次"
  placeholder="请选择用药频次"
  loading="{{ loading }}"
  value="{{ frequencyCode }}"
  list="{{ frequencyList }}"
  bind:change="handleSelectChange"
/>
```

``` js
{
  data: {
    loading: false,
    frequencyCode: 'p1',
    frequencyList: [
      { label: '一天1次', value: 'p0' },
      { label: '一天3次', value: 'p1' },
    ],
  },

  handleSelectChange(e) {
    const { index, selectValue } = e.detail;
    console.log(index, selectValue);
  },
}
```

## 属性

| 参数            | 说明          | 类型          | 默认值         |
| -------------- | ------------- | ------------ | ------------- |
| title        | 弹窗标题        | String |  ''  |
| value        | 默认选中值   | String |  ''  |
| list         | 下拉数据     | Array  |  []  |
| placeholder  | 提示语        | String |  '请选择'  |
| loading      | loading状态     | Boolean |  false  |

## 插槽

| 名称            | 说明          |
| -------------- | ------------- |

## 事件

| 事件名            | 说明          | 参数          |
| --------------   | ------------- | ------------ |
| bind:change      | 选中改变触发      | { index, selectValue } |
