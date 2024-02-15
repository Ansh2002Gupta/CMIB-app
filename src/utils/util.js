import { Platform } from "@unthinkable/react-core-components";

import dayjs from "dayjs";
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
      return `${firstName[0]}`.toUpperCase();
    }
  }
  return ANONYMOUS.charAt(0).toUpperCase();
};

export const isValidUrl = (str) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
};

export const getTime = (isoString) => {
  if (!isoString) {
    return "12:00 AM";
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "12:00 AM";
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;
  return formattedTime;
};

export const formatCreatedAt = (originalDate) => {
  const date = new Date(originalDate);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const capitalize = (text) => {
  if (!text || typeof text !== "string") {
    return text;
  }
  let firstLetter = text.charAt(0).toUpperCase();
  let restLetter = text.substring(1);
  return firstLetter + restLetter;
};

export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const extractFilename = (fileUri) => {
  const parts = fileUri.split("/");
  const filename = parts.pop() || "";
  return filename;
};

let lastFlagDate = null;

export const getDateStatus = (record) => {
  const createdAt = new Date(record);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (createdAt.toDateString() === today.toDateString()) {
    if (lastFlagDate !== today.toDateString()) {
      lastFlagDate = today.toDateString();
      return "Today";
    } else {
      return "";
    }
  } else if (createdAt.toDateString() === yesterday.toDateString()) {
    if (lastFlagDate !== yesterday.toDateString()) {
      lastFlagDate = yesterday.toDateString();
      return "Yesterday";
    } else {
      return "";
    }
  } else {
    lastFlagDate = null;
    return formatDate(createdAt);
  }
};
