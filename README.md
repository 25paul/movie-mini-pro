# movie-mini-pro
微信小程序--电影

### 项目介绍

抓取豆瓣网的电影显示在小程序页面上，并且利用小程序的云开发进行一系列的处理；
[图标来源](https://www.iconfont.cn/ "图标来源")

### 选择UI库
[有赞的vant ui库](https://youzan.github.io/vant-weapp/#/quickstart "有赞的vant ui库")

### 电影列表
小程序向豆瓣服务器发送请求，可以由两种方式：
1. 小程序端是用wx.request()请求数据；
2. 在云函数中使用第三方库来请求数据，比如[request-promise](https://github.com/request/request-promise "request-promise")

电影列表来源：http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10
电影详情来源：http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a

### 要点
1. 使用wx.navigateTo进行跳转；
2. 将上传的文件存储起来，并且返回fileid和评价一起保存到数据库，使用 Promise.all()；
注意一个问题：如果图片上传好了之后还需要继续上传的话不能把前面上传的图片删掉，所以使用concat将突破拼接起来；
3. 滚动加载，页面上拉触底事件onReachBottom；
4. wx.showLoading(Object object)显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框；
5. open-data展示用户信息；


