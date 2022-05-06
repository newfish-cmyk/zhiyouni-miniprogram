// pages/home/write/write.js
Page({
  data:{
    user:'',
    write:'',
    tempFilePaths:'',
    tempFilePaths_show:'',
    imgURL:[]
  },
  onLoad: function (options) {
    wx.setStorageSync('temp_img', '')
  },
  write(e){
    this.setData({
      write:e.detail.value
    })
  },
  publish(){
    //加载状态
    wx.showLoading({
      title: '发布中...',
      mask:'true'
    })
    let user = wx.getStorageSync('user')
    this.setData({
      user:user
    })
    var text = this.data.write

    // console.log('text',text)
    wx.cloud.database().collection('note').add({
      data:{
        nickName:user.nickName,
        avatar:user.avatarUrl,
        image:this.data.imgURL,
        text:text,
        time:Date.now()
      },
      success(res){
        // console.log(res)
        wx.navigateBack({
          success(res){
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
              title: '发布成功',
            })
          }
        })
      }
    })
  },
  choose_img(){
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
        var tempFilePaths = res.tempFilePaths //获取上传图片的暂时路径数组
        var tempFilePaths_show = res.tempFilePaths
        let temp_img = wx.getStorageSync('temp_img') || []  //获取原本有的数组
        tempFilePaths_show = tempFilePaths_show.concat(temp_img)  //将现在的数组和原本有的数组连起来
        
        that.setData({
          tempFilePaths:tempFilePaths  //set到that.data里
        })
        that.setData({
          tempFilePaths_show:tempFilePaths_show  //set到that.data里
        })
        // console.log(that.data.tempFilePaths)
        wx.setStorageSync('temp_img', tempFilePaths_show)  //将此时的数组存在本地
        // 上传图片
        for (let i = 0; i < tempFilePaths.length; i += 1) {
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePaths[i], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            // console.log("上传成功",res.fileID)
            let imgURL = that.data.imgURL  //获取添加前的路径数组
            imgURL.push(res.fileID)
            // console.log(imgURL)
            //获取文件路径
            that.setData({
              imgURL:imgURL
            })
          },
          fail: console.error
        })
         }
      }
    })
  },
  delete(e){
    // console.log(e.currentTarget.dataset.index)
    let tempFilePaths_show = wx.getStorageSync('temp_img')
    let i = e.currentTarget.dataset.index
    tempFilePaths_show.splice(i,1)
    wx.setStorageSync('temp_img', tempFilePaths_show)
    let temp_img = wx.getStorageSync('temp_img')
    // console.log("temp_img",temp_img)
    this.setData({
      tempFilePaths_show:temp_img,
      imgURL:temp_img
    })
  }
})