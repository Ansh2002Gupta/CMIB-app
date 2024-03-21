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

export function validateJobData(data) {
  let errors = {};

  if (!data.jobSummary.trim()) errors.jobSummary = "Job summary is required";
  if (!data.jobDetails.trim()) errors.jobDetails = "Job details are required";
  if (!data.designation.trim()) errors.designation = "Designation is required";
  if (Object.keys(data.jobType).length === 0)
    errors.jobType = "Job type is required";
  if (Object.keys(data.jobLocation).length === 0)
    errors.jobLocation = "Job location is required";
  if (Object.keys(data.functionalAreas).length === 0)
    errors.functionalAreas = "Functional Areas  is required";
  if (Object.keys(data.categoryPreference).length === 0)
    errors.categoryPreference = "Category Preference is required";
  if (Object.keys(data.modeofWork).length === 0)
    errors.modeofWork = "Mode of work is required";
  if (data.minimumExperience < 0)
    errors.minimumExperience = "Minimum experience cannot be negative";
  if (data.maximumExperience < data.minimumExperience)
    errors.maximumExperience =
      "Maximum experience cannot be less than minimum experience";
  if (data.numberOfVacancies <= 0)
    errors.numberOfVacancies = "Number of vacancies must be greater than zero";
  if (data.minimumSalary < 0)
    errors.minimumSalary = "Minimum salary cannot be negative";
  if (data.maximumSalary < data.minimumSalary)
    errors.maximumSalary = "Maximum salary cannot be less than minimum salary";
  if (data.maximumExperience == data.minimumExperience) {
    errors.maximumExperience = "Maximum Minimum salary cannot be same";
    errors.minimumExperience = "Maximum Minimum salary cannot be same";
  }
  if (
    data.jobType.label == jobType.CONTRACTUAL &&
    data.contractYear === 0 &&
    data.contractMonth === 0 &&
    data.contractDay === 0
  ) {
    errors.contractYear = "Contract Period is required";
    errors.contractMonth = "Contract Period is required";
    errors.contractDay = "Contract Period is required";
  }
  if (data.jobType.label == jobType.SPECIALLY_ABLE && !data.typeOfDisabilty) {
    errors.typeOfDisabilty = "Type of Disability is required";
  }
  if (
    data.jobType.label == jobType.SPECIALLY_ABLE &&
    data.disabiltyPercentage == 0
  ) {
    errors.disabiltyPercentage = "Disability% should be greater than 0";
  }

  if (!(data.jobOpeningDate instanceof Date) || isNaN(data.jobOpeningDate))
    errors.jobOpeningDate = "Job opening date is invalid";
  if (!(data.jobClosingDate instanceof Date) || isNaN(data.jobClosingDate))
    errors.jobClosingDate = "Job closing date is invalid";
  if (data.jobClosingDate < data.jobOpeningDate)
    errors.jobClosingDate =
      "Job closing date must be after the job opening date";
  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
export function validateQuestions(questions) {
  let isValidQuestion = true;
  const questionError = {};

  questions.forEach((question) => {
    let questionErrors = [];

    if (question.typeofQuestion === "Text Question") {
      if (!question.question || question.question.trim() === "") {
        questionErrors.push(
          "Text Question must have a non-empty question field."
        );
      }
    } else if (question.typeofQuestion !== "Text Question") {
      if (!question.question || question.question.trim() === "") {
        questionErrors.push("Question must have a non-empty question field.");
      }
      if (
        !Array.isArray(question.question_options) ||
        question.question_options.length === 0
      ) {
        questionErrors.push("Question must have at least one option.");
      } else {
        question.question_options.forEach((option) => {
          if (!option.value || option.value.trim() === "") {
            questionErrors.push("All options must have a non-empty value.");
          }
        });
      }
    } else {
      questionErrors.push("Invalid question type.");
    }

    if (questionErrors.length > 0) {
      isValidQuestion = false;
      questionError[question.id] = questionErrors;
    }
  });

  return { isValidQuestion, questionError };
}
export const getFormatedData = (jobData, question) => {
  let temp = {
    summary: jobData.jobSummary,
    detail: jobData.jobDetails,
    job_type_id: jobData.jobType?.id,
    isUrgent: jobData.isUrgentJob == 0 ? true : false,
    is_salary_negotiable: jobData.salaryNagotiable == 0 ? true : false,
    experience: {
      min_experience: jobData.minimumExperience,
      max_experience: jobData.maximumExperience,
    },
    location_id: jobData.jobLocation.map((object) => object.id),
    nationality: jobData.nationality?.value,
    designation: jobData.designation,
    functional_area_id: jobData.functionalAreas.map((object) => object.id),
    gender_preference: jobData.genderPreference?.value,
    category_preference: jobData.categoryPreference?.label,
    essential_qualification: jobData.essentialQualification,
    desired_qualification: jobData.desiredQualification,
    job_opening_date: jobData.jobOpeningDate.toISOString().slice(0, 10),
    job_closing_date: jobData.jobClosingDate.toISOString().slice(0, 10),
    min_salary: jobData.minimumSalary,
    max_salary: jobData.maximumSalary,
    number_of_vacancies: jobData.numberOfVacancies,
    work_mode: jobData.modeofWork?.label,
    flexi_hours: jobData.flexiHours == 0 ? true : false,
    is_extended_vacancy: jobData.vacanciesCountType == 0 ? true : false,
    service_type: jobData.fullTime == 0 ? "Full Time" : "Part Time",
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
      type: questionType[item.typeofQuestion],
      question: item.question,
      question_options: item.question_options,
      question_order: item.question_order,
      mandatory: item.isMandatory,
    };
  });
  temp.questions = tempQuestion;
  return temp;
};
export const getValidUrl = (url) => {
  let link = url.toLowerCase();
  if (!/^https?:\/\//.test(link) && !/^http?:\/\//.test(link)) {
    link = `https://${link}`;
  }
  return link;
};
