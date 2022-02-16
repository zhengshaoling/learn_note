const app = getApp()
var timer = ''
Page({
  data: {
    list: [1,2,3,4,5,6,7,8,9,10],
    title: [1,2,3,4,5,6,7,8,9,10],
    scrollLeft: 0,
    isIPhone: false
  },

  onLoad() {
    let model = wx.getSystemInfoSync().model;
    return;
    let isIPhone = model.indexOf('iPhone') > -1 || false;
    this.setData({
      isIPhone
    })
  },
  // 禁止滚动
  cannotmove() {
    return;
  },
  getMore() {
    let list = this.data.list;
    let len = list.length;
    if(len >=50) return;
    for(let i = len-1; i < len+20; i++) {
      list.push(i)
    };
    this.setData({
      list
    })
  },
  scroll(e) {
    clearTimeout(timer);
    timer = setTimeout(()=>{
      this.setData({
        scrollLeft: e.detail.scrollLeft
      })
    },200)
  },
})
