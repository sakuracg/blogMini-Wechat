// components/collect/index.js
Component({


  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    isCollect: {
      type: Boolean
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: '../images/collect.png',
    noSrc: '../images/nocollect.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCollect(event) {
      if (this.isReadOnly()) {
        return
      }
      const collect = !this.properties.isCollect
      let collectBehavior = collect ? 'collect' : 'cancel'
      this.triggerEvent('collect', {
        collectBehavior
      })
    },

    // 查看是否只读
    isReadOnly() {
      return this.properties.readOnly ? true : false
    }
  }
})