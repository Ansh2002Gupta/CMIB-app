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
      },
      {
        key: keys.emailId,
        label: "label.email_id",
        placeholder: "label.email_id",

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
        isMandatory: false,
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

export const interviewDetailsFields = (state) => {
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
        options: interviewTypeOptions.map((option) =>
          createModuleOptions(option, state[keys.campusDates])
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

export const getFormattedData = (contactDetails) => {
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
      campus_dates: [],
      interview_type: "",
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
};

export const createModuleOptions = (module, contact) => {
  return {
    label: module.label,
    name: module.label,
    value: module.value,
    isSelected: contact?.includes(module.value),
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
