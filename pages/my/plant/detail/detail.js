// pages/my/plant/detail/detail.js
Page({
  data:{
    detail:'',
    Month:'',
    Day:'',
    sun_time: ['0','30mins','1hour','1hours30mins','2hours','2hours30mins','3hours','3hours30mins','4hours','4hours30mins','5hours','5hours30mins','6hours','6hours30mins','7hours','7hours30mins','8hours','8hours30mins','9hours','9hours30mins','10hours','10hours30mins','11hours','11hours30mins','12hours','12hours30mins','13hours','13hours30mins','14hours','14hours30mins','15hours','15hours30mins','16hours','16hours30mins','17hours','17hours30mins','18hours','18hours30mins','19hours','19hours30mins','20hours','20hours30mins','21hours','21hours30mins','22hourss','22hourss30mins','23hourss','23hourss30mins','24hourss'],
    water:['0','0~100ml','100~200ml','200~300ml','300~400ml','400~500ml','500~600ml','600~700ml','700~800ml','800~900ml',,'900~1000ml'],
    temperature:['0','-5℃','-4℃','-3℃','-2℃','-1℃','1℃','2℃','3℃','4℃','5℃','6℃','7℃','8℃','9℃','10℃','11℃','12℃','13℃','14℃','15℃','16℃','17℃','18℃','19℃','20℃','21℃','22℃','23℃','24℃','25℃','26℃','27℃','28℃','29℃','30℃','31℃','32℃','33℃','34℃','35℃','36℃','37℃','38℃','39℃','40℃','41℃','42℃'],
    disease:['无','变色','坏死','腐烂','萎蔫','畸形'],
    index_disease: 0,
    index_sun:0,
    index_temper:0,
    index_water:0,
    blackdateList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28], 
    graydateList_1:[30,31],
    graydateList_2:[1,2,3,4,5]
  },
  onLoad: function (options) {
    let id = options.id
    wx.cloud.database().collection('user_plants').doc(id).get()
    .then(res=>{
      // console.log("获取数据成功",res)
      this.setData({
        detail:res.data
      })
    })

    //获取日期
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    // console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' );
    this.setData({
      Month:M,
      Day:D
    })
  },
  bindSunTimeChange: function (e) {
    this.setData({
        index_sun: e.detail.value
    })
  },
  bindWaterChange: function (e) {
    this.setData({
        index_water: e.detail.value
    })
  },
  bindTemperatureChange: function (e) {
    this.setData({
        index_temper: e.detail.value
    })
  },
  bindDiseaseChange: function (e) {
    this.setData({
        index_disease: e.detail.value
    })
  },
})