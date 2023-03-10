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
