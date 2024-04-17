import { Platform } from "@unthinkable/react-core-components";

import dayjs from "dayjs";
import { ANONYMOUS, jobType, questionType } from "../constants/constants";

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

export const getFormattedText = (item, key, formatConfig) => {
  if (formatConfig[key]) {
    const { prefix = "", suffix = "" } = formatConfig[key];
    return `${prefix}${item[key]}${suffix}`;
  }
  return item[key];
};

export const getRenderText = (items, keys, formatConfig = {}) => {
  if (!keys?.length) {
    return "";
  }
  if (keys?.[0].trim().toLowerCase() === "active") {
    return items[keys?.[0]] ? "Active" : "Inactive";
  }
  const texts = keys?.map((key) => items[key]).join(" ");
  return !!texts ? texts : "_";
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

export const getDate = (isoDateString, format = "DD-MM-YYYY") => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  return format
    .replace("YYYY", year.toString())
    .replace("MM", month.toString().padStart(2, "0"))
    .replace("DD", day.toString().padStart(2, "0"));
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
  return !!date ? dayjs(date).format(format) : "-";
};

export const formatTime = (dateString, format = "hh:mm A") => {
  return !!dateString ? dayjs(dateString).format(format) : "-";
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
export const getQuestionInitalValue = (intl, order = 0) => {
  return {
    typeofQuestion: intl.formatMessage({
      id: "label.text_question",
    }),
    question: "",
    id: Date.now(),
    isMandatory: false,
    question_options: null,
    question_order: order + 1,
  };
};
// Function to format the selected date or return the placeholder
export const getDisplayValue = (value, intl) => {
  if (value && value instanceof Date) {
    // return value.toDateString();

    let day = value.getDate();
    let month = value.getMonth() + 1; // getMonth() returns 0-11
    let year = value.getFullYear();

    // Add leading zeros if day or month is less than 10
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
  return intl.formatMessage({ id: "label.select" });
};

export const getFormatedData = (jobData, question, isCheckList) => {
  let temp = {
    summary: jobData.jobSummary,
    detail: jobData.jobDetails,
    job_type_id: jobData.jobType?.id,
    is_contractual: jobData.jobType?.id == 2 ? true : false,
    job_type_slug: jobData.jobType?.value,
    is_urgent: jobData.isUrgentJob == 0 ? true : false,
    experience: {
      min_experience: jobData.minimumExperience,
      max_experience: jobData.maximumExperience,
    },
    location_id: jobData.jobLocation.map((object) => object.id),
    nationality: jobData.nationality?.value ?? null,
    designation: jobData.designation,
    functional_area_id: jobData.functionalAreas.map((object) => object.id),
    gender_preference: jobData.genderPreference?.value ?? null,
    category_preference: jobData.categoryPreference?.label ?? null,
    essential_qualification: jobData.essentialQualification,
    desired_qualification: jobData.desiredQualification,
    job_opening_date: dayjs(jobData.jobOpeningDate).format("YYYY-MM-DD"),
    job_closing_date: dayjs(jobData.jobClosingDate).format("YYYY-MM-DD"),
    min_salary: jobData.minimumSalary,
    max_salary: jobData.maximumSalary,
    number_of_vacancies: jobData.numberOfVacancies,
    work_mode: jobData.modeofWork?.label,
    is_extended_vacancy: jobData.vacanciesCountType == 0 ? true : false,
    service_type: jobData.fullTime == 0 ? "Full Time" : "Part Time",
  };
  if (isCheckList) {
    temp.notify_company = isCheckList;
  }
  if (jobData.salaryNagotiable != -1) {
    temp.is_salary_negotiable = jobData.salaryNagotiable == 0 ? true : false;
  } else {
    temp.is_salary_negotiable = null;
  }
  if (jobData.flexiHours != -1) {
    temp.flexi_hours = jobData.flexiHours == 0 ? true : false;
  } else {
    temp.flexi_hours = null;
  }
  if (jobData.jobType?.label === jobType.CONTRACTUAL) {
    temp.contract_period = {
      years: jobData.contractYear,
      months: jobData.contractMonth,
      days: jobData.contractDay,
    };
  } else if (jobData.jobType?.label === jobType.SPECIALLY_ABLE) {
    temp.disability_type = jobData.typeOfDisabilty;
    temp.disability_percentage = jobData.disabiltyPercentage;
  }
  if (jobData.status === 0 || jobData.status === 1) {
    temp.status = jobData.status == 1 ? 0 : 1;
  }

  let tempQuestion = question.map((item) => {
    return {
      id: item.id,
      type: questionType[item.typeofQuestion],
      question: item.question,
      question_options:
        item.question_options?.map((option) => {
          return option.value;
        }) || null,
      question_order: item.question_order,
      mandatory: item.isMandatory,
    };
  });
  temp.questions = tempQuestion.length ? tempQuestion : null;
  return temp;
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
    return { value: item, label: item };
  });
};

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
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date)) {
    throw new Error("Invalid date");
  }
  const year = date.getFullYear() ?? "--";
  const month = (date.getMonth() + 1).toString().padStart(2, "0") ?? "--"; // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0") ?? "--";
  return `${year}-${month}-${day}`;
};

