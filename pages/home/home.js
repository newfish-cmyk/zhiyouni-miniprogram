// pages/home/home.js
const util = require("../../utils/util")
Page({
  data:{
    item:'',
    myopenid:''
  },
  onShow:function(){
    // 判断是否登录
    let user = wx.getStorageSync('user')
    if(!user){
      wx.navigateTo({
        url: '../login/login',
      success:function(res){
        wx.showToast({
          icon:'none',
          title: '请先登录',
        })
      }
      })
    }
  },
  onLoad: function(){
    setTimeout(function(){},1000)
    let user = wx.getStorageSync('user')
    if(!user){}
    else{
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('note').orderBy('time','desc').get({
      success(res){
        //格式化时间
        var item = res.data
        for(var l in item){
          item[l].time = util.formatTime(new Date(item[l].time))
        }
        
        that.setData({
          noteList:item
        })
      }
    })}
  },
  write(){
    wx.navigateTo({
      url: '../home/write/write',
    })
  },
  getNotesList(){
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('note').orderBy('time','desc').get({
      success(res){
        // console.log('获取数据成功',res)
        //格式化时间
        var item = res.data
        for(var l in item){
          item[l].time = util.formatTime(new Date(item[l].time))
        }

        that.setData({
          noteList:item
        })
      }
    })
  },
  delete(e){
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.cloud.database().collection('note').doc(e.currentTarget.dataset.id).remove({
      success(res){
        // console.log(res)
        wx.showToast({
          icon:"none",
          title: '删除成功！',
        })
        that.getNotesList()
      }
    })
  },
  onPullDownRefresh(){
    this.getNotesList()
  },
  godetail1(){
    // console.log("111")
    wx.navigateTo({
      url: '../home/activities/activity1/activity1',
    })
  },
  godetail2(){
    // console.log("222")
    wx.navigateTo({
      url: '../home/activities/activity2/activity2',
    })
  },
  godetail3(){
    // console.log("333")
    wx.navigateTo({
      url: '../home/activities/activity3/activity3',
    })
  }
})