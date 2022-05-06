// pages/identification/identification.js
//通过API Key和Secret Key获取Access_token，再向API服务地址使用POST发送请求，调用AI服务相关的API接口
const grant_type = "client_credentials"//固定值
const client_id = "0LGOPPGhFstKDhdZylPzHh1M"//应用的API Key
const client_secret = "iQmfDyHu7d1B4M43xrzPUEaZsZdmoLMu"//应用的Secret Key
Page({
  data: {
    imageUrl: "/image/blank.jpg",//待识别的图片url
    token: "",//存储获取的Access_token
    base64data: "",//待识别图片转换为base64格式的数据
    resultdata: [],//识别结果
    onekey_click: false,//是否点击了一键识图并获得了识图结果
  },
  //获取Access_token
  get_access_token: function (res) {
    var that = this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret,
      method: 'POST',
      success: function (res) {
        that.setData({
          token: res.data.access_token
        })
      },
      fail: function (res) {
        console.log('Fail to request')
      }
    })
  },
  //使用本地相册或相机获取图片，并进行识图
  get_image: function(res) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success(res) {
        that.setData({
          imageUrl: res.tempFilePaths,//更新图片url
          onekey_click: false//隐藏上次识图记录
        })
        //把图片转换成base64格式的数据
        wx.getFileSystemManager().readFile ({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',//指定读取文件的编码格式为base64
          success: res=> {
            that.setData({
              base64data: res.data
            })
          },
          //获取base64数据结束后进行识图
          complete: res=> {
            that.identify_image()
          }
        })
      },
    })
  },
  //调用API接口进行识图
  identify_image: function (res) {
    var that = this
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + this.data.token,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: this.data.base64data
      },
      success: res=> {
        console.log('Identify success')   
        that.setData({
          resultdata: res.data.result,
          onekey_click: true
        })    
      }
    })
  },
  //一键传照识图
  onekey_identify: function (res) {
    this.get_access_token()
    this.get_image()
  }
})