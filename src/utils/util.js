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

export const appendStringsInNextLine = (string) => {
  const formattedMessages = string.join("\n");
  return formattedMessages;
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
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
  'i'
  );
  return pattern.test(str);
}

export function capitalize(text) {
  if (!text || typeof text !== "string") {
    return text;
  }
  let firstLetter = text.charAt(0).toUpperCase();
  let restLetter = text.substring(1);
  return firstLetter + restLetter;
}

