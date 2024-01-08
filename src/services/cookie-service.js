import Cookies from "js-cookie";

import formatKey from "./helpers";

class CookieStorage {
  static set(key, value, expires = 1, domain = window.location.hostname) {
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
      Cookies.remove(formatKey(key));
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
