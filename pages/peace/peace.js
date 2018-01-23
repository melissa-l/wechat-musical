//peace.js
const RES = require('./res')
const RESOURCE = []
RES.map((res, idx)=>{
  RESOURCE.push(
    Object.assign(res,{index: idx})
  )
})
const TOAST = {
  last: "前面没有歌歌了...",
  next: "后面没有歌歌了...",
  museResErr: "音乐加载失败...(哭唧唧)"
}

Page({
  data: {
    logs: [],
    play: true,
    whirl: "none",
    list: RESOURCE,
    toast: undefined,
    hide: true
  },
  onLoad: function () {
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
