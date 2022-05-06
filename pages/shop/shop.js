// pages/shop/shop.js
const app = getApp()
Page({
  data: {
    navbar: ['植物商城', '专家预约','爱心助农'],
    currentTab: 0,
  },
  click1(){
    wx.navigateTo({
      url: '../shop/category/category1/category1',
    })
  },  
  click2(){
    wx.navigateTo({
      url: '../shop/category/category2/category2',
    })
  },
  click3(){
    wx.navigateTo({
      url: '../shop/category/category3/category3',
    })
  },
  click4(){
    wx.navigateTo({
      url: '../shop/category/category4/category4',
    })
  },
  click5(){
    wx.navigateTo({
      url: '../shop/category/category5/category5',
    })
  },
  click6(){
    wx.navigateTo({
      url: '../shop/category/category6/category6',
    })
  },
  click7(){
    wx.navigateTo({
      url: '../shop/category/category7/category7',
    })
  },
  click8(){
    wx.navigateTo({
      url: '../shop/category/category8/category8',
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
    //全局变量
    app.globalData.currentTab = e.detail.current;
  },
  onLoad: function (options) {
    wx.cloud.database().collection('goods').get()
    .then(res=>{
      // console.log("商品列表",res)
      this.setData({
        goods:res.data
      })
    })
    wx.cloud.database().collection('swiper').get()
    .then(res=>{
      // console.log("商品列表",res.data[0].image)
      this.setData({
        swiper_image:res.data[0].image,
        category_image:res.data[1].image
      })
    })
  },
  //去商品详情页
  goDetail(e){
    // console.log("godetail",e.currentTarget.dataset.item)
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '../shop/goods/goods1/goods1?id=' + id,
    })
  },
  //去专家咨询页
  goConsult(){
    wx.navigateTo({
      url: '../shop/consult/consult',
    })
  }
})
