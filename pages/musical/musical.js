//musical.js
const util = require('../../utils/util.js')

const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.src = "http://m10.music.126.net/20180119114350/9aead10733ee311a3c9a812bfddc33f0/ymusic/1aa3/f95b/5219/2339efd496a6eadc6327e79397c53d22.mp3"
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
