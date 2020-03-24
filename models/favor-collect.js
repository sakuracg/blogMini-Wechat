import {
  HTTP
} from '../util/http-p.js'

class LikeCollectModel extends HTTP {
  like(behavior, blogId) {
    let url = behavior === 'like' ? 'blog/like' : 'blog/dislike'
    return this.request({
      url,
      method: 'POST',
      data: {
        blogId
      }
    })
  }

  collect(behavior, blogId) {
    let url = behavior === 'collect' ? 'blog/collect' : 'blog/disCollect'
    return this.request({
      url,
      method: 'POST',
      data: {
        blogId
      }
    })
  }

  // 得到用户对于某篇博客的喜欢以及收藏状态
  getBlogLikeStatus(blogId) {
    return this.request({
      url: `blog/${blogId}/likeStatus`,
    })
  }

  isCollectBlog(blogId) {
    return this.request({
      url: 'blog/user/isCollect',
      method: 'POST',
      data: {
        blogId
      }
    })
  }
}

export {
  LikeCollectModel
}