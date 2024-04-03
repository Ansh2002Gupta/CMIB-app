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

export const capitalize = (text) => {
  if (!text || typeof text !== "string") {
    return text;
  }
  let firstLetter = text.charAt(0).toUpperCase();
  let restLetter = text.substring(1);
  return firstLetter + restLetter;
};

export const formatDate = (date, format = "DD/MM/YYYY") => {
  return dayjs(date).format(format);
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

  const createdAtDateString = createdAt.toDateString();
  const todayDateString = today.toDateString();
  const yesterdayDateString = yesterday.toDateString();

  if (createdAtDateString === todayDateString) {
    if (lastFlagDate !== todayDateString) {
      lastFlagDate = todayDateString;
      return "Today";
    }
  } else if (createdAtDateString === yesterdayDateString) {
    if (lastFlagDate !== yesterdayDateString) {
      lastFlagDate = yesterdayDateString;
      return "Yesterday";
    }
  } else if (createdAtDateString < yesterdayDateString) {
    if (lastFlagDate !== createdAtDateString) {
      lastFlagDate = createdAtDateString;
      return formatDate(createdAt);
    }
  }
  return "";
};

export const getDateFlagMobile = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (createdAtDate.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (createdAtDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return formatDate(createdAtDate);
};

export const getMessageInfo = (chatData, userDetails) => {
  if (
    chatData?.author?.type.toLowerCase() === "system" ||
    !chatData?.author?.type
  ) {
    return "system";
  }
  if (
    chatData?.author?.id === userDetails?.id &&
    chatData?.author?.type.toLowerCase() ===
      userDetails?.user_type.toLowerCase()
  ) {
    return "sender";
  }
  return "receiver";
};

export const getValidUrl = (url) => {
  let link = url.toLowerCase();
  if (!/^https?:\/\//.test(link) && !/^http?:\/\//.test(link)) {
    link = `https://${link}`;
  }
  return link;
};

export const addKeyValuePair = (arr) => {
  return arr.map((item) => {
    return { value: item, label: item } 
  })
}
export const getIndexForBoolean = (value) => {
  if (typeof value !== "boolean") {
    return value;
  }
  return value ? 1 : 0;
};

// Converts "Yes" to true and "No" to false
export function yesNoToBoolean(value) {
  if (value === "Yes") {
    return true;
  } else if (value === "No") {
    return false;
  } else {
    return value;
  }
}

// Converts true to "Yes" and false to "No"
export function booleanToYesNo(value) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value;
}

export const formatDateToYYYYMMDD = (dateInput) => {
  const date = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
  if (isNaN(date)) {
    throw new Error('Invalid date');
  }
  const year = date.getFullYear() ?? "--";
  const month = (date.getMonth() + 1).toString().padStart(2, '0') ?? "--"; // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0') ?? "--";
  return `${year}-${month}-${day}`;
};

export const formatDateToDDMMYYYY = (isoDateString) => {
  const date = new Date(isoDateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "--"
  }
  const day = date.getUTCDate().toString().padStart(2, '0') ?? "--";
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')?? "--";
  const year = date.getUTCFullYear()?? "--";
  return `${day}/${month}/${year}`;
};

export const formatDateToMonthNameYear = (isoDateString) => {
  const date = new Date(isoDateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]}/${year}`;
};

export const getCurrentYear= () =>{
  return new Date().getFullYear();
}
export const formatCountryCode = (code, countryData) => {
  if (!code) return code;
  const countryOption = countryData?.find(
    (country) => country["dial_code"] === code
  );
  return countryOption && Platform.OS === "web"
    ? `${code} (${countryOption["name"]})`
    : code;
};

export const getNameById = (data, id) => {
  const item = data?.find((obj) => obj.id === id);
  return item ? item.name : null;
};

export const isValueEmpty = (value) => {
  return value === null || value === undefined || value === "";
};
