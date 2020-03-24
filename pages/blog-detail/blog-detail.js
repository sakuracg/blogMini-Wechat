import {
  DetailModels
} from '../../models/detail.js'
import {
  LikeCollectModel
} from '../../models/favor-collect.js'
import {
  checkUserLogin
} from '../../util/common.js'


const detailModels = new DetailModels()
const likeCollectModel = new LikeCollectModel()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: null,
    likeStatus: false,
    collectStatus: false,
    timer: 0, // 时间的时间戳
    articleNew: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const bid = options.bid
    const artical = options.artical
    this.getBlogDetail(bid)
    this.getArtical(artical)
    if (checkUserLogin(false)) {
      this.getUserBlogStatus(bid)
    }
  },

  getBlogDetail(bid) {
    detailModels.getBlogDetail(bid)
      .then(res => {
        this.setData({
          blog: res.data,
          timer: +new Date(res.data.created_at)
        })
      })
  },

  getArtical(mdUrl) {
    detailModels.getBlogArtical(mdUrl)
      .then(res => {
        const result = app.towxml(res.data, 'markdown', {
          theme: 'light', // 主题，默认`light`
        })
        this.setData({
          articleNew: result
        })
      })
  },

  getUserBlogStatus(id) { // 登录时用户是否喜欢
    likeCollectModel.getBlogLikeStatus(id)
      .then(res => {
        this.setData({
          likeStatus: res.like_status,
          collectStatus: res.collect_status
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})