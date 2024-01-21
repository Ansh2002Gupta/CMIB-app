import Cookies from "js-cookie";
import { Platform } from "@unthinkable/react-core-components";

import appConfig from "../constants/appConfig";
import formatKey from "./helpers";

const isPlatformWeb = Platform.OS.toLowerCase() === "web";
let isLocalhost = false;
if (isPlatformWeb) {
  isLocalhost = window.location.hostname === "localhost";
}

class CookieStorage {
  static set(
    key,
    value,
    expires = 1,
    domain = isPlatformWeb ? window.location.hostname : ""
  ) {
    if (!value) return;
    try {
      Cookies.set(formatKey(key), value, {
        expires,
        domain,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static get(key) {
    if (!key) return;
    try {
      return Cookies.get(formatKey(key));
    } catch (err) {
      console.log(err);
    }
  }

  static remove(key) {
    if (!key) return;
    try {
      Cookies.remove(formatKey(key), {
        path: isLocalhost ? "/" : appConfig.ROUTER_BASE_NAME,
        domain: isLocalhost ? "" : appConfig.DOMAIN,
        secure: !isLocalhost,
      });
    } catch (error) {
      console.error(error);
    }
  }

  static removeAll(neededAttributes = {}) {
    try {
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName, neededAttributes);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default CookieStorage;
