import baseComponent from '../helpers/baseComponent';
import Signature from './mini-smooth-signature';

/**
 * index
 */
baseComponent({
  properties: {
    // 方向
    orientation: {
      type: String,
      value: 'left', // left right
    },
    // placeholder
    placeholder: {
      type: String,
      value: '请绘制您的签名', // TODO: 待实现
    },
    // 笔触颜色
    color: {
      type: String,
      value: '#000',
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      value: '#fff',
    },
    // 线条粗细
    size: {
      type: Number,
      value: 10,
    },
    // 提示
    tips: {
      type: String,
      value: '请在上方空白处书写您的签字',
    },
    // 显示取消按钮
    showCancel:  {
      type: Boolean,
      value: false,
    },
    // 显示清除按钮
    showClean:  {
      type: Boolean,
      value: false,
    },
    // 显示撤销按钮
    showUndo:  {
      type: Boolean,
      value: false,
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      value: '确认',
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      value: '取消',
    },
    // 清除按钮文字
    cleanText: {
      type: String,
      value: '清除',
    },
    // 撤销按钮文字
    undoText: {
      type: String,
      value: '撤销',
    },
  },
  data: {
    data: {
      fullScreen: true,
      width: 320,
      height: 600,
      scale: 2,
    },
  },
  lifetimes: {
    attached: function () {
      try {
        const { windowWidth, windowHeight, pixelRatio  } = wx.getSystemInfoSync();
        this.setData({
          width: windowWidth - 80,
          height: windowHeight - 50,
          scale: Math.max(pixelRatio || 1, 2),
        })
      } catch (e) { }
      this.initSignature();
    },
  },
  methods: {
    // 组件库封装函数：当主题改变时触发
    onThemeChange() {

    },

    // 初始化（伪全屏）
    initSignature() {
      const { backgroundColor, size, color } = this.properties;
      this.createSelectorQuery().select('#signature').fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        canvas.width = this.data.width * this.data.scale;
        canvas.height = this.data.height * this.data.scale;
        const ctx = canvas.getContext('2d');
        this.signature = new Signature(ctx, {
          width: this.data.width,
          height: this.data.height,
          scale: this.data.scale,
          color,
          minWidth: 4,
          maxWidth: size,
          bgColor: backgroundColor,
          toDataURL: (type, quality) => canvas.toDataURL(type, quality),
          requestAnimationFrame: (fn) => canvas.requestAnimationFrame(fn),
          getImagePath: () => new Promise((resolve, reject) => {
            const img = canvas.createImage();
            img.onerror = reject;
            img.onload = () => resolve(img);
            img.src = canvas.toDataURL();
          })
        })
      })
    },

    /**
     * 事件绑定
     */
    handleTouchStart(e) {
      const pos = e.touches[0];
      this.signature.onDrawStart(pos.x, pos.y);
    },
    handleTouchMove(e) {
      const pos = e.touches[0];
      this.signature.onDrawMove(pos.x, pos.y);
    },
    handleTouchEnd() {
      this.signature.onDrawEnd();
    },

    /**
     * 按钮事件
     */
    handleCancel() {
      this.triggerEvent('cancel');
    },
    handleClear() {
      this.signature.clear();
    },
    handleUndo() {
      this.signature.undo();
    },
    handleColor() {
      this.signature.color = '#' + Math.random().toString(16).slice(-6);
    },
    handleConfirm() {
      if (this.signature.isEmpty()) {
        wx.showToast({ icon: 'none', title: '未签名' });
        return;
      }
      this.getRotateImage().then(url => {
        console.log(url);
        this.triggerEvent('confirm', url);
        // 开发预览
        // url && wx.previewImage({
        //   current: 0,
        //   urls: [url],
        // });
      });
    },

    // 伪全屏输出旋转图片
    async getRotateImage() {
      const { orientation } = this.properties;
      const dataURL = this.signature.toDataURL();
      const url = await this.base64ToPath(dataURL);
      // const ctx = wx.createCanvasContext('signature3');
      const width = this.data.width * this.data.scale;
      const height = this.data.height * this.data.scale;
      const offscreenCanvas = wx.createOffscreenCanvas({type: '2d', height: height, width: height}, this);
      const ctx = offscreenCanvas.getContext('2d');
      let img = offscreenCanvas.createImage();
      img.src = url;
      return new Promise((resolve, reject) => {
        img.onload = (e) => {
          ctx.restore();
          ctx.save();
          if (orientation === 'right') {
            ctx.translate(offscreenCanvas.height, 0);
            ctx.rotate(90 * Math.PI / 180);
          } else {
            ctx.translate(0, offscreenCanvas.height);
            ctx.rotate(270 * Math.PI / 180);
          }
          ctx.drawImage(img, 0, 0, width, height );
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvas: offscreenCanvas,
              x: 0,
              y: orientation === 'right' ? 0 : height - width,
              width: height,
              height: width,
              success: res => resolve(res.tempFilePath),
              fail: reject,
            }, this)
          }, 50)
        };
      })
    },


    // base64转本地
    base64ToPath(dataURL) {
      return new Promise((resolve, reject) => {
        // const data = wx.base64ToArrayBuffer(dataURL.replace(/^data:image\/\w+;base64,/, ""));
        const filePath = `${wx.env.USER_DATA_PATH}/${Math.random().toString(32).slice(2)}.png`;
        // const buffer = wx.base64ToArrayBuffer(dataURL);
        wx.getFileSystemManager().writeFile({
          filePath,
          data: dataURL.replace(/^data:image\/\w+;base64,/, ""),
          encoding: 'base64',
          success: () => resolve(filePath),
          fail: reject,
        });
      })
    },
  },
})
