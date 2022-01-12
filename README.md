# web-location-util
封装移动端H5获取用户位置信息的各种方式。

具体介绍文章：[【前端探索】移动端H5获取地理位置的探索](https://juejin.cn/post/7046595451876802596)

支持以下定位方式：

1. **navigator.geolocation**

   H5的原生定位即navigator.geolocation。

2. **腾讯地图前端定位组件**

   腾讯地图前端定位组件是基于navigator.geolocation做了一些封装，如果原生定位失败，会降级用ip获取定位，同时也对获取的位置信息做了一些缓存的优化。

3. **腾讯地图IP定位API**

   通过CGI接口请求得到一个精确度比较低的位置信息。

4. **微信的jssdk**

   微信提供了jssdk，H5可以直接调用获取到位置信息。本质上是通过jsbridge传递app获取到位置信息。同理，我们也可以通过url参数等其他方式，来传递app获取到的位置信息。

![web端位置定位](https://demo-1256819047.cos.ap-guangzhou.myqcloud.com/2022-01-12-050411.jpg)

### 工具路径
```
src/location
```

### 使用方式
```typescript
const options = {
    sessionCache: false,      //是否使用缓存
    useWxSdk: false,          //是否使用微信sdk定位
    useTencentMapApi: false,  //是否使用腾讯地图API获取IP定位
    useH5Geolocation: false,  //是否使用原生H5定位
};
location.getLocation(options as any).then((location) => {
    this.locationResult = location as any;
});
```

### 配置
- 微信sdk定位，需要自己实现鉴权接口configWx
- 腾讯地图相关的定位，请把src/location/location-interface.ts的tencentMapConfig配置成自己的key

### 运行示例工程
```
npm run serve
```
