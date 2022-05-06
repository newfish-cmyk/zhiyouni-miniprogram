// pages/my/plant/plant.js
const util = require("../../../utils/util")
Page({
  data:{
    list_show:true,
    delete_show:true,
    item:'',
    myopenid:''
  },
  onLoad: function(){
    // console.log("load")
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('user_plants').orderBy('time','desc').where({
      _openid:openid
    }).get({
      success(res){
        // console.log('获取数据成功',res)
        //格式化时间
        var item = res.data
        for(var l in item){
          item[l].time = util.formatTime(new Date(item[l].time))
        }
        // console.log(item)
        that.setData({
          plantList:item
        })
      }
    })
  },
  list(e){
    let list_show = this.data.list_show
    list_show = !list_show
    // console.log(list_show)
    this.setData({
      list_show:list_show
    })
  },
  add(){
    let list_show = true
    // console.log(list_show)
    this.setData({
      list_show:list_show
    })
    wx.navigateTo({
      url: 'add/add',
    })
  },
  show_delete(){
    let delete_show = this.data.delete_show
    delete_show = !delete_show
    this.setData({
      delete_show:delete_show
    })
  },
  exit(){
    let list_show = !this.data.list_show
    // console.log(list_show)
    this.setData({
      list_show:list_show
    })
  },
  getPlantsList(){
    let openid = wx.getStorageSync('openid')
    this.setData({
      myopenid:openid
    })
    var that = this
    wx.cloud.database().collection('user_plants').orderBy('time','desc').where({
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
          plantList:item
        })
      }
    })
  },
  delete(e){
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.cloud.database().collection('user_plants').doc(e.currentTarget.dataset.id).remove({
      success(res){
        // console.log(res)
        wx.showToast({
          icon:"none",
          title: '删除成功！',
        })
        that.getPlantsList()
      }
    })
    let list_show = true
    // console.log(list_show)
    that.setData({
      list_show:list_show
    })
    let delete_show = this.data.delete_show
    delete_show = !delete_show
    this.setData({
      delete_show:delete_show
    })
  },
  onPullDownRefresh(){
    this.getPlantsList()
  },
  godetail(e){
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '../plant/detail/detail?id=' + id,
    })
  }
})