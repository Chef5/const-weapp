import baseComponent from '../helpers/baseComponent';

/**
 * index
 */
baseComponent({
  properties: {
    // 图片
    image: {
      type: String,
      value: '',
    },
    // 描述文字
    descriptionText: {
      type: String,
      value: '暂无数据',
    },
    // 是否自定义样式
    isCustom: {
      type: Boolean,
      value: false,
    },
    // 主要描述 自定义样式下生效
    title: {
      type: String,
      value: '',
    },
    // 图片样式
    imageStyle: {
      type: String,
      value: '',
    },
    // 字体样式
    textStyle: {
      type: String,
      value: '',
    },
  },
  data: {
    imageEmpty: '',
  },
  lifetimes: {
    attached: function () {
      this.onThemeChange();
    },
  },
  methods: {
    // 组件库封装函数：当主题改变时触发
    onThemeChange() {
      this.setData({
        imageEmpty: `${this.properties.ossUrl}/patient/skin/${this.properties.theme}/v1.0.08/list-empty.png`,
      });
    },
  },
})
