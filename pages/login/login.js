Page({
  data:{
    userInfo:'',
    id:'',
    openID:''
  },
  onLoad(){
    let user = wx.getStorageSync('user')
    if(user){
      wx.switchTab({
        url: '../my/my',
      })
    }
  },
  login(){
    wx.getUserProfile({
      desc: 'desc',
      success:(res)=>{
        let user = res.userInfo
        //把用户信息缓存在本地
        wx.setStorageSync('user', user)
        this.setData({
          userInfo:user
        })
       
        //调用云函数获取openid
        wx.cloud.callFunction({    
          name:"getOpenid",
          complete:res=>{
            const db = wx.cloud.database()
            // console.log("id",res)
            db.collection("user").where({
              _openid:res.result.openid   //进行筛选
            }).get({
              success:(res)=>{
                // console.log(res)
                if(res.data.length==0){
                  //data为0即未读到openid

                  //获取id的值
                  let id = null
                  wx.cloud.database().collection('user').where({
                    flag:1
                  }).count()
                  .then(res=>{
                    id = res.total
                    //将id存在本地
                    wx.setStorageSync('id', id)
                    this.setData({
                      id:id
                    })
                    //录入注册用户信息
                    wx.cloud.database().collection('user').add({
                      data:{
                        nickname:user.nickName,
                        avatar:user.avatarUrl,
                        flag:1,
                        id:id
                      },
                      success(res){
                        console.log('注册成功')
                      },
                      fail(res){
                        console.log('注册失败')
                      }
                    })
                  })
                  .catch(res=>{
                    console.log('查询失败',res)
                  })
                }
                else{
                  let forid = res.data[0]
                  let id = forid.id
                  wx.setStorageSync('id', id)
                  this.setData({
                    id:id
                  })
                }
              }
            })
          }
        })
        //跳转页面
        wx.switchTab({
          url: '../home/home',
        })
      },
      fail:(res)=>{
        console.log("授权失败",res)
      }
    })
  },
  guest(){
      wx.switchTab({
        url: '../home/home',
      })
  }
})