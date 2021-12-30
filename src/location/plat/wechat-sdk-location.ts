import {
  LocationInterface,
  LocationFlag,
  LocationResult,
} from "../location-interface";
// import { configWx } from "../weixin.js";

// 用微信sdk获取lbs定位
export default class WechatSdkLocation implements LocationInterface {
  public getLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      // configWx(["getLocation", "openLocation"], [])
      //   .then((wx) => {
      const tmp = {
        type: "gcj02",
        success(res) {
          const location = {
            lat: parseFloat(res.latitude),
            lng: parseFloat(res.longitude),
          };
          resolve({ location, flag: LocationFlag.LocationSuccss });
        },
        fail(error) {
          console.log("WechatSdkLocation", error);
          reject();
        },
      };

      (window as any).wx.getLocation(tmp);
      // })
      // .catch((error) => {
      //   console.log("WechatSdkLocation", error);
      //   reject();
      // });
    });
  }
}
