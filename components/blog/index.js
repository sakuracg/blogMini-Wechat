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
    showLike: {
      type: Boolean
    },
    status: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeStatus: false,
    likeCount: 0,
    collectStatus: false,
    collectCount: 0
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      if (this.data.status && wx.getStorageSync('token')) {
        this.data.status = false
        this.getUserBlogStatus()
      }
      this.getUserBlogStatus()
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },



  attached() {
    this.setData({ // 设置喜欢和收藏个数
      likeCount: this.data.blog.favorNums,
      collectCount: this.data.blog.collectNums
    })
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
      likeCollectModel.getBlogLikeStatus(this.data.blog.id)
        .then(res => {
          this.setData({
            likeStatus: res.like_status,
            collectStatus: res.collect_status
          })
        })
    },

    onDetail() { // 请求博客文章
      wx.navigateTo({
        url: `/pages/blog-detail/blog-detail?bid=${this.data.blog.id}&artical=${this.data.blog.artical}`,
      })
    },

    onLike(event) { // 喜欢
      if (!checkUserLogin()) {
        return
      }
      const behavior = event.detail.likeBehavior // 喜欢或者不喜欢 like or cancel
      const likeStatus = behavior == 'like' ? true : false
      const count = this.data.likeCount
      this.setData({ // 设置喜欢状态
        likeStatus,
        likeCount: likeStatus ? count + 1 : count - 1
      })
      likeCollectModel.like(behavior, this.data.blog.id)
    },

    onCollect(event) { // 用户收藏
      if (!checkUserLogin()) {
        return
      }
      const behavior = event.detail.collectBehavior
      const collectStatus = behavior == 'collect' ? true : false
      const count = this.data.collectCount
      this.setData({ // 设置喜欢状态
        collectStatus,
        collectCount: collectStatus ? count + 1 : count - 1
      })
      likeCollectModel.collect(behavior, this.data.blog.id)
    }
  }
})