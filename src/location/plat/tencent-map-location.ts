import {
  LocationInterface,
  LocationOptions,
  LocationResult,
  LocationFlag,
  tencentMapConfig,
} from "../location-interface";
import loader from "little-loader";

// 用腾讯地图sdk获取lbs地址
export default class TencentMapLocation implements LocationInterface {
  public getLocation(options: LocationOptions): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      function geoShowPosition(location) {
        if (location && location.type !== "ip") {
          // 拒绝定位会使用ip地址定位
          resolve({ location, flag: LocationFlag.LocationSuccss });
        } else if (location) {
          resolve({ location, flag: LocationFlag.LocationIpSuccss });
        } else {
          reject();
        }
      }

      function geoShowError() {
        reject();
      }

      loader(
        "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js",
        () => {
          // eslint-disable-next-line no-undef
          const geolocation = new (window as any).qq.maps.Geolocation(
            tencentMapConfig.GEO_KEY,
            tencentMapConfig.GEO_REFERER
          );
          const tencentMapOptions = {
            timeout: options.timeout,
          };
          geolocation.getLocation(
            geoShowPosition,
            geoShowError,
            tencentMapOptions
          );
        }
      );
    });
  }
}
