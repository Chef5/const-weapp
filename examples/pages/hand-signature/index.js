Page({
  data: {
    ossUrl: getApp().globalData.ossUrl,
    theme: 'blue',
  },

  toggleTheme() {
    this.setData({
      theme: this.data.theme === 'blue' ? 'orange' : 'blue',
    });
  },

  handleCancel() {
    console.log('点击取消');
  },
  handleConfirm(e) {
    console.log('点击确认', e.detail);
  },
});
