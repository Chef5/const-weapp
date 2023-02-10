import baseComponent from '../helpers/baseComponent';

baseComponent({
  properties: {
    //  弹窗标题
    title: {
      type: String,
      value: ""
    },
    // 默认选中值
    value: {
      type: String,
      value: '',
    },
    // 下拉数据
    list: {
      type: Array,
      value: [],
    },
    // 提示语
    placeholder: {
      type: String,
      value: '请选择'
    },
    // loading状态
    loading: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    menuShow: false,
    columns: [],
    defaultIndex: -1,
    selectValue: null,
  },
  observers: {
    value: function (val) {
      if (val && this.properties.list.length > 0) {
        const defaultIndex = this.properties.list.findIndex((t) => t.value === val);
        this.setData({
          defaultIndex,
          selectValue: defaultIndex === -1 ? {
            label: val,
            value: val
          } : this.properties.list[defaultIndex]
        });
      }
    },
    list: function (val) {
      if (this.properties.value && (val || []).length > 0) {
        const defaultIndex = val.findIndex((t) => t.value === this.properties.value);
        this.setData({
          defaultIndex,
          selectValue: val[defaultIndex]
        });
      }
      this.setData({
        columns: val,
      });
    },
  },
  methods: {
    /**
     * @description 展开选项
     */
    handleMenu() {
      this.setData({
        menuShow: true
      });
    },
    /**
     * @description 关闭弹窗
     * @param event
     */
    onClose(event) {
      this.setData({
        menuShow: false
      });
      if (this.data.defaultIndex === -1 && this.data.columns.length > 0) {
        const index = 0;
        const value = this.data.columns[index];
        console.log(`未选择关闭 默认索引：${index}，当前值：`, value);
        const selectValue = this.data.columns[index]
        this.setData({
          selectValue
        });
        this.triggerEvent('change', {
          index,
          selectValue
        });
      }
    },
    /**
     * @description 选择项改变
     * @param event
     */
    onChange(event) {
      const {
        picker,
        value,
        index
      } = event.detail;
      console.log(`当前索引：${index}，当前值：`, value);
      const selectValue = this.data.columns[index]
      this.setData({
        selectValue,
        defaultIndex: index
      });
      this.triggerEvent('change', {
        index,
        selectValue
      });
    },
  }
})
