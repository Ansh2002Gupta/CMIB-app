import { interviewTypeOptions } from "../../../../../constants/constants";
import { formatCountryCode } from "../../../../../utils/util";
import { validateEmail } from "../../../../../utils/validation";

export const addValueOnField = (state, details, isEditable, countryData) => {
  return details?.map((item) => {
    return item?.map((val) => {
      console.log();
      if (item?.isMobileNumber) {
        return {
          ...item,
          value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
          codeValue: formatCountryCode(state?.mobile_country_code, countryData),
        };
      }
      return {
        ...val,
        value: isEditable
          ? state?.[val?.key]
          : state?.[val?.key] === null
          ? "--"
          : state?.[val?.key],
      };
    });
  });
};

export const keys = {
  personName: "personName",
  emailId: "emailId",
  mobileNumber: "mobileNumber",
  areaCode: "areaCode",
  telephoneNumber: "telephoneNumber",
  campusDates: "campusDates",
  companyAvailableForInterview: "companyAvailableForInterview",
  countryCode: "countryCode",
  contactDetails: "contactDetails",
  interviewDetails: "interviewDetails",
  groupDiscussion: "groupDiscussion",
  psychometricWrittenTest: "psychometricWrittenTest",
  personalInterview: "personalInterview",
};

export const contactDetailFields = (countryData, intl) => {
  return [
    [
      {
        key: keys.personName,
        label: "label.contact_person",
        placeholder: "label.contact_person",
        isMandatory: true,
        validate: (value) => {
          if (!value) {
            return intl.formatMessage({
              id: "label.fill_mandatory",
            });
          }
        },
      },
      {
        key: keys.emailId,
        label: "label.email_id",
        placeholder: "label.email_id",
        isMandatory: true,
        isEmail: true,
        validate: (value) => {
          if (value && validateEmail(value)) {
            return intl.formatMessage({ id: "label.email_id_validation" });
          }
        },
      },
    ],
    [
      {
        key: keys.mobileNumber,
        label: "label.mobile_number",
        placeholder: "label.mobile_number",
        isMandatory: true,
        isMobileNumber: true,
        isNumeric: true,
        options: countryData,
        validate: (value) => {
          if (!value) {
            return intl.formatMessage({
              id: "label.fill_mandatory",
            });
          }
        },
      },
      {
        key: keys.areaCode,
        label: "label.areaCode",
        placeholder: "label.areaCode",
      },
    ],
    [
      {
        key: keys.telephoneNumber,
        label: "label.telephoneNumber",
        placeholder: "label.telephoneNumber",
        isNumeric: true,
      },
      { isEmptyField: true },
    ],
  ];
};

export const interviewDetailsFields = (state, roundCenterDetails, intl) => {
  return [
    [
      {
        isDropdown: true,
        key: keys.campusDates,
        label: "label.companyDates",
        isMandatory: true,
        showBadgeLabel: true,
        isMultiSelect: true,
        isDropdown: true,
        placeholder: "label.select_module",
        valueField: "id",
        labelField: "label",
        defaultValues: [],
        options: roundCenterDetails?.interview_dates?.map((option) =>
          createModuleOptions(
            option,
            state[keys.campusDates],
            "interview_schedule_date",
            "id"
          )
        ),
        isSingleMutliSelect: true,
        validate: (value) => {
          if (!value) {
            return intl.formatMessage({
              id: "label.fill_mandatory",
            });
          }
        },
      },
      {
        isDropdown: true,
        key: keys.companyAvailableForInterview,
        label: "label.companyAvailableForInterview",
        placeholder: "label.companyAvailableForInterview",
        valueField: "value",
        options: interviewTypeOptions.map((option) =>
          createModuleOptions(option, state[keys.companyAvailableForInterview])
        ),
        isSingleMutliSelect: true,
      },
    ],
    [],
  ];
};

