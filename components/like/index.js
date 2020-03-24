// components/like/index.js
Component({

  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    islike: { type: Boolean },
    readOnly: { type: Boolean }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: '../images/like.png',
    noSrc: '../images/nolike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if (this.isReadOnly()) {
        return
      }
      const like = !this.properties.islike 
      const likeBehavior = like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        likeBehavior
      }, {})
    },

    // 查看是否只读
    isReadOnly() {
      return this.properties.readOnly ? true : false
    }
  }
})