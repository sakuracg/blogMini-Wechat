import {
  UserModel
} from '../../models/user.js'
import {
  checkUserLogin
} from '../../util/common.js'
import {
  HTTP
} from '../../util/http.js'

let Http = new HTTP()
const userModel = new UserModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    likeBlog: [],
    collectBlog: [],
    likeCount: 0,
    collectCount: 0,
    changeStatus: true, // 喜欢面板是true
    likeSrc: '/images/like-text.png',
    collectSrc: '/images/collect-text.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    if (checkUserLogin(false)) {
      this.getLikeBlogCon()
      this.getCollectBlogCon()
    }
  },

  getLikeBlogCon() {
    userModel.getMyLikeBlogCon().then(res => {
      this.setData({
        likeBlog: res.blogLikes,
        likeCount: res.count
      })
    })
  },

  getCollectBlogCon() {
    userModel.getMyCollectBlogCon().then(res => {
      this.setData({
        collectBlog: res.blogCollects,
        collectCount: res.count
      })
    })
  },

  userAuthorized() { // 第二次登录检查用户是否授权    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                userInfo: res.userInfo
              })
              if (checkUserLogin(false)) {
                this.setData({
                  authorized: true
                })
              }
            }
          })
        }
      }
    })
  },

  // 用户授权后立刻执行改变头像  再次加载并不会执行了 
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
      this.login()
    }
  },

  login() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId        
        if (res.code) {
          Http.request({
            url: 'token/login',
            method: 'POST',
            data: {
              account: res.code,
              type: 102
            },
            success: (res) => {
              wx.setStorageSync('token', res.token) // 登陆完 设置token              
              this.getLikeBlogCon() // 并设置喜欢收藏状态
              this.getCollectBlogCon()
            }
          })
        }
      }
    })
  },

  onAboutMe() {
    wx.navigateTo({
      url: '/pages/aboutme/aboutme'
    })
  },

  onLike() {
    this.setData({
      changeStatus: true
    })
  },

  onCollect() {
    this.setData({
      changeStatus: false
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
    if (checkUserLogin(false)) {
      this.getLikeBlogCon()
      this.getCollectBlogCon()
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