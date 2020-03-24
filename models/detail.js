import {
  HTTP
} from '../util/http-p.js'

class DetailModels extends HTTP {
  // 得到博客详情
  getBlogDetail(bid){
    return this.request({
      url: `blog/${bid}/detail`,      
    })
  }

  // 得到博客文章
  getBlogArtical(mdUrl) {
    return this.request({
      url: 'blog/artical',
      data:{
        mdUrl
      }
    })
  }

  // 得到用户是否点赞数据
  getLikeCollectStatus(bid) {
    return this.request({
      url: `blog/${bid}/likeStatus`,      
    })
  }

}

export {
  DetailModels
}