// pages/home/home.js
const util = require("../../../utils/util")
Page({
  data:{
    item:'',
    myopenid:''
  },
  onLoad: function(){
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('note').orderBy('time','desc').where({
      _openid:openid
    }).get({
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
  write(){
    wx.navigateTo({
      url: '../../home/write/write',
    })
  },
  getNotesList(){
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('note').orderBy('time','desc').where({
      _openid:openid
    }).get({
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
  }
})