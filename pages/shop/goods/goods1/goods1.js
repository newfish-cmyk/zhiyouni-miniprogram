Page({
  data:{
    detail:'',
    cartlist:[]
  },
  onLoad(opt){
    let id = opt.id
    wx.cloud.database().collection('goods').doc(id).get()
    .then(res=>{
      this.setData({
        detail:res.data
      })
      // let detail = res.data
    })
  },
  add(e){
    // console.log("detail",this.data.detail)
     let detail = this.data.detail
     var cartlist = []
     let goods = wx.getStorageSync('goods') || []
     cartlist = cartlist.concat(goods)
     cartlist.push(detail)
     wx.setStorageSync('goods', cartlist)
    wx.showToast({
      icon:'none',
      title: '添加成功，请前往“我的购物”查看',
    })
  }
})