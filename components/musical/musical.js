const innerAudioContext = wx.createInnerAudioContext()
const ANIMATION = "animation: "
const WHIRL = "whirl 10s linear infinite"
const TOAST = {
  last: "前面没有歌歌了...",
  next: "后面没有歌歌了...",
  museResErr: "音乐加载失败...(哭唧唧)"
}

Component({
    properties: {
      list: Object
    },
    data: {
      logs: [],
      play: true,
      whirl: "none",
      index: {},
      toast: undefined,
    },
    attached: function () {
    },
    ready: function () {
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
        index: this.properties.list[0]       
      })
    },
    moved: function () {
      console.log('moved')
    },
    methods: {
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
    }
  })