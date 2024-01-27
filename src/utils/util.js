import { Platform } from "@unthinkable/react-core-components";

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
  if (Platform.OS.toLowerCase() === "web") {
    ref?.current?.scrollIntoViewIfNeeded({
      behaviour: "smooth",
    });
  } else {
    console.log("INSIDE", ref);
    if (ref.current) {
      ref?.current?.focus();
    }
  }
};
