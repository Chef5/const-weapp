# Const WeApp

**一款微信小程序UI组件库框架，可以根据本框架快速搭建属于自己的微信小程序组件库**

特色：

- 自带预览项目：实时编译、实时预览
- 在线文档自动生成（根据每个组件的readme.md文件生成）
- 组件统一封装（支持主题色、统一props）
- less开发

## 一、组件开发

```shell
# 拉取项目
git clone https://github.com/Chef5/const-weapp.git
npm install

# 编译组件
npm run dev
```

然后，在微信开发者工具中打开 `examples` 目录，填写自己的appid，编译运行进行预览。

本项目已内置了部分组件，可供开发参考，详细开发约定，请看文末！

## 二、在线文档

开发预览文档：

``` sh
npm run docs:dev
```

浏览器打开：http://localhost:8080/const-weapp/

线上部署：注意需要根据具体情况修改`src/.vuepress/config.js`下的`base`

``` sh
npm run docs:build
```

将`src/.vuepress/dist`目录拷贝到服务器部署即可。

> 更多文档配置，请参考：[VuePress 配置](https://vuepress.vuejs.org/zh/config/)

## 三、如何使用组件库？

假定你已将开发组件库并发布到npm，下面以`@const/weapp`为例：

1. 在项目中安装组件库

``` sh
npm i @const/weapp
```

2. 开发者工具，构建npm

3. 添加需要的组件。在页面的 json 中配置（路径根据自己项目位置配置）：

``` json
"usingComponents": {
  "no-data": "@const/weapp/no-data/index"
}
```

   在 wxml 中使用组件：

```html
<no-data description-text="暂无数据" />
```

## 四、组件开发约定

### 1 创建组件

- 文件夹：在src目录下，新建文件夹，采用横线连接 (kebab-case)命名，如：drop-select
- 组件文件：进入组件文件夹，分别创建组件必要的文件，统一以index命名：index.js、index.json、index.less、index.wxml
（组件样式采用less开发，编译时会自动转换为.wxss）
- 说明文档：每个组件目录下，还需要创建一个 readme.md 文档用于描述该组件的如何使用（会自动生产在线文档）】
  
一个组件一共需要包含5个文件

### 2 设计规范

- 保持纯净：组件应该保持功能纯净，组件只做交互逻辑，不能将业务逻辑写入组件
- 功能单一明确：组件功能应该尽量保证单一，复杂组件可考虑解耦开发，拆分成父子组件
- 高可配置：组件功能、样式、描述尽量设计为可配置，能够多场景复用
- 注释明确：组件属性、方法、监听均需要详细注释
- 外部影响：组件内部可以使用 getApp() 获取外部数据，当应该尽量少用。共用方法可以在`src/helpers/`下创建。
- 主题颜色：涉及主题色的组件，需要在组件内部定义多套主题色样式

### 3 index.json

组件库依赖于 vant-weapp ，因此可以直接引用vant的组件进行封装开发，比如：van-icon

如需使用其他UI组件库，可自行替换

``` json
{
    "component": true,
    "usingComponents": {
        "van-icon": "@vant/weapp/icon/index"
    }
}
```

### 4 index.wxml

外层应当只能有一个根节点，并且根节点class命名为`const-container`，便于全局统一样式调整。

``` html
<view class="const-container {{theme}}">
    组件内容
</view>
```

### 5 index.js

组件定义，统一使用 baseComponent 进行定义，baseComponent已对小程序组件方法进行了一些封装和基础配置

``` js
import baseComponent from '../helpers/baseComponent';
 
// 组件定义
baseComponent({});
```

组件库统一封装的props：

| 参数 | 类型 | 默认值 | 说明 | 备注 |
| ---- | ----- | ----- | ----- | ----- |
| oss-url | String | xxxxx | oss域名地址 | 无 |
| theme | String | blue | 主题 | onThemeChange(newValue) |

建议：属性定义时，应该始终使用 camelCase，而在模板中应该始终使用 kebab-case。属性定义至少应声明 type 类型、value 默认值，并且应当有属性描述注释，如果需要监听变化，还需声明observer

``` js
baseComponent({
  properties: {
    // 最小值
    min: {
      type: Number, // 必须
      value: 0, // 必须
      observer: function(newVal, oldVal) { // 可选
        // 属性值变化时执行
      }
    },
  }
})
```

建议：组件结构顺序规范：properties、data、lifetimes、pageLifetimes、methods

``` js
import baseComponent from '../helpers/baseComponent';
 
baseComponent({
  properties: { }, // 1. 属性声明
  data: {}, // 2. 私有数据
  lifetimes: { // 3. 组件生命周期函数
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: { // 4. 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },
  methods: { // 5. 组件方法
    // 当主题改变时触发
    onThemeChange() { },
  },
})
```

## 五、缺陷及优化思考

- 版本管理：每次优化其中一个组件，都要导致整个组件库版本升级
- 组件创建自动化：缺少一个命令工具，可以帮助我们一键在`src`、`examples/pages`下面创建组件源码和预览页面，并能在`examples/app.json`、`examples/pages/index.js`新增预览跳转的代码片段。
- 文档生成：基于组件源码props和事件，自动生成简易的组件说明文档`readme.md`

## License
[MIT](http://opensource.org/licenses/MIT)
