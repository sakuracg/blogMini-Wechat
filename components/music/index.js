const mMgr = wx.getBackgroundAudioManager()
// const mMgr = wx.createInnerAudioContext()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    playing: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: '../images/play.png',
    pauseSrc: '../images/pause.png'
  },

  /**
   * 组件进入dom节点树时调用
   */
  attached: function(){
    this._recoverStatus()
    this._monitorSwitch()
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        // 切换图片
        this.setData({
          playing: true
        })
        mMgr.title = '此时此刻'
        // 设置了 src 之后会自动播放
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }


    },

    // 检查并恢复  暂停和播放的状态
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    },
    
    // 监听背景音乐面板的事件
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})