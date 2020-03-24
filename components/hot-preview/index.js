import {
  LikeCollectModel
} from '../../models/favor-collect.js'
import {
  checkUserLogin
} from '../../util/common.js'

const likeCollectModel = new LikeCollectModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: {
      type: Object
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collectStatus: false,
  },

  attached() {
    const token = wx.getStorageSync('token')
    if (token) {
      this.getUserBlogStatus() // 登录时查看用户是否喜欢
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserBlogStatus() { // 登录时用户是否喜欢
      likeCollectModel.isCollectBlog(this.data.blog.id)
        .then(res => {
          this.setData({
            collectStatus: res.collect_status
          })
        })
    },

    onDetail() { // 请求博客文章
      wx.navigateTo({
        url: `/pages/blog-detail/blog-detail?bid=${this.data.blog.id}&artical=${this.data.blog.artical}`,
      })
    },

    onCollect(event) { // 用户收藏
      if (!checkUserLogin()) {
        return
      }
      const behavior = event.detail.collectBehavior
      const collectStatus = behavior == 'collect' ? true : false
      this.setData({ // 设置喜欢状态
        collectStatus
      })
      likeCollectModel.collect(behavior, this.data.blog.id)
    }
  }
})