import { LocationData } from "./location-interface";
export default class LocationStorage {
  // 从sessionStorage获取缓存位置信息
  public static getLocationFromSessionStorage(): LocationData | null {
    if (window.sessionStorage.getItem("position")) {
      try {
        const location = JSON.parse(
          (window as any).sessionStorage.getItem("position")
        );
        return location;
      } catch {
        return null;
      }
    }
    return null;
  }

  // 存储缓存位置信息到sessionStorage和localStorage
  public static setLocationToStorage(location: LocationData): void {
    window.sessionStorage.setItem("position", JSON.stringify(location));
  }
}
