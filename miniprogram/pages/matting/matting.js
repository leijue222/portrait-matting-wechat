const api = require("../../utils/api.js");
const utils = require("../../utils/utils.js");

Page({
  data: {
    imgList: [],
    portraitDemoList: [{
      id: 1,
      url: 'http://101.200.63.214/static/demo/input1-m.png',
    }, {
      id: 2,
      url: 'http://101.200.63.214/static/demo/input2-m.png'
    }, {
      id: 3,
      url: 'http://101.200.63.214/static/demo/input3-m.png'
    }],
    bgDemoList: [{
      id: 1,
      url: 'http://101.200.63.214/static/demo/bg1-m.png',
    }, {
      id: 2,
      url: 'http://101.200.63.214/static/demo/bg2-m.png'
    }, {
      id: 3,
      url: 'http://101.200.63.214/static/demo/bg3-m.png'
    }],
    inputUrl: "",
    inputName: "",
    bgUrl: "",
    bgName: "",
    mergerUrl: "/images/merge-1-1.png",
    TabCur: 0,
    scrollLeft: 0,
    choosePortrait: 1,
    chooseBg: 1,
    loadModal: false,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  ChooseImageP() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          choosePortrait: 0,
          inputUrl: res.tempFilePaths[0]
        })
        this.upload(res.tempFilePaths[0], 'input')
      }
    });
  },
  ChooseImageB() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          chooseBg: 0,
          bgUrl: res.tempFilePaths[0]
        })
        this.upload(res.tempFilePaths[0], 'bg')
      }
    });
  },
  // 更新data 切换选中状态
  selectedPortrait: function(options) {
    var self = this
    var id = options.currentTarget.dataset.id;
    self.setData({
      choosePortrait: id
    })
  },
  selectBg: function(options) {
    var self = this
    var id = options.currentTarget.dataset.id;
    self.setData({
      chooseBg: id
    })
  },
  /**
   * upload
   */
  upload: function(filePath, type) {
    var self = this
    wx.uploadFile({
      url: api.upload,
      filePath: filePath,
      name: 'file',
      formData: {
        'type': type
      },
      success: function(res) {
        var data = JSON.parse(res.data)
        if (type == 'input') {
          self.setData({
            inputName: data.fileName
          })
        } else if (type == 'bg') {
          self.setData({
            bgName: data.fileName
          })
        }
      }
    })

  },
  localMatting: function() {
    var self = this;
    let bgId = self.data.chooseBg;
    let inputId = self.data.choosePortrait
    // 全为示例图片
    if (bgId != 0 && inputId != 0) {
      let mattingPath = '/images/merge-'
      mattingPath = mattingPath + inputId + '-' + bgId + '.png'
      wx.showLoading({
        title: '请稍等',
      })
      setTimeout(function() {
        self.setData({
          mergerUrl: mattingPath
        })
        wx.hideLoading()
      }, 1500)
      return true
    } else if (bgId == 0 && inputId == 0) {
      return false
    } else {
      if (bgId == 0) { // 背景是上传的，肖像是示例的
        self.setData({
          inputName: 'input' + inputId + '.png'
        })
      } else if (inputId == 0) {
        self.setData({ // 背景是示例的，肖像是上传的
          bgName: 'bg' + bgId + '.png'
        })
      }
      return false;
    }
  },
  beginMatting: function() {
    var self = this
    if (self.data.loadModal || self.localMatting()) {
      return
    }

    wx.showLoading({
      title: '请稍等',
    })
    self.setData({
      loadModal: true
    })
    wx.request({
      url: api.matting,
      method: 'POST',
      data: {
        im: self.data.inputName,
        bg: self.data.bgName
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading()
        console.log("api.matting", res)
        self.setData({
          loadModal: false,
          mergerUrl: res.data.result
        })
      }
    })
  }
})