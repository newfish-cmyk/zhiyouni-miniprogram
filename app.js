// app.js
App({
  globalData:{
   currentTab:0,
   userInfo: null
  },

  onLaunch:function(){
    wx.cloud.init({
      env:"test-2gl8c00d4629c1d6"
    })
  }
   
})
