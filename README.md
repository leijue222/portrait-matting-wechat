# portrait-matting-wechat
Use portrait matting in WeChat mini program

## Menu Page
![page menu](https://user-images.githubusercontent.com/30276789/76142492-53ce7400-60a9-11ea-9e6c-fe1c0705f2ae.png)
## Segmentation Page
![page segmentation](https://user-images.githubusercontent.com/30276789/76142506-811b2200-60a9-11ea-9839-c1a3fc0190b4.png)
## Matting Page
![page matting](https://user-images.githubusercontent.com/30276789/76142567-e66f1300-60a9-11ea-9bba-81598ef74d0f.png)


## Description

Provides API services by [**portrait-matting-unet-flask**](https://github.com/leijue222/portrait-matting-unet-flask).
Before you start, please confirm that there are no problems with the API service. It is recommended to use [PostMan](https://www.postman.com/) for testing.


## Run
Modify the `` /miniprogram/utils/api.js '' file based on your needs

```
var api = 'http://xxx.xx.xx.xxx/api';          // server address
// var api = "http://127.0.0.1:5000/api";      // local address

var url = {
  baseUrl: `${api}`,
  seg: `${api}/seg`,                   
  upload: `${api}/wechat/upload`,      
  matting: `${api}/wechat/matting`,    
}

module.exports = url;
```

## Thanks

The birth of this project is inseparable from the following projects:

 **[ColorUI](https://github.com/weilanwl/ColorUI)：Vibrant, high-saturation colors, a small program component library focused on vision**

---