const getDesgnationDetails = (designationDetatils) => {
  let designationObject = {};

  designationDetatils.forEach((item, index) => {
    let temp = {};
    if (!designationObject[item.cellID]) {
      designationObject[item.cellID] = temp;
    }
    if (item.key == "designation_details") {
      designationObject[item.cellID].round_company_job_detail_id = Number(
        item.value
      );
    }
    if (item.key == "number_of_vacancies") {
      designationObject[item.cellID].no_of_vacancy = Number(item.value);
    }
  });
  return Object.values(designationObject);
};

const getOtherDetails = (otherDetailsData) => {
  let requiredObject = {};
  otherDetailsData.forEach((item, index) => {
    let temp = {};
    if (!requiredObject[item.cellID]) {
      requiredObject[item.cellID] = temp;
    }
    if (item.key == "benefits_details") {
      requiredObject[item.cellID].name = item.value;
    }
    if (item.key == "benefits_amount") {
      requiredObject[item.cellID].amount = item.value;
    }
  });
  return Object.values(requiredObject);
};

const getDocumentData = (isCompanyPPt, fileUploadResult, profileData) => {
  const companyDetails = {};

  if (fileUploadResult?.data?.file_name || profileData?.companyLogo) {
    const logoFileName = profileData?.companyLogo?.split("/")?.pop();
    companyDetails.file_path =
      fileUploadResult?.data?.file_name || logoFileName;
  } else {
    companyDetails.file_path = null;
  }
  companyDetails.company_ppt = isCompanyPPt === "0" ? "yes" : "no";

  return companyDetails;
};

export const getFormattedData = (
  contactDetails,
  interviewDetailsState,
  designationDetatils,
  otherBenefits,
  isCompanyPPt,
  fileUploadResult,
  selectionProcess
) => {
  const designation = getDesgnationDetails(designationDetatils);
  const benefits = getOtherDetails(otherBenefits);
  const otherDetails = getDocumentData(isCompanyPPt, fileUploadResult);
  return {
    contact_person_info: {
      name: contactDetails[keys.personName],
      email: contactDetails[keys.emailId],
      mobile_country_code: contactDetails[keys.countryCode],
      mobile_number: contactDetails[keys.mobileNumber],
      std_country_code: contactDetails[keys.areaCode],
      telephone_number: contactDetails[keys.telephoneNumber],
    },
    interview_details: {
      campus_dates: interviewDetailsState?.campusDates,
      interview_type: interviewDetailsState?.companyAvailableForInterview,
    },
    selection_process: selectionProcess,
    designation_details: designation,
    other_details: otherDetails,
    other_benefits: benefits,
  };
};

export const createModuleOptions = (
  module,
  contact,
  labelKey = "label",
  valueKey = "value",
  idKey = "id"
) => {
  return {
    id: module[idKey],
    label: module[labelKey],
    name: module[labelKey],
    value: module[valueKey],
    isSelected: contact?.includes(String(module[valueKey])),
    selectedIndex: null,
  };
};

export const getFormattedContactDetails = (contactDetail) => {
  return {
    [keys.personName]: contactDetail[""],
    [keys.emailId]: contactDetail[""],
    [keys.mobileNumber]: contactDetail[""],
    [keys.areaCode]: contactDetail[""],
    [keys.telephoneNumber]: contactDetail[""],
  };
};

export const selectionProcessFields = (intl) => [
  {
    label: intl.formatMessage({ id: "label.groupDiscussion" }),
    value: intl.formatMessage({ id: "label.groupDiscussion" }),
    key: keys.groupDiscussion,
    isSelected: false,
  },
  {
    label: intl.formatMessage({ id: "label.psychometricWrittenTest" }),
    value: intl.formatMessage({ id: "label.psychometricWrittenTest" }),
    key: keys.psychometricWrittenTest,
    isSelected: false,
  },
  {
    label: intl.formatMessage({ id: "label.personalInterview" }),
    value: intl.formatMessage({ id: "label.personalInterview" }),
    key: keys.personalInterview,
    isSelected: false,
  },
];
