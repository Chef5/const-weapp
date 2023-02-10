Page({
  data: {
    list: [
      {
        label: 'no-data',
        value: '无数据缺省',
        theme: true,
        path: '/pages/no-data/index',
      },
      {
        label: 'drop-select',
        value: '下拉选择',
        theme: false,
        path: '/pages/drop-select/index',
      },
      {
        label: 'message-overlay',
        value: '提示弹窗',
        theme: true,
        path: '/pages/message-overlay/index',
      },
      {
        label: 'check-radio',
        value: '单选框',
        theme: true,
        path: '/pages/check-radio/index',
      },
      {
        label: 'hand-signature',
        value: '手写签名',
        theme: true,
        path: '/pages/hand-signature/index',
      },
    ],
  },

  onShareAppMessage() {
    return {
      title: 'Const WeApp',
      imageUrl: ''
    };
  },
});
