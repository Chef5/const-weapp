/*
 * @Author: Chef Wu
 * @Date: 2022-12-02 16:04:27
 * @Last Modified by: Chef Wu
 * @Last Modified time: 2022-12-05 16:06:30
 */

import baseComponent from '../helpers/baseComponent';

baseComponent({
  properties: {
    // 弹窗标题
    title: {
      type: String,
      value: '',
    },
    // 描述
    desc: {
      type: String,
      value: '',
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: false,
    },
    // 取消按钮文字
    cancelBtn: {
      type: String,
      value: '取消',
    },
    // 确定按钮文字
    confirmBtn: {
      type: String,
      value: '确定',
    },
    // 附加数据
    data: {
      type: Object,
      default: null,
    },
  },
  data: {
    show: false, // 弹窗的显示与隐藏
  },
  methods: {
    /**
     * @description 打开弹窗
     */
    onClickShow() {
      this.setData({
        show: true
      });
    },

    /**
     * @description 关闭弹窗
     */
    onClickHide() {
      this.setData({
        show: false
      });
      this.triggerEvent('cancel', this.properties.data);
    },

    /**
     * @description 点击确定
     */
    confirm() {
      this.setData({
        show: false
      });
      this.triggerEvent('confirm', this.properties.data);
    }
  }

})
