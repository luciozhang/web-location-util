// 经纬度，等位置信息
export interface LocationData {
  lat: number;
  lng: number;
  type?: string;
}

// 定位flag，标记定位返回结果的类型
export enum LocationFlag {
  LocationSuccss = 1, // gps定位，给精确定位
  LocationIpSuccss = 2, // ip定位，给ip定位
  LocationFailed = 3, // 定位失败，给默认定位
}

// 返回的定位结果
export type LocationResult = {
  location: LocationData;
  flag: LocationFlag;
};

// 不同定位场景需要实现的接口
export interface LocationInterface {
  getLocation(options?: LocationOptions): Promise<LocationResult>;
}

// 定位方法getLocation的配置参数
export interface LocationOptions {
  // 体验相关
  timeout: number; // 定位超时时间
  // 场景相关
  useWxSdk: boolean; // 在微信环境下，是否优先使用微信Sdk定位，微信Sdk定位返回的信息将没有省市信息
  useTencentMapApi: boolean; // 是否使用腾讯地图api定位
  useH5Geolocation: boolean; // 是否使用原生的H5定位
  // 缓存相关
  sessionCache: boolean; // 是否使用sessionStorage缓存，推荐使用
}

export const tencentMapConfig = {
  // 腾讯地图定位配置
  GEO_KEY: "***",
  GEO_REFERER: "***",
};
