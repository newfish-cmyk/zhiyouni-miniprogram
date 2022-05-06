// pages/my/setting/setting.js
Page({
  logout(){
    this.setData({
      userInfo:'',
      id:0
    })
    wx.setStorageSync('user', null)
    wx.setStorageSync('id', null)
    wx.setStorageSync('openid', null)
    wx.navigateTo({
      url: '../../login/login',
    })
  }
})