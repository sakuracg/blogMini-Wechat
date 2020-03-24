// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event) {
      const text = this.properties.text
      this.triggerEvent('tapping', {
        text
      }, {})
    }
  }
})