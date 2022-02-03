// pages/my/my.js
Page({
data:{
  userInfo:'',
  id:''
},
onShow(){
  let user = wx.getStorageSync('user')
  let id = wx.getStorageSync('id')
  // console.log(user)
  this.setData({
    userInfo:user,
    id:id
  })
},
// logout(){
//   this.setData({
//     userInfo:'',
//     id:0
//   })
//   wx.setStorageSync('user', null)
//   wx.setStorageSync('id', null)
//   wx.navigateTo({
//     url: '../login/login',
//   })
// },
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
}
})
