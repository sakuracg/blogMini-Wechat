import {
  KeywordModel
} from '../../models/keywords.js'
import {
  BlogModels
} from '../../models/blog.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const blogModel = new BlogModels()

Component({
  // 组件使用行为
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  attached() {
    // setData 是在wxml 中绑定的时候需要用这个来更新数据 动态绑定
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    /**
     * search 组件复用的话  设置公共数据属性 从page里面传入数据
     */
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hots
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消搜索事件
    onCancel() {
      // 初始化搜索后的数据
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    // 输入框回车后触发
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // 搜索成功后动态绑定输入框的值
      const q = event.detail.value || event.detail.text
      blogModel.search(0, q).then(res => {
        // console.log(res)  第一次行为
        this.setMoreData(res.blogs)
        this.setTotal(res.total)
        this.setData({
          q
        })
        this._closeLoadingCenter()
        keywordModel.addToHistory(q)
      })
    },

    // 删除输入框的文本
    onDeleteText(event) {
      // 初始化搜索后的数据
      this.initialize()
      this._closeResult()
    },

    // 页面上拉触底事件的处理函数
    // 使用 Page组件中的onReachBottom()钩子  或者 scroll-view
    loadMore() {
      const q = this.data.q
      if (!q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked() // 还有数据之后再上锁        
        blogModel.search(this.getCurrentStart(), q)
          .then(res => {
            this.setMoreData(res.blogs)
            this.unlocked() // 解锁
          }, err => {
            this.unlocked() // 调用接口失败也解锁
          })
      }
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _closeLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})