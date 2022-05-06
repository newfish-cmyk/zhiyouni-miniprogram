const app = getApp()

Page({
  data: {
    dataFall: []
  },
  onLoad:function(){
    //读取数据set到dataFall中
    var that = this
    wx.cloud.database().collection('plants').orderBy('id','asc').get({
      success(res){
        // console.log('读取成功',res.data)
        that.setData({
          dataFall:res.data
        })
      }
    })
  },
  goSearch(){
    wx.navigateTo({
      url: '../zhishi/identification/identification',
    })
  },
  gotoSearch(){
    wx.navigateTo({
      url: '../zhishi/searchpage/searchpage',
    })
  }
})