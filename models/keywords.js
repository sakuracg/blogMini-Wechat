import {
  HTTP
} from '../util/http-p.js'

class KeywordModel extends HTTP {

  // 实例属性
  key = 'q'
  maxLength = 10

  getHistory() {
    const keys = wx.getStorageSync(this.key)
    if (!keys) {
      return []
    }
    return keys
  }

  getHot() {
    return this.request({
      url: 'blog/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    let has = words.includes(keyword)
    if (!has) {
      // 判断数组长度
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeywordModel
}