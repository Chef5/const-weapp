Page({
  data: {
    ossUrl: getApp().globalData.ossUrl,
    theme: 'blue',
    isRead: false,
  },

  toggleTheme() {
    this.setData({
      theme: this.data.theme === 'blue' ? 'orange' : 'blue',
    });
  },

  handleCheck(e) {
    this.setData({
      isRead: e.detail,
    });
  },
});
