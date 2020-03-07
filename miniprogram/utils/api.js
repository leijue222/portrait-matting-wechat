var api = 'http://x.x.x.x/api';      //正式版本
// var api = "http://127.0.0.1:5000/api";      // 本地测试

var url = {
  baseUrl: `${api}`,
  seg: `${api}/seg`,                    // 图片分割
  upload: `${api}/wechat/upload`,       // 上传图片
  matting: `${api}/wechat/matting`,     // 图片合并
}

module.exports = url;