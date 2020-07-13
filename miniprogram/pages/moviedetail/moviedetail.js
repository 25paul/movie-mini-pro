// pages/moviedetail/moviedetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviedetail: {},
    fieldcon: '',
    ratecon: 0,
    images: [],
    fileids: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    wx.cloud.callFunction({
      name: 'mymoviedetail',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading()
      this.setData({
        moviedetail: JSON.parse(res.result)
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },

  onfieldChange: function(event){
    console.log(event.detail)
    this.setData({
      fieldcon: event.detail
    })
  },
  onrateChange: function(event){
    console.log(event.detail)
    this.setData({
      ratecon: event.detail
    })
  },
  uploadimg: function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },
  onsubmit: function(){
    wx.showLoading({
      title: "评论提交中"
    })
    var promisearr = []
    for(let i = 0;i < this.data.images.length; i++){
      promisearr.push(new Promise((resolve, reject) => {
        let imgtype = /\.\w+$/.exec(this.data.images[i])[0]
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime() + imgtype,
          // 指定要上传的文件的小程序临时文件路径
          filePath: this.data.images[i],
          // 成功回调
          success: res => {
            this.setData({
              fileids: this.data.fileids.concat(res.fileID)
            })
            console.log('上传成功', res)
            resolve()
          },
        })
      }))
    }
    Promise.all(promisearr).then(res => {
      db.collection('my-movie').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          ratecon: this.data.ratecon,
          fieldcon: this.data.fieldcon,
          fileids: this.data.fileids
        },
        success: res => {
          wx.hideLoading()
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          wx.showToast({
            title: '提交完成',
          })
          this.cleardata()
        }
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },

  cleardata: function(){
    this.setData({
      ratecon: 5,
      fieldcon: '',
      images: [],
      fileids: []
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})