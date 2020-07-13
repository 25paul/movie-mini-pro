// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movielists: []
  },

  getMovieLists: function(){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'movielists',
      data: {
        start: this.data.movielists.length,
        count: 10
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      this.setData({
        movielists: this.data.movielists.concat(JSON.parse(res.result).subjects)
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },

  gotodetail: function(event){
    wx.navigateTo({
      url: `../moviedetail/moviedetail?movieid=${event.target.dataset.movieid}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieLists()
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
    this.getMovieLists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})