export const formatDateToDDMMYYYY = (isoDateString) => {
  const date = new Date(isoDateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "--";
  }
  const day = date.getUTCDate().toString().padStart(2, "0") ?? "--";
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") ?? "--";
  const year = date.getUTCFullYear() ?? "--";
  return `${day}/${month}/${year}`;
};

export const formatDateToMonthNameYear = (isoDateString) => {
  const date = new Date(isoDateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]}/${year}`;
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};
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

export const getQuestionType = {
  text: "Text Question",
  "single-select": "Single-select",
  "multi-select": "Multi-select",
};
export const getDecryptApiData = (apiData) => {
  let obj = {};
  const startDate = new Date(apiData.opening_date.toString().split(" ")[0]);
  const endDate = new Date(apiData.closing_date.toString().split(" ")[0]);
  apiData.locations = Array.isArray(apiData.locations) ? apiData.locations : [];
  apiData.functional_areas = Array.isArray(apiData.functional_areas)
    ? apiData.functional_areas
    : [];
  apiData.contract_period =
    typeof apiData.contract_period === "object" ? apiData.contract_period : {};

  obj.jobSummary = apiData.summary;
  obj.jobDetails = apiData.detail;
  obj.jobType = apiData.type
    ? {
        id: apiData.type.id ?? null,
        label: apiData.type?.name ?? "",
        value: apiData.type.slug ?? "",
      }
    : {};
  obj.isUrgentJob = apiData.is_urgent ? 0 : 1;
  obj.salaryNagotiable = apiData.is_salary_negotiable == 1 ? 0 : 1 ?? 0;
  obj.minimumExperience = apiData?.min_experience ?? "";
  obj.maximumExperience = apiData?.max_experience ?? "";
  obj.jobLocation = apiData.locations
    ? apiData.locations.map((item) => ({
        id: item.id,
        label: item.city,
        value: item.city,
      }))
    : [];
  obj.nationality = apiData.nationality
    ? {
        value: apiData.nationality?.name,
        label: apiData.nationality?.name,
      }
    : "";

  obj.designation = apiData.designation;
  obj.functionalAreas =
    apiData.functional_areas.length > 0
      ? apiData.functional_areas.map((item) => ({
          id: item.id,
          label: item?.name,
          value: item.slug,
        }))
      : [];
  obj.genderPreference = apiData.gender_preference
    ? {
        value: apiData.gender_preference?.name,
        label: apiData.gender_preference.label,
        id: apiData.gender_preference.label,
      }
    : {};
  obj.categoryPreference = apiData.category_prefrence
    ? {
        label: apiData.category_prefrence?.name,
        value: apiData.category_prefrence.slug,
        id: apiData.category_prefrence.id,
      }
    : {}; //
  obj.essentialQualification = apiData.essential_qualification;
  obj.desiredQualification = apiData.desired_qualification;
  obj.jobOpeningDate = startDate;
  obj.jobClosingDate = endDate;
  obj.minimumSalary =
    apiData.min_salary && apiData.min_salary?.length
      ? Math.trunc(apiData.min_salary)
      : "";
  obj.maximumSalary =
    apiData.max_salary && apiData.max_salary.length
      ? Math.trunc(apiData.max_salary)
      : "";
  obj.numberOfVacancies = apiData.vacancy;
  obj.modeofWork = apiData.work_mode
    ? {
        label: apiData.work_mode?.name,
        slug: apiData.work_mode.slug,
        id: apiData.work_mode.id,
      }
    : {}; //
  obj.flexiHours = apiData.flexi_hours ? 0 : 1;
  obj.vacanciesCountType = apiData.is_extended_vacancy == 1 ? 0 : 1;
  obj.fullTime = apiData.service_type == "Full Time" ? 0 : 1;
  obj.disabiltyPercentage = apiData?.disability_percentage ?? 0;
  obj.typeOfDisabilty = apiData?.disability_type ?? "";
  obj.notify_company = apiData?.notify_company
    ? apiData?.notify_company
    : false;
  obj.contractYear = apiData?.contract_period
    ? apiData.contract_period.years
    : 0;
  obj.contractMonth = apiData?.contract_period
    ? apiData.contract_period.months
    : 0;
  obj.contractDay = apiData?.contract_period ? apiData.contract_period.days : 0;
  obj.status = apiData?.status == 0 ? 1 : 0;
  const transformedQuestionnaire = apiData?.questionnaires?.map((item) => {
    item.question_options = Array.isArray(item.question_options)
      ? item.question_options
      : JSON.parse(item.question_options);
    if (
      Array.isArray(item.question_options) &&
      item.question_options.length > 0
    ) {
      return {
        ...item,
        typeofQuestion: getQuestionType[item.type],
        isMandatory: item.mandatory,
        question_options: item.question_options.map((option, index) => ({
          id: Date.now() + index,
          value: option,
        })),
      };
    } else {
      return {
        ...item,
        typeofQuestion: getQuestionType[item.type],
        isMandatory: item.mandatory,
      };
    }
  });
  return { obj, transformedQuestionnaire };
};
export const changeComma = (data, index) => {
  if (index < data.length) {
    return [...data.slice(0, index), "+" + (data.length - index) + " more"];
  }
  return data;
};

export const timeAgo = (dateString) => {
  const date = dayjs(dateString);
  const now = dayjs();

  const minutes = now.diff(date, "minute");
  const hours = now.diff(date, "hour");
  const days = now.diff(date, "day");
  const months = now.diff(date, "month");
  const years = now.diff(date, "year");

  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"}`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  } else {
    return `a few seconds`;
  }
};

