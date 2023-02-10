import baseComponent from '../helpers/baseComponent';

baseComponent({
  properties: {
    // 初始选中状态
    checked: {
      type: Boolean,
      value: false,
    },
    // 大小
    size: {
      type: String,
      value: '36rpx',
    },
    // 标签
    label: {
      type: String,
      value: '',
    }
  },
  data: {
    OSS_PREFIX: '',
    iconChecked: 'icon-radio-actived.png',
    iconUnCheck: 'icon-radio-default.png',
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
        OSS_PREFIX: `${this.properties.ossUrl}/patient/skin/${this.properties.theme}/v1.0.08/`,
      });
    },

    handleCheckToggle() {
      this.setData({
        checked: !this.properties.checked,
      });
      this.triggerEvent('change', this.properties.checked);
    },
  }
})
