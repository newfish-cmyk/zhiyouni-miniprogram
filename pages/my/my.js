// pages/my/my.js
Page({
data:{
  userInfo:'',
  id:''
},
onShow(){
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
  let id = wx.getStorageSync('id')
  // console.log(user)
  this.setData({
    userInfo:user,
    id:id
  })
},
note(){
  wx.navigateTo({
    url: '../my/note/note',
  })
},
star(){
  wx.navigateTo({
    url: '../my/star/star',
  })
},
plant(){
  wx.navigateTo({
    url: '../my/plant/plant',
  })
},
appointment(){
  wx.navigateTo({
    url: '../my/appointment/appointment',
  })
},
cart(){
  wx.navigateTo({
    url: '../my/cart/cart',
  })
},
message(){
  wx.navigateTo({
    url: '../my/message/message',
  })
},
setting(){
  wx.navigateTo({
    url: '../my/setting/setting',
  })
},

})
