// pages/my/cart/cart.js
Page({
  data:{
    goods:'',
    active:false,
    startX:'',
    totalvalue:'0.00'
  },
  onLoad: function (options) {
    let goods = wx.getStorageSync('goods')
    // console.log("goods",goods)
    this.setData({
      goods:goods
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
    var goods = this.data.goods
    var endX = e.touches[0].clientX  
    if(endX+10<this.data.startX){
      goods[index].active = true;
    }else{
      goods[index].active = false;
    }
    this.setData({
      goods:goods
    })
  },
  delete(e){
    // console.log(e)
    let cartlist = wx.getStorageSync('goods')
    let i = e.currentTarget.dataset.index
    cartlist.splice(i,1)
    wx.setStorageSync('goods', cartlist)
    wx.showToast({
      icon:'none',
      title: '删除成功',
    })
    let goods = wx.getStorageSync('goods')
    // console.log("goods",goods)
    this.setData({
      goods:goods
    })
  },
  select:function(e){
    var index = e.currentTarget.dataset.index;
    var goods = this.data.goods
    goods[index].isSelected = !goods[index].isSelected;
    this.setData({
      goods:goods
    })
    this.gettotalvalue()
  },
  gettotalvalue:function(){
    var goods = this.data.goods;
    var sum = 0;
    for(var i=0;i<goods.length;i++){
      if(goods[i].isSelected){
        sum += goods[i].value;
      }
      this.setData({
        totalvalue:sum.toFixed(2)
      })
    }
  },
  pay:function(){
    wx.showToast({
      icon:"none",
      title: '没货，不卖',
    })
  }
})