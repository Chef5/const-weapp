const app = getApp();

Page({
  data: {
    theme: 'blue',
    optionData: {
      name: 'Chef'
    }
  },

  toggleTheme() {
    this.setData({
      theme: this.data.theme === 'blue' ? 'orange' : 'blue',
    });
  },

  /**
   * @description 显示弹窗
   */
  showMessageOverlay(e) {
    const { id } = e.currentTarget.dataset;
    this.selectComponent(`#${id}`).onClickShow();
  },

  handleCancel(e) {
    console.log('点击取消', e.detail);
  },
  handleConfirm(e) {
    console.log('点击确认', e.detail);
  },
});
