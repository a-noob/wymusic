const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicList:[],
    musicId:"",
    musickind:[],
    imglist:[
      { url: "../../images/banner1.jpg" },
      { url: "../../images/banner2.png" }
    ]
  },
  getList: function () {
    var that = this;
    wx.request({
      url: `http://192.168.0.244:3000/top/list?idx=3`, //仅为示例
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let musicList = res.data.playlist.tracks;
        that.setData({
          musicList: musicList,
        })
      },
      fail: function (e) {
        wx.showModal({
          title : '访问出错',
          content: String(e.errmsg),
        });
        that.data.item = { jg: "1111" };
        that.setData({
          item: that.data.item,
        })
      }
    });
  },
  gettj: function () {
    var that = this;
    wx.request({
      url: `http://192.168.0.244:3000/personalized`, //仅为示例
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let kindlist = res.data.result;
        that.setData({
          musickind:kindlist
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '访问出错',
          content: String(e.errmsg),
        });
      }
    });
  },
  toplay:function(e){
    wx.navigateTo({
      url: `../playmc/playmc?id=${e.currentTarget.dataset.parmas}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.gettj();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  tiaozhuan() {
    wx.navigateTo({
      url: '../../pages/modelTest/modelTest',
    })
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
     console.log("2222");
  }
})

