const app = getApp();
const api = require("../../utils/api.js");

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isCard: true,
    loadModal: false,
    inputUrl: "http://101.200.63.214/static/demo/input.png",
    maskUrl: "http://101.200.63.214/static/demo/mask.png",
  },
  onLoad() {
    // this.seg()
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  ChooseImage() {
    if(this.data.loadModal){
      return
    }
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          inputUrl: res.tempFilePaths[0],
          loadModal: true
        })
        wx.showLoading({
          title: '请稍等',
        })
        this.seg(res.tempFilePaths[0])
      }
    });
  },
  /**
   * 图片分割
   */
  seg: function (tempFilePath) {
    var self = this;
    wx.uploadFile({
      url: api.seg, // 上传图片接口
      filePath: tempFilePath,
      name: 'image',
      success(res) {
        const data = JSON.parse(res.data)
        //do something
        console.log("data:", data)
        wx.hideLoading()
        self.setData({
          loadModal: false,
          maskUrl:data.result
        })
      }
    })
  },
});
