import {
  BlogModels
} from '../../models/blog.js'
import {
  LikeCollectModel
} from '../../models/favor-collect.js'
import {
  randomStr
} from '../../util/common.js'

const blogModels = new BlogModels()
const likeCollectModel = new LikeCollectModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: [],
    searching: false,
    more: '',
    browseBlog: [],
    status: false // 监听登录后返回主页面的改变
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {    
    this.getLatestFourBlog()
    this.getBrowseMaxBlog()
  },

  getLatestFourBlog() {
    blogModels.getLatest()
      .then(res => {
        this.setData({
          blog: res
        })
      })
  },

  // 切换组件
  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  getBrowseMaxBlog() {
    blogModels.getBrowseMaxBlog()
      .then(res => {
        this.setData({
          browseBlog: res.data
        })
      })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: randomStr(16)
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成 只加载一次
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!wx.getStorageSync('token')) {
      this.setData({
        status: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})