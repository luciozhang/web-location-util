import {
  LocationInterface,
  LocationFlag,
  LocationResult,
  tencentMapConfig,
} from "../location-interface";
import axios from "axios";

// 用腾讯地图api通过IP获取lbs地址
export default class TencentMapApiLocation implements LocationInterface {
  public getLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://apis.map.qq.com/ws/location/v1/ip?key=${tencentMapConfig.GEO_KEY}`
        )
        .then((res) => {
          console.log("getAPIPos-res:", res);
          const result = res?.data?.result || {};
          const location = result?.location || {};
          resolve({ location, flag: LocationFlag.LocationIpSuccss });
        })
        .catch((error) => {
          console.log("TencentMapApiLocation", error);
          reject();
        });
    });
  }
}
