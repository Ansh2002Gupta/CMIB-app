import colors from "../../../assets/colors";
import { about } from "./constants";

export const getAboutData = (data) => {
  const { company_details, website, industryType, companyType, location } =
    data ?? {};

  return [
    [
      {
        key: about.website.key,
        isMandatory: true,
        label: about.website.label,
        placeholder: about.website.label,
        isLink: website ? true : false,
        value: website ?? "--",
      },
    ],
    [
      {
        key: about.shortProfile.key,
        label: about.shortProfile.label,
        placeholder: about.shortProfile.label,
        value: company_details ?? "--",
      },
    ],
    [
      {
        key: about.currentIndustry.key,
        label: about.currentIndustry.label,
        placeholder: about.currentIndustry.label,
        value: industryType ?? "--",
      },
    ],
    [
      {
        key: about.companyType.key,
        label: about.companyType.label,
        placeholder: about.companyType.label,
        value: companyType ?? "--",
      },
    ],
    [
      {
        key: about.location.key,
        label: about.location.label,
        placeholder: about.location.label,
        value: location ?? "--",
      },
    ],
  ];
};

const getStringFromObjectArray = (arr = [], key) => {
  return arr?.map((value) => value[key]);
};

const getLocationString = (locationArr, key, separator = "/") => {
  return locationArr.map((loc) => loc[key]).join(separator);
};

const getHeaderChipData = (noOfVacancy, isUrgent, intl) => {
  let chipData = [];

  if (noOfVacancy !== null || noOfVacancy !== undefined) {
    chipData.push({
      label: intl.formatMessage(
        { id: "label.formatVacancies" },
        { value: noOfVacancy }
      ),
      bgColor: colors.lightOrangeSecond,
      textColor: colors.errorRed,
    });
  }

  if (isUrgent) {
    chipData.push({
      label: intl.formatMessage({ id: "label.urgent" }),
      bgColor: colors.skyBlueLightSecond,
      textColor: colors.darkBlue,
    });
  }

  return chipData;
};

function formatNumberInLPA(number) {
  if (!number) return ""; // Return an empty string if the number is not provided
  const inLakhs = number / 100000;
  return inLakhs.toFixed(0); // Rounds to 0 decimal places
}

function formatSalaryRange(min_salary = "", max_salary = "", intl) {
  const formattedMinSalary = formatNumberInLPA(Number(min_salary));
  const formattedMaxSalary = formatNumberInLPA(Number(max_salary));

  if (formattedMinSalary && formattedMaxSalary) {
    return intl.formatMessage(
      { id: "label.formatMinMaxSalary" },
      { minValue: formattedMinSalary, maxValue: formattedMaxSalary }
    );
  } else if (formattedMinSalary) {
    return intl.formatMessage(
      { id: "label.formatMinSalary" },
      { value: formattedMinSalary }
    );
  } else if (formattedMaxSalary) {
    return intl.formatMessage(
      { id: "label.formatMaxSalary" },
      { value: formattedMaxSalary }
    );
  } else {
    return "";
  }
}

function formatExperience(minExperience, maxExperience, intl) {
  let formatted_string;

  if (minExperience && maxExperience) {
    formatted_string = intl.formatMessage(
      { id: "label.formatMinMaxExperience" },
      { minValue: minExperience, maxValue: maxExperience }
    );
  } else if (minExperience) {
    formatted_string = intl.formatMessage(
      { id: "label.formatMinExperience" },
      { value: minExperience }
    );
  } else if (maxExperience) {
    formatted_string = intl.formatMessage(
      { id: "label.formatMaxExperience" },
      { value: maxExperience }
    );
  } else {
    formatted_string = "";
  }

  return formatted_string;
}

export const jobDetailModel = (data = {}, intl) => {
  const {
    detail,
    designation,
    vacancy,
    is_urgent: isUrgent,
    min_experience,
    max_experience,
    min_salary,
    max_salary,
    is_contractual,
  } = data ?? {};

  const {
    name: companyName,
    type: companyType,
    company_details,
    website,
    industry,
    company_logo: companyLogo,
  } = data?.company ?? {};

  const { name: industryName } = industry ?? {};

  const companyLocation = getLocationString(
    data?.locations ?? [],
    "city",
    ", "
  );
  const functionalAreas = getStringFromObjectArray(
    data?.functional_areas ?? [],
    "name"
  );

  const companyDetail = getAboutData({
    companyName,
    company_details,
    website,
    companyType,
    industryType: industryName,
    location: companyLocation ? companyLocation : "--",
  });

  const chipData = getHeaderChipData(vacancy, isUrgent, intl);

  const salaryText = formatSalaryRange(min_salary, max_salary, intl);
  const experienceText = formatExperience(min_experience, max_experience, intl);

  return {
    jobDescription: {
      summary: detail ?? "",
    },
    functionalAreas,
    companyDetail,
    headerData: {
      logoUrl: companyLogo,
      location: companyLocation,
      companyName: companyName ?? "--",
      designation: designation ?? "--",
      chipData,
      isContractual: is_contractual,
      salaryText: salaryText,
      experienceText: experienceText,
    },
  };
};
