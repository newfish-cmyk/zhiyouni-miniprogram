Page({
  data:{
    detail:{
    dates: '',
    times: ''
    },
    cartlist:[],
    mask:'false'
  },
  onLoad(opt){
    let id = opt.id
    wx.cloud.database().collection('expert').doc(id).get()
    .then(res=>{
      this.setData({
        detail:res.data
      })
      // let detail = res.data
    })
  },
  appoint(){
    let mask = !this.data.mask
    this.setData({
      mask:mask,
      'detail.dates':'2022-2-6',
      'detail.times':'12:00'
    })
  },
  exit(){
    let mask = !this.data.mask
    this.setData({
      mask:mask
    })
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
   this.setData({
     'detail.dates': e.detail.value
   })
  },
  bindTimeChange: function (e) {
    this.setData({
      'detail.times': e.detail.value
    })
  },
  confirm(){
    let detail = this.data.detail
     var cartlist = []
     let goods = wx.getStorageSync('appointment') || []
     cartlist = cartlist.concat(goods)
     cartlist.push(detail)
     wx.setStorageSync('appointment', cartlist)
     wx.showToast({
      title: '预约成功',
    })
  },
})