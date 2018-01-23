//happy.js
const innerAudioContext = wx.createInnerAudioContext()
const ANIMATION = "animation: "
const WHIRL = "whirl 10s linear infinite"
const TOAST = {
  last: "前面没有歌歌了...",
  next: "后面没有歌歌了...",
  museResErr: "音乐加载失败...(哭唧唧)"
}
const RES = require('./res')
const RESOURCE = []
RES.map((res, idx)=>{
  RESOURCE.push(
    Object.assign(res,{index: idx})
  )
})

Page({
  data: {
    logs: Object,
    play: true,
    whirl: "none",
    list: RESOURCE,
    index: RESOURCE[0],
    toast: undefined,
    hide: true,
    page: String
  },
  onLoad: function () {
    wx.request({
      url:'http://localhost:3004/assign/happy.json',
      dataType: 'json'
    },res => {
      console.log(res)
    })
    const page = this.route.split('/')[2]
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = this.properties.list[0].muse
    innerAudioContext.onPlay(() => {
      this.setData({ 
        whirl: `${ANIMATION}${WHIRL}`
      })
    })
    innerAudioContext.onError((res) => {
      this.toast(TOAST.museResErr, 2000)
      this.setData({
        play: false,
        whirl: `${ANIMATION}none`
      })
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    this.setData({
      page,
      index: this.properties.list[0]       
    })
  },
  onShow: function () {
    this.setData({ hide: true })
  },
  onHide: function () {
    this.setData({ hide: false })
  },
  onClickImg: function () {
    const state = !this.data.play
    const animation = state ? WHIRL : `none`
    if(state) {
      innerAudioContext.play(() => {})
    } else {
      innerAudioContext.pause(() => {})
    }
    this.setData({ 
      play: state,
      whirl: `${ANIMATION}${animation}`
    })
  },
  last: function () {
    const { index } = this.data.index
    if (index == 0) {
      this.toast(TOAST.last, 3000)
    } else {
      this.setData({
        index: this.properties.list[index-1]
      },()=>{
        innerAudioContext.src = this.data.index.muse
        this.data.play ? null : this.onClickImg()
      })      
    }
  },
  next: function () {
    const { index } = this.data.index
    const { list } = this.properties
    if (index == list.length-1) {
      this.toast(TOAST.next, 3000)
    } else {
      this.setData({
        index: list[index+1]
      },()=>{
        innerAudioContext.src = this.data.index.muse
        this.data.play ? null : this.onClickImg()
      })      
    }
  },
  toast: function (msg, time = 3000) {
    this.setData({ toast: msg })
    setTimeout(()=> {
      this.setData({ toast: "" })
    }, time)
  }
})
