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
      value: '请绘制您的签名',
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
    //显示重置按钮
    showReset:{
      type:Boolean,
      value:true
    },
    //显示确认按钮
    showConfirm:{
      type:Boolean,
      value:true
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
    //重置按钮文字
    resetText:{
      type:String,
      value:"重置设置"
    },
    //签名图片
    signImageUrl:{
      type:String,
      value:""
    },
    //是否使用微信自带toast提示
    isWxToast:{
      type:Boolean,
      value:true
    },
    //未签名的提示信息
    noSignTip:{
      type:String,
      value:"未签名"
    }
  },
  data: {
    fullScreen: true,
    width: 320,
    height: 600,
    scale: 2,
    isDrawPlaceholder: false,
    showVanLay:false,//是否显示提示信息
    showVanLayTitle:'',//提示信息内容
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

    // ------------------

  // 初始化（伪全屏）
  initSignature() {
    this.createSelectorQuery().select('#signature').fields({ node: true, size: true }).exec((res) => {
      const canvas = res[0].node;
      canvas.width = this.data.width * this.data.scale;
      canvas.height = this.data.height * this.data.scale;
      const ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.ctx = ctx;
      this.signature = this.geyInstanceSignature(canvas, ctx);
      this.drawPlaceholder(ctx);
    })
  },

  /**
   * @description 获取signature
   * @param canvas
   * @param context
   * @returns {*}
   */
  geyInstanceSignature(canvasInstance, context) {
    const ctx = context || this.ctx;
    const canvas = canvasInstance || this.canvas;
    const { backgroundColor, size, color } = this.properties;
    return new Signature(ctx, {
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
    });
  },

  /**
   * @description 绘制 placeholder
   * @param context
   */
  drawPlaceholder(context) {
    const ctx = context || this.ctx;
    const { orientation, placeholder } = this.properties;
    const { width, height, isDrawPlaceholder, signImageUrl } = this.data;
    if (!ctx || isDrawPlaceholder || signImageUrl !== '') {
      return;
    }
    this.signature.clear();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((orientation === 'left' ? 90 : -90) * Math.PI / 180);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ccc';
    ctx.font = '28px serif';
    ctx.fillText(placeholder, 0, 0, height);
    this.setData({ isDrawPlaceholder: true });
  },

  /**
   * @description 重置canvas上下文
   * @param context
   */
  cleanCanvas(context) {
    const ctx = context || this.ctx;
    const { orientation, backgroundColor } = this.properties;
    const { width, height, isDrawPlaceholder } = this.data;
    if (!isDrawPlaceholder) {
      return;
    }
    ctx.rotate((orientation === 'left' ? -90 : 90) * Math.PI / 180);
    ctx.translate(-width / 2, -height / 2);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    this.setData({ isDrawPlaceholder: false });
  },

  /**
   * 事件绑定
   */
  handleTouchStart(e) {
    this.cleanCanvas();
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
   * 显示自定义提示
   * title:提示内容
   * **/
  showSelfToast(title){
    this.setData({
      showVanLay:true,
      showVanLayTitle:title
    });
    setTimeout(()=>{
      this.setData({
        showVanLay:false,
        showVanLayTitle:""
      })
    },2000)
  },
  /**
   * 按钮事件
   */
  handleCancel() {
    this.triggerEvent('cancel');
  },
  handleClear() {
    // this.signature.clear();
    this.drawPlaceholder();
  },
  handleUndo() {
    this.signature.undo();
  },
  handleReset(){
    this.setData({
      signImageUrl:""
    });
    this.initSignature();
    this.triggerEvent('reset');
  },
  handleColor() {
    this.signature.color = '#' + Math.random().toString(16).slice(-6);
  },
  handleConfirm() {
    if (this.signature.isEmpty()) {
      let {noSignTip,isWxToast} = this.properties;
      if(isWxToast){
        wx.showToast({ icon: 'none', title: noSignTip });
      }else{
        this.showSelfToast(noSignTip);
      }
      return;
    }
    this.getRotateImage().then(url => {
      this.triggerEvent('confirm', url);
      // console.log(url);
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
          resolve(url)
          return
        //   wx.canvasToTempFilePath({
        //   canvas: offscreenCanvas,
        //   x: 0,
        //   y: orientation === 'right' ? 0 : height - width,
        //   width: height,
        //   height: width,
        //   success: res => resolve(res.tempFilePath),
        //   fail: reject,
        // }, this)
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

    // -----------------
  },
})
