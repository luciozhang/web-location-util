import {
  LocationOptions,
  LocationFlag,
  LocationInterface,
} from "./location-interface";
import { LocationDefaultOptions } from "./location-default-options";
import LocationStorage from "./location-storage";
import TencentMapApiLocation from "./plat/tencent-map-api-location";
import TencentMapLocation from "./plat/tencent-map-location";
import WechatSdkLocation from "./plat/wechat-sdk-location";
import H5GeolocationLocation from "./plat/h5-geolocation-location";

/**
 * @module Location LBS定位
 * @description 定位工具，支持腾讯地图定位、微信的sdk定位、游戏人生sdk定位
 */
class Location {
  public static locationFlag = LocationFlag;

  private static instance: Location = new Location();
  private static env;

  public static getInstance() {
    return this.instance;
  }

  /**
   * 获取定位信息
   * @exports getLocation
   * @param {object} options 定位参数
   * @param {number} options.timeout 定位超时时间
   * @param {boolean} options.useWxSdk  在微信环境下，是否优先使用微信Sdk定位，微信Sdk定位返回的信息将没有省市信息
   * @param {boolean} options.useTipSdk 在游戏内环境，是否优先使用特权Sdk定位，目前只有和平和地主游戏支持
   * @param {boolean} options.useTencentMapIfFail 使用特权Sdk定位失败的情况下，是否用腾讯地图定位兜底
   * @param {boolean} options.useTencentMapApi 是否使用腾讯地图api定位
   * @param {boolean} options.sessionCache 是否使用sessionStorage缓存，推荐使用
   * @param {boolean} options.localCache 是否使用localStorage缓存
   * @param {number} options.localExpireMs localStorage缓存过期时间
   */
  public static getLocation(options: LocationOptions) {
    // 填充默认数据
    options.timeout = options.timeout ?? LocationDefaultOptions.defaultTimeout;
    options.useWxSdk =
      options.useWxSdk ?? LocationDefaultOptions.defaultUseWxSdk;
    options.useTencentMapApi =
      options.useTencentMapApi ??
      LocationDefaultOptions.defaultUseTencentMapApi;
    options.sessionCache =
      options.sessionCache ?? LocationDefaultOptions.defaultCache;

    return new Promise((resolve) => {
      // 使用sessionStorage存储的位置信息
      if (
        options.sessionCache &&
        LocationStorage.getLocationFromSessionStorage()
      ) {
        let flag = LocationFlag.LocationSuccss;
        if (LocationStorage.getLocationFromSessionStorage()!.type === "ip") {
          flag = LocationFlag.LocationIpSuccss;
        }
        resolve({
          location: LocationStorage.getLocationFromSessionStorage(),
          flag,
        });
        return;
      }
      // 示例化不同场景的定位组件
      if (options.useWxSdk && Location.env.isWeixin) {
        this.getInstance().locationHandle = new WechatSdkLocation();
      } else if (options.useTencentMapApi) {
        this.getInstance().locationHandle = new TencentMapApiLocation();
      } else if (options.useH5Geolocation) {
        this.getInstance().locationHandle = new H5GeolocationLocation();
      }

      this.getInstance()
        .locationHandle.getLocation(options)
        .then((res) => {
          resolve(res);
          // 缓存位置信息
          if (res.location) {
            LocationStorage.setLocationToStorage(res.location);
          }
        })
        .catch((error) => {
          failCallback(error);
        });

      // 特殊处理下特权sdk定位失败，降级到腾讯地图定位
      const failCallback = (failerror) => {
        resolve({
          location: LocationDefaultOptions.defaultLocation,
          flag: LocationFlag.LocationFailed,
        });
      };
    });
  }

  private locationHandle: LocationInterface;

  constructor() {
    const ua = window.navigator.userAgent.toLowerCase();
    Location.env = {};
    Location.env.isWeixin = ua.match(/MicroMessenger/i);
    this.locationHandle = new TencentMapLocation();
  }
}

export default Location;
