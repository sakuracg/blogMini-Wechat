// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: {
      type: Object
    },
    changeStatus: {
      type: Boolean
    }
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
    onDetail() { // 请求博客文章
      wx.navigateTo({
        url: `/pages/blog-detail/blog-detail?bid=${this.data.blog.id}&artical=${this.data.blog.artical}`,
      })
    },
  }
})