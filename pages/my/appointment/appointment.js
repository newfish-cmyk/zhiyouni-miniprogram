Page({
  data:{
    appointment:'',
    active:false,
    startX:'',
    totalvalue:'00.00'
  },
  onLoad: function (options) {
    let appointment = wx.getStorageSync('appointment')
    // console.log("goods",goods)
    this.setData({
      appointment:appointment
    })
  },
  touchstart:function(e){
    // console.log("touchX",e.touches[0].clientX)
    // var startX = e.touches[0].clientX
    this.setData({
      startX:e.touches[0].clientX
    })
  },
  touchmove:function(e){
    // console.log(e.touches[0].clientX)
    var index = e.currentTarget.dataset.index
    var appointment = this.data.appointment
    var endX = e.touches[0].clientX  
    if(endX+10<this.data.startX){
      appointment[index].active = true;
    }else{
      appointment[index].active = false;
    }
    this.setData({
      appointment:appointment
    })
  },
  delete(e){
    console.log(e)
    let cartlist = wx.getStorageSync('appointment')
    let i = e.currentTarget.dataset.index
    cartlist.splice(i,1)
    wx.setStorageSync('appointment', cartlist)
    wx.showToast({
      icon:'none',
      title: '删除成功',
    })
    let appointment = wx.getStorageSync('appointment')
    // console.log("appointment",appointment)
    this.setData({
      appointment:appointment
    })
  },
})