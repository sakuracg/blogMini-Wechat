//app.js
import {
  HTTP
} from '/util/http-p.js'
const Http = new HTTP()

App({
  towxml: require('/towxml/index'),
  onLaunch: function() {
    // 验证token
    Http.request({
      url: 'token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (!res.is_valid) {
        wx.removeStorageSync('token')
      }
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId 
    //     console.log(res)
    //     if (res.code) {
    //       Http.request({
    //         url: 'token/login',
    //         method: 'POST',
    //         data: {
    //           account: res.code,
    //           type: 102
    //         },
    //         success: (res) => {
    //           console.log(res, 2)
    //           wx.setStorageSync('token', res.token) // 登陆完 设置token              
    //           // this.getLikeBlogCon() // 并设置喜欢收藏状态
    //           // this.getCollectBlogCon()
    //         }
    //       })
    //     }
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {}
})