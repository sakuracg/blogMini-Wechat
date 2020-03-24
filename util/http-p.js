import {
  Base64
} from 'js-base64'
import {
  config
} from '../config.js'

const tips = {
  1: '主银，服务器君出现错误啦~',
  10400: '主银，参数错误喔',
  10403: '主银，不要重复操作唷',
  10404: '主银，没有资源呐',

}

// Promise 调用用法

class HTTP {

  async request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        const code = res.statusCode.toString()
        const data = res.data
        if (code.startsWith('2') && !data.errorCode) {
          resolve(data)
        } else {
          reject()
          this._show_error(data.msg, data.errorCode)
        }
      },
      fail: (err) => {
        reject()
        this._show_error()
      }
    })
  }

  _encode() {
    // 把token: 当成 account:password 进行加密
    // token 进行base64 位加密
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    // Authorization:Basic base64
    return 'Basic ' + base64
  }

  _show_error(msg, errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    wx.showToast({
      title: msg || tips[errorCode],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}