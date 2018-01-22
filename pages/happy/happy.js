//happy.js
const RES = require('./res')
const RESOURCE = []
RES.map((res, idx)=>{
  RESOURCE.push(
    Object.assign(res,{index: idx})
  )
})

Page({
  data: {
    logs: [],
    play: true,
    whirl: "none",
    list: RESOURCE,
    index: RESOURCE[0],
    toast: undefined,
    hide: true
  },
  onLoad: function () {
    // innerAudioContext.autoplay = true
    // innerAudioContext.loop = true
    // innerAudioContext.src = this.data.index.muse
    // innerAudioContext.onPlay(() => {
    //   this.setData({ 
    //     whirl: `${ANIMATION}${WHIRL}`
    //   })
    // })
    // innerAudioContext.onError((res) => {
    //   this.toast(TOAST.museResErr, 2000)
    //   this.setData({
    //     play: false,
    //     whirl: `${ANIMATION}none`
    //   })
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })                             
    // })
  },
  onShow: function () {
    this.setData({ hide: true })
  },
  onHide: function () {
    this.setData({ hide: false })
  },
  toast: function (msg, time = 3000) {
    this.setData({ toast: msg })
    setTimeout(()=> {
      this.setData({ toast: "" })
    }, time)
  }
})
