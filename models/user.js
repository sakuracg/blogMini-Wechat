import {
  HTTP
} from '../util/http-p.js'

class UserModel extends HTTP {
  getMyLikeBlogCon() {
    return this.request({
      url: 'blog/user/allLike',
      method: 'POST'
    })
  }

  getMyCollectBlogCon() {
    return this.request({
      url: 'blog/user/allCollect',
      method: 'POST'
    })
  }
}

export {
  UserModel
}