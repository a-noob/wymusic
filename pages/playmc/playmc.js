// pages/playmc/playmc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicxq:[],
    lyric:"",
    wordsArray:[],
    misiccontent:"",
    singer:"",
    singtlrc:""
  },

  showWords: function (e){
    let that = this;
    let currentTime = e.detail.currentTime;
    let getWords  = that.getWordsByTime(currentTime);
    that.setData({
      singtlrc: getWords,
    })
  },
  getWordsByTime:function(second){
    let that = this;
    let wordsArray = that.data.wordsArray;
    for(var i in wordsArray){
      var obj = wordsArray[i];
      if (second > obj.time) { 
        continue;
      } else {
        return wordsArray[i - 1].content;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: `http://192.168.0.244:3000/music/url?id=${options.id}`, //仅为示例
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let data = res.data.data[0];
        that.setData({
          musicxq: data,
        })
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

    wx.request({
      url: `http://192.168.0.244:3000/song/detail?ids=${options.id}`, //仅为示例
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let data = res.data;
        let singerList = data.songs[0].ar;
        let singer = "";
        for(let i=0 ; i<singerList.length ;i++){
          singer += singerList[i].name + " ";
        }
        that.setData({
          misiccontent: data.songs[0],
          singer: singer
        });
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

    wx.request({
      url: `http://192.168.0.244:3000/lyric?id=${options.id}`, //仅为示例
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let wordsArray = [];
        let data = res.data.lrc.lyric;
        let arrays = data.split("\n");
        for (var i = 0; i < arrays.length; i++) {
          let temp = arrays[i];
          let tempNum = temp.split(":")[0].replace("[", "");
          if (!isNaN(tempNum)) {
            let timeArray = temp.split("]")[0].replace("[", "").split(":");
            let min = parseInt(timeArray[0]);
            let second = parseFloat(parseFloat(timeArray[1]).toFixed(2)) + parseFloat(min * 60);
            let content = temp.split("]")[1];
            let obj = {
              time: second,
              content: content
            };
            wordsArray.push(obj);
          }
        };
        that.setData({
          wordsArray: wordsArray,
        })
        
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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