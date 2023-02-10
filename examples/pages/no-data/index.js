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
});
