import {
  LocationInterface,
  LocationFlag,
  LocationResult,
} from "../location-interface";

export default class TencentMapApiLocation implements LocationInterface {
  getLocation(): Promise<LocationResult> {
    return new Promise((resolve, reject) => {
      function geoShowPosition(position) {
        if (position) {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve({ location, flag: LocationFlag.LocationSuccss });
        } else {
          reject();
        }
      }

      function geoShowError(error) {
        console.log(
          `getPosError:${error.code},${navigator.geolocation},${error.message}`
        );
        reject();
      }

      navigator.geolocation.getCurrentPosition(geoShowPosition, geoShowError);
    });
  }
}
