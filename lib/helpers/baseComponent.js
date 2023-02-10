/*
 * @Author: Chef Wu
 * @Date: 2022-12-02 10:46:18
 * @Last Modified by: Chef Wu
 * @Last Modified time: 2022-12-05 16:28:54
 */

const baseComponent = (options = {}) => {
  // add default externalClasses
  options.externalClasses = [
    ...(options.externalClasses = options.externalClasses || []),
  ]

  // add default behaviors
  options.behaviors = [
    ...(options.behaviors = options.behaviors || []),
  ]

  // add default options
  options.options = {
    multipleSlots: true,
    ...options.options,
  }

  // add default props
  options.properties = {
    ...(options.properties || {}),
    ossUrl: {
      type: String,
      value: 'http://static-img-barrel-1306477242.cos.ap-chengdu.myqcloud.com/icon/piller', // TODO: 请替换自己的OSS地址
    },
    theme: {
      type: String,
      value: 'blue',
      observer: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.onThemeChange(newVal);
        }
      }
    },
  }

  // 属性的类型（可以指定多个）
  options.properties && Object.keys(options.properties).forEach((propKey) => {
    const prop = options.properties[propKey]
    if (Array.isArray(prop.type)) {
      prop.optionalTypes = prop.type
    }
  })

  // add default methods
  options.methods = {
    ...(options.methods || {}),
    onThemeChange: options.methods.onThemeChange || (() => {}),
  }

  return Component(options);
}

export default baseComponent;
