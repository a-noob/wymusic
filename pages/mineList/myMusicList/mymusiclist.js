// pages/mineList/myMusicList/mymusiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMusicList:[],
    musicList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMyMusicList:function(){
    let app = getApp();
    let userId = app.globalData.id;
    let that = this;
    wx.request({
      url: `http://192.168.0.244:3000/user/playlist?uid=${userId}`,
      data: {

      },
      xhrFields: { withCredentials: true },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code != "200") {
          
        }
        if (res.data.code == "200") {
          let myMusicList = res.data.playlist
          that.setData({
            myMusicList: myMusicList
          })
          that.getMusicList(myMusicList[0].id);
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '访问出错',
          content: String(e.errmsg),
        });
      }
    });
  },
  getMusicList: function (id) {
    let that = this;
    wx.request({
      url: `http://192.168.0.244:3000/playlist/detail?id=${id}`,
      data: {

      },
      xhrFields: { withCredentials: true },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.code != "200") {
          
        }
        if (res.data.code == "200") {
          that.setData({
            musicList: res.data.playlist.tracks
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '访问出错',
          content: String(e.errmsg),
        });
      }
    });
  },
  changeMusicList:function(e){
    let id = e.currentTarget.dataset.parmas;
    console.log(id);
    let that = this;
    wx.request({
      url: `http://192.168.0.244:3000/playlist/detail?id=${id}`,
      data: {

      },
      xhrFields: { withCredentials: true },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.code != "200") {

        }
        if (res.data.code == "200") {
          that.setData({
            musicList: res.data.playlist.tracks
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '访问出错',
          content: String(e.errmsg),
        });
      }
    });
  },
  toplay: function (e) {
    wx.navigateTo({
      url: `../../playmc/playmc?id=${e.currentTarget.dataset.parmas}`
    })
  },
  onLoad: function (options) {
    this.getMyMusicList();
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