export const containsDuplicate = (arr) => {
  const seen = new Set();
  for (const value of arr) {
    if (seen.has(value)) {
      return true; // Duplicate found
    }
    seen.add(value);
  }
  return false;
};

export const convertJSONStringArrayToIntArray = (
  jsonStringArray,
  isMultiSelect
) => {
  try {
    const stringArray = JSON.parse(jsonStringArray);
    const labelValueArray = stringArray.map((str) =>
      isMultiSelect
        ? {
            label: str,
            value: str,
            isSelected: false,
          }
        : { label: str, value: str }
    );

    return labelValueArray;
  } catch (error) {
    console.error("Error converting JSON string array to int array:", error);
    return null;
  }
};

export const convertToTime = ({ dateString, format24Hour = true }) => {
  const date = dayjs(dateString);
  const timeFormat = format24Hour ? "HH:mm" : "hh:mm A";
  const timeString = date.format(timeFormat);
  return timeString;
};

export const formateDateandTime = (date, time) => {
  const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
  const formattedTime = time ? ` ${dayjs(time).format("HH:mm:ss")}` : "";
  return formattedDate + formattedTime;
};

export const areAllValuesEmpty = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      if (!areAllValuesEmpty(obj[key])) {
        return false;
      }
    } else {
      if (obj[key] !== "") {
        return false;
      }
    }
  }
  return true;
};

export const isObjectFilled = (obj) => {
  return Object.values(obj).every((value) => value !== "");
};

export const areAllValuesFilled = (objects) => {
  return Object.values(objects).some(isObjectFilled);
};

export const capitalizePhrase = (sentence) => {
  if (!sentence.length) return "-";
  const words = sentence.split(" ");
  const new_sentence = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return new_sentence;
};

export const formatSalaryRange = (minSalary, maxSalary) => {
  const minSalaryInLpa = (minSalary / 100000).toFixed(2);
  const maxSalaryInLpa = (maxSalary / 100000).toFixed(2);
  let formattedSalaryRange = `${minSalaryInLpa}-${maxSalaryInLpa} LPA`;
  if (
    parseFloat(minSalaryInLpa) > 99.99 ||
    parseFloat(maxSalaryInLpa) > 99.99
  ) {
    const minSalaryInCRA = (minSalary / 10000000).toFixed(2);
    const maxSalaryInCRA = (maxSalary / 10000000).toFixed(2);
    formattedSalaryRange = `${minSalaryInCRA}-${maxSalaryInCRA} CRA`;
  }

  return formattedSalaryRange;
};

const key = 'manage-subscriptions'

export const doesPathIncludeAnyKey = (pathName) => {
  return pathName.includes(key);
}
