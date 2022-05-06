// component/waterFall/waterFall.js
Component({
    /**
     * 配置组件的样式
     */
    options: {
      addGlobalClass: true//使用全局样式
    },
    /**
     * 组件的属性列表
     */
    properties: {
        dataFall: {
            type: Array,
            value: [],
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        imgList: [],          //  从父组件获取到的瀑布流总数据
        leftfall: [],         //  瀑布流左列容器的数据组
        rightfall: [],        //  瀑布流右列容器的数据组
        dataFall: [
          
          ]
    }, 

    /**
     * 组件的事件处理函数和自定义方法
     */ 
    methods: {
        waterfall() {
            let left_hei = ''
            let right_hei = ''
            let that = this
            const query = wx.createSelectorQuery().in(this);
            query.selectAll('#leftfall,#rightfall').boundingClientRect(function (res) {
                left_hei = res[0].height    // 获取左列容器的高度
                right_hei = res[1].height   // 获取右列容器的高度
                inserImg(); // 获取左右两列容器高度后对比两边容器高度插入数据
            }).exec();
            function inserImg() {
                if (that.data.imgList.length === 0){
                    return;
                }
                if (left_hei <= right_hei) {//若左侧容器高度较小或两侧等高，则将数据放在左侧
                    that.data.leftfall.push(that.data.imgList[0])
                    that.setData({
                        leftfall: that.data.leftfall
                    })
                } else {
                    that.data.rightfall.push(that.data.imgList[0])
                    that.setData({
                        rightfall: that.data.rightfall
                    })
                }
                // 从总数据里删除已插入的数据
                that.setData({
                    imgList: that.data.imgList.slice(1)
                })
            }
        },
        godetail(e){
            // console.log(e.currentTarget.dataset.item.id)
            let id = e.currentTarget.dataset.item._id
            wx.navigateTo({
            url: '../../component/waterFall/detail/detail?id=' + id,
            })
        }

    },
    /**
     * 数据监听
     */
    observers: {
        'dataFall': function(newVal){
            this.setData({    
                imgList: newVal
            }) 
            this.waterfall()//瀑布流新数据传入后，第1次调用waterfall。以后每渲染一次数据会自动调用waterfall
        }
    }
  })	
  
