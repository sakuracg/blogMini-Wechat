const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData: function(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult: true
        })
      }
    },
    // 两种方法，在setMoreData 中判断数组是否为空
    // 或者服务器API中的total 与当前的dataArray 数组长度判断
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },

    initialize() {
      // 用数据绑定 把页面的数据也清空 要不loading动画加载与数据重合
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
      })
    },

    // 加入锁来限制重复请求API
    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({ // 因为需要改变wxml 中loading 不能用this.data.loading 来改变数据
        loading: true
      })
    },

    unlocked() {
      this.setData({
        loading: false
      })
    }

  }
})

export {
  paginationBev
}