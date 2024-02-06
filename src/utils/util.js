import { Platform } from "@unthinkable/react-core-components";
import { ANONYMOUS } from "../constants/constants";

export const getQueryParamsAsAnObject = (queryParamString) => {
  const queryParams = queryParamString.substring(1).split("&");
  return queryParams
    .map((param) => param.split("="))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};

export const getImageSource = (uploadedImage) => {
  if (uploadedImage && typeof uploadedImage === "string") {
    return uploadedImage;
  }
  if (uploadedImage) {
    return URL.createObjectURL(uploadedImage);
  }
  return "";
};

export const getRenderText = (items, keys) => {
  if (!keys.length) {
    return "";
  }
  return keys.map((key) => items[key]).join(" ");
};

export const removeFullStopsBetweenStrings = (string) => {
  const formattedMessages = string
    .map((message) => message.replace(/\.+$/, ""))
    .join(", ");
  return formattedMessages + ".";
};

export const scrollToRef = (ref) => {
  if (ref?.current) {
    if (Platform.OS.toLowerCase() === "web") {
      ref.current?.scrollIntoViewIfNeeded({
        behaviour: "smooth",
      });
    } else {
      ref.current?.focus();
    }
  }
};

export const getSelectedSubModuleFromRoute = ({ pathName, selectedModule }) => {
  const path = pathName.split("/");
  let selectedSubModule = selectedModule?.children?.[0]?.key;
  if (!!path?.length) {
    let subModule = selectedModule?.children?.find(
      (subModule) =>
        subModule.key?.toLowerCase().split("/").slice(-1)[0] ===
        path.slice(-1)[0]
    );
    selectedSubModule = subModule?.key;
  }
  return selectedSubModule;
};

export const getInitialsFromName = (name) => {
  if (name) {
    let [firstName, lastName] = name.split(" ");
    if (lastName?.length) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName?.length) {
      return `${firstName[0]}${firstName?.[1] || ""}`.toUpperCase();
    }
  }
  return ANONYMOUS.charAt(0).toUpperCase();
};

export function isValidUrl(str) {
  const pattern = new RegExp(
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
    );
  return pattern.test(str);
}
