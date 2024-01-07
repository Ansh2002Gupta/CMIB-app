import { Platform } from "@unthinkable/react-core-components";

import CookieStorage from "./cookie-service";
import StorageService from "./storage-service";

const isPlatformWeb = Platform.OS.toLowerCase() === "web";

class CookieAndStorageService {
  static async set({
    key,
    value,
    expires = 1,
    domain = window.location.hostname,
  }) {
    if (!value) return;
    try {
      if (isPlatformWeb) {
        CookieStorage.set(key, value, expires, domain);
      } else {
        await StorageService.set(key, value);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async get({ key }) {
    if (!key) return;
    try {
      if (isPlatformWeb) {
        return new Promise((resolve, reject) => {
          resolve(CookieStorage.get(key));
        });
      }
      const res = await StorageService.get(key);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async remove({ key }) {
    if (!key) return;
    try {
      if (isPlatformWeb) {
        CookieStorage.remove(key);
      } else {
        await StorageService.remove(key);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async removeAll(neededAttributes = {}) {
    try {
      if (isPlatformWeb) {
        CookieStorage.removeAll(neededAttributes);
      } else {
        await StorageService.removeAll();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default CookieAndStorageService;
