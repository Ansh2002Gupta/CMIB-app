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
};

export const contactDetailFields = (countryData, intl) => {
  return [
    [
      {
        key: keys.personName,
        label: "label.contact_person",
        placeholder: "label.contact_person",
        isMandatory: true,
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

export const interviewDetailsFields = (state, roundCenterDetails) => {
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
        valueField: "value",
        defaultValues: [],
        options: roundCenterDetails?.interview_dates?.map((option) =>
          createModuleOptions(
            option,
            state[keys.campusDates],
            "interview_schedule_date",
            "interview_schedule_date"
          )
        ),
        isSingleMutliSelect: true,
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
  companyDetails.company_ppt = isCompanyPPt;

  return companyDetails;
};

export const getFormattedData = (
  contactDetails,
  interviewDetailsState,
  designationDetatils,
  otherBenefits,
  isCompanyPPt,
  fileUploadResult
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
    selection_process: ["Group Discussion"],
    designation_details: designation,
    other_details: otherDetails,
    other_benefits: benefits,
  };
};

export const createModuleOptions = (
  module,
  contact,
  labelKey = "label",
  valueKey = "value"
) => {
  return {
    label: module[labelKey],
    name: module[labelKey],
    value: module[valueKey],
    isSelected: contact?.includes(module[valueKey]),
    selectedIndex: null,
  };
};

let dummyApplicatonData = {
  contact_person_info: {
    name: "Test",
    email: "email@example.com",
    mobile_country_code: "+91",
    mobile_number: "9999999999",
    std_country_code: "011",
    telephone_number: "246822323",
  },
  interview_details: {
    campus_dates: [1, 2, 3],
    interview_type: "virtual",
  },
  designation_details: [
    {
      id: 1,
      round_company_job_detail_id: 1,
      no_of_vacancy: 30,
    },
    {
      id: 2,
      round_company_job_detail_id: 3,
      no_of_vacancy: 30,
    },
  ],
  other_details: {
    company_ppt: "yes",
    file_path: "<path.ext>",
  },
  other_benefits: [
    {
      id: 1,
      name: "Meals and Snacks",
      amount: 5000,
    },
    {
      id: 2,
      name: "Parental",
      amount: 5000,
    },
  ],
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
