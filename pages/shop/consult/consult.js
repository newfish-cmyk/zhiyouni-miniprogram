// pages/shop/consult/consult.js
Page({
  data: {
    expert:''
  },
  onLoad: function (options) {
    wx.cloud.database().collection('expert').get()
    .then(res=>{
      // console.log('专家列表',res)
      this.setData({
        expert:res.data
      })
    })
  },
  goDetail(e){
    // console.log("godetail",e)
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '../consult/detail/detail?id=' + id,
    })
  },
})