// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCont:"",
    playlist:[]
  },
  getUserCont: function () {
    let app = getApp();
    let userId = app.globalData.id;
    let that = this;
    if(userId == ""){
      wx.navigateTo({
        url: `../login/login`
      })
    }else{
      wx.request({
        url: `http://192.168.0.244:3000/user/detail?uid=${userId}`, //仅为示例
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let kindlist = res.data;
          if(kindlist.code == "200"){
            that.setData({
              userCont: kindlist.profile
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
    }
  },
  getsubcount: function () {
    let app = getApp();
    let userId = app.globalData.id;
    let that = this;
    if (userId == "") {
      wx.navigateTo({
        url: `../login/login`
      })
    } else {
      wx.request({
        url: `http://192.168.0.244:3000/user/record?uid=${userId}&type=1`, //仅为示例
        data: {
          
        },
        xhrFields: { withCredentials: true },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          if(res.data.code != "200"){
            wx.showModal({
              title: '提示',
              content: '播放列表获取失败',
              showCancel: false,
            })
            return;
          }
          if(res.data.code == "200"){

          }
        },
        fail: function (e) {
          wx.showModal({
            title: '访问出错',
            content: String(e.errmsg),
          });
        }
      });
    }
  },
  toMusicList:function(){
    wx.navigateTo({
      url: `../mineList/myMusicList/mymusiclist`
    })
  },
  toCollection: function () {
    wx.navigateTo({
      url: `../mineList/myCollection/mycollection`
    })
  },
  toMyLike: function () {
    wx.navigateTo({
      url: `../mineList/myLike/mylike`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserCont();
    this.getsubcount();
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
    this.getUserCont();
    this.getsubcount();
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