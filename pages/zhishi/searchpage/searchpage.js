// pages/search/search.js
Page({
    data: {
        searchtext: "", //搜索框的值
        history: false, //是否显示历史记录
        noneview: false, //是否提示未找到
        historyArray: [], //历史记录数组
        newArray: [], //添加历史记录数组
    },
    //清除历史记录
    cleanhistory: function(e) {
      this.setData({
        history: false, //隐藏历史记录
        historyArray: [], //清空历史记录数组
        newArray: [],
        searchtext: "" //清空搜索框
      })
    },
    //搜索
    search: function(e) {
      var searchtext = this.data.searchtext; //搜索框的值
      var sss = true;//是否提示未找到
      if (searchtext != "") {
        //若搜索框的值不存在于历史记录中，将其加入历史记录数组
        if (this.data.historyArray.indexOf(searchtext) < 0){
          this.data.historyArray.push(searchtext);
        }
        //循环查询数组中的title字段
        for (var index in this.data.allData) {
          var num = this.data.allData[index].title.indexOf(searchtext);//该项是否存在搜索值
          let temp = 'allData[' + index + '].status';
          if (num != -1) { //若该项匹配
            this.setData({
              [temp]: 1,//在搜索结果中显示该项
            })
            sss = false //隐藏未找到提示
          }
        }
        this.setData({
          history: false, //隐藏历史记录
          noneview: sss, 
          newArray: this.data.historyArray //给新历史记录数组赋值
        })
      } else {
        this.setData({
          noneview: true, //提示未找到
          history: false, //隐藏历史记录
        })
      }
    },
    //搜索框有输入
    searchinput: function(e) {
      //当删除搜索框的值为空时
      if (e.detail.value == "") {
        this.setData({
          history: true, //显示历史记录
          noneview: false, 
        });
        //所有数据的状态改为0（不显示在搜索结果中）
        for (var index in this.data.allData) {
          let temp = 'allData[' + index + '].status';
          this.setData({
            [temp]: 0,
          })
        }
      }
      this.setData({
        searchtext: e.detail.value
      })
    },
    //点击历史记录重新搜索
    historySearch: function(e) {
      this.setData({
        searchtext: e.target.dataset.text
      })
      this.search()
    }
  })