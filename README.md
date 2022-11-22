# zhiyouni-miniprogram

“互联网+”的一个微信小程序

程序的主要代码在pages文件夹下的5个页面里，以及整体的app代码控制
## login
登录 页面   

功能：读取用户登录信息、利用openid判断是否需要重新登录、给每个用户分配唯一的id   

其中openid的获取调用微信官方提供的云函数

![login.png](./preview_pic/login.png)

## zhishi

功能：瀑布流植物信息显示、自建植物数据库搜索、外接百度数据库识图    

waterfall和search集成在了component中，而植物的信息利用微信提供的CloudBase CMS进行管理

![zhishi.png](./preview_pic/zhishi.png)

## home
广场 页面   

功能：仿微信朋友圈的发布笔记和图片显示、利用openid判断的删除选项   

发布的笔记信息保存在云开发的数据库中，用户进入页面或刷新页面会从数据库中读取

![home.png](./preview_pic/home.png)

## shop
商城 页面   

功能：商品轮播图、商品显示与添加购物车、预约时间服务等   

在同一个页面中实现了顶部导航栏，将每个导航栏对应内容用swiper-item分隔

![shop.png](./preview_pic/shop.png)

## my
我的 页面，多个模块分别从本地或云数据库中读取相关的数据

功能：个人信息的显示、购物车商品的删除与结算、反馈与建议等

实现了个人中心的大部分功能，包括创作、收藏、商品等

![my.png](./preview_pic/my.png)