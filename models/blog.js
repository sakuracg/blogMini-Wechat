import {
  HTTP
} from '../util/http-p.js'

class BlogModels extends HTTP {
  getLatest() {
    // 写入缓存  缓存没有再发起请求  里面还有点赞收藏内容，总体来说就五次请求不值得 先改了吧
    // let res = wx.getStorageSync('latestBlogs')
    // if (!res) {
    return this.request({
      url: 'blog/latestfive'
    })
  }

  search(start, q) {
    return this.request({
      url: 'blog/search?summary=1',
      data: {
        q,
        start,
      }
    })
  }

  getBrowseMaxBlog(){
    return this.request({
      url: 'blog/browse/maxlist'
    })
  }  
}

export {
  BlogModels
}