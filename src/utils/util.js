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
    is_salary_negotiable: jobData.salaryNagotiable == 0 ? true : false,
    experience: {
      min_experience: jobData.minimumExperience,
      max_experience: jobData.maximumExperience,
    },
    location_id: jobData.jobLocation.map((object) => object.id),
    nationality: jobData.nationality?.value ?? null,
    designation: jobData.designation,
    functional_area_id: jobData.functionalAreas.map((object) => object.id),
    gender_preference: jobData.genderPreference?.value ?? null,
    category_preference: jobData.categoryPreference?.label,
    essential_qualification: jobData.essentialQualification,
    desired_qualification: jobData.desiredQualification,
    job_opening_date: dayjs(jobData.jobOpeningDate).format("YYYY-MM-DD"),
    job_closing_date: dayjs(jobData.jobClosingDate).format("YYYY-MM-DD"),
    min_salary: jobData.minimumSalary,
    max_salary: jobData.maximumSalary,
    number_of_vacancies: jobData.numberOfVacancies,
    work_mode: jobData.modeofWork?.label,
    flexi_hours: jobData.flexiHours == 0 ? true : false,
    is_extended_vacancy: jobData.vacanciesCountType == 0 ? true : false,
    service_type: jobData.fullTime == 0 ? "Full Time" : "Part Time",
    notify_company: isCheckList,
  };
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
export const getQuestionType = {
  text: "Text Question",
  "single-select": "Single-select",
  "multi-select": "Multi-select",
};
export const getDecryptApiData = (apiData, addJobs) => {
  let obj = {};
  apiData.locations = Array.isArray(apiData.location_id)
    ? apiData.location_id
    : JSON.parse(apiData.location_id);
  apiData.functional_areas = Array.isArray(apiData.functional_area_id)
    ? apiData.functional_area_id
    : JSON.parse(apiData.functional_area_id);
  apiData.contract_period =
    typeof apiData.contract_period === "object"
      ? apiData.contract_period
      : JSON.parse(apiData.contract_period);

  obj.jobSummary = apiData.summary;
  obj.jobDetails = apiData.detail;
  obj.jobType = apiData.job_type_id
    ? addJobs.jobType
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.slug,
        }))
        .find((item) => item.id === apiData.job_type_id) || {}
    : {};
  obj.isUrgentJob = apiData.is_urgent ? 0 : 1;
  obj.salaryNagotiable = apiData.is_salary_negotiable == 1 ? 0 : 1 ?? 0;
  obj.minimumExperience = apiData?.min_experience;
  obj.maximumExperience = apiData?.max_experience;
  obj.jobLocation = apiData.locations
    ? addJobs.jobLocationData
        .filter((item) => {
          if (apiData.locations.includes(item.id)) {
            return item;
          }
        })
        .map((item) => ({
          id: item.id,
          label: item.city,
          value: item.city,
        }))
    : [];
  obj.nationality = apiData.nationality
    ? addJobs.countryData.find((item) => {
        if (item.name === apiData.nationality) {
          item.value = item.name;
          item.label = item.name;
          delete item.name;
          return true;
        }
        return false;
      }) || ""
    : "";

  obj.designation = apiData.designation;
  obj.functionalAreas =
    apiData.functional_areas.length > 0
      ? addJobs.functionalData
          .filter((item) => apiData.functional_areas.includes(item.id))
          .map((item) => ({
            id: item.id,
            label: item.name,
            value: item.slug,
          }))
      : [];
  obj.genderPreference = apiData.gender_preference
    ? addJobs.genderPreferenceData
        ?.filter((item) => item.name == apiData.gender_preference)
        .map((item) => ({
          id: item.name,
          label: item.label,
          value: item.name,
        }))[0]
    : {};
  obj.categoryPreference = apiData.category_preference
    ? addJobs.jobCategory
        ?.filter((item) => {
          if (item.name == apiData.category_preference) {
            return item;
          }
        })
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.slug,
        }))[0]
    : {}; //
  obj.essentialQualification = apiData.essential_qualification;
  obj.desiredQualification = apiData.desired_qualification;
  obj.jobOpeningDate = apiData.opening_date;
  obj.jobClosingDate = apiData.closing_date;
  obj.minimumSalary = Math.trunc(apiData.min_salary);
  obj.maximumSalary = Math.trunc(apiData.max_salary);
  obj.numberOfVacancies = apiData.vacancy;
  obj.modeofWork = apiData.work_mode
    ? addJobs.workModeData
        .filter((item) => {
          if (item.name == apiData.work_mode) {
            return item;
          }
        })
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.slug,
        }))[0]
    : {}; //
  obj.flexiHours = apiData.flexi_hours ? 0 : 1;
  obj.vacanciesCountType = apiData.is_extended_vacancy == 1 ? 0 : 1;
  obj.fullTime = apiData.service_type == "Full Time" ? 0 : 1;
  obj.disabiltyPercentage = apiData?.disability_percentage ?? 0;
  obj.typeOfDisabilty = apiData?.disability_type ?? "";
  obj.contractYear = apiData?.contract_period
    ? apiData.contract_period.years
    : 0;
  obj.contractMonth = apiData?.contract_period
    ? apiData.contract_period.months
    : 0;
  obj.contractDay = apiData?.contract_period ? apiData.contract_period.days : 0;
  const transformedQuestionnaire = apiData?.questionnaires.map((item) => {
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
