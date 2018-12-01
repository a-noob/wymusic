// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    password: "",
  },
  userNameInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginBtnClick: function () {
    let that = this;
    //let mobile = that.data.mobile;
    //let password = that.data.password;
    let mobile = "17605963963";
    let password = "Nwczion123";
    if (mobile == "" || password == ""){
      wx.showModal({
        title: '提示',
        content: '请输入正确的账号密码',
        showCancel: false,
      })
      return;
    }
    wx.request({
      url: `http://192.168.0.244:3000/login/cellphone?phone=${mobile}&password=${password}`, //仅为示例
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.code != "200"){
          wx.showModal({
            title: '出错了',
            content: res.data.msg,
            showCancel: false,
          })
          return;
        }
        if (res.data.code == "200"){
          let userId = res.data.account.id;
          getApp().globalData.id = userId;
          wx.switchTab({
            url: `../mine/mine`
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '访问出错',
          content: String(e.errmsg),
        });
        that.data.item = { jg: "1111" };
        that.setData({
          item: that.data.item,
        })
      }
    });
  },
  goBack: function () {
    wx.navigateTo({
      url: `../index/index`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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