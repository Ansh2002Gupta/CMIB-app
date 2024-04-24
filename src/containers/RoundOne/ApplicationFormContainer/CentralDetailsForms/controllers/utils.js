import { addDocumentField } from "../../../../../components/AddBenfits/controllers/useAddBenefit";
import { addDesignationField } from "../../../../../components/AddDesignation/controllers/useAddDesignation";
import { interviewTypeOptions } from "../../../../../constants/constants";
import { formatCountryCode, formatDate } from "../../../../../utils/util";
import { validateEmail } from "../../../../../utils/validation";

export const addValueOnField = (state, details, isEditable, countryData) => {
  return details?.map((item) => {
    return item?.map((val) => {
      console.log(val, "val...");
      if (val?.isMobileNumber) {
        return {
          ...val,
          value: !isEditable && !state?.[val?.key] ? "--" : state?.[val?.key],
          codeValue: formatCountryCode(state?.[keys.countryCode], countryData),
        };
      }
      if (val.key === keys.campusDates) {
        return {
          ...val,
          value: isEditable
            ? state?.[val?.key]
            : state?.[val?.key] === null
            ? "--"
            : val?.options
                ?.filter((option) =>
                  state[val?.key]?.includes(String(option?.id))
                )
                ?.map((optionData) => optionData?.label),
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

export const interviewDetailsFields = (
  state,
  roundCenterDetails,
  intl,
  showInterviewMode
) => {
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
          createInterviewDateModuleOptions(
            option,
            state[keys.campusDates],
            "interview_schedule_date",
            "id",
            "id",
            showInterviewMode
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
      ...(showInterviewMode
        ? [
            {
              isDropdown: true,
              key: keys.companyAvailableForInterview,
              label: "label.companyAvailableForInterview",
              isMandatory: true,
              placeholder: "label.companyAvailableForInterview",
              valueField: "value",
              options: interviewTypeOptions.map((option) =>
                createModuleOptions(
                  option,
                  state[keys.companyAvailableForInterview]
                )
              ),
              isSingleMutliSelect: true,
            },
          ]
        : []),
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
      designationObject[item.cellID].round_company_job_detail_id = item.value
        ? Number(item.value)
        : null;
    }
    if (item?.itemId) {
      designationObject[item.cellID].id = item?.itemId;
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
    if (item?.itemId) {
      requiredObject[item.cellID].id = item?.itemId;
    }
    if (item.key == "benefits_amount") {
      requiredObject[item.cellID].amount = item.value;
    }
  });
  return Object.values(requiredObject);
};

const getDocumentData = (isCompanyPPt, fileUploadResult, pptData) => {
  const companyDetails = {};

  if (
    !Boolean(isCompanyPPt) &&
    (fileUploadResult?.data?.file_name || pptData?.file_path)
  ) {
    const logoFileName = pptData?.file_path?.split("/")?.pop();
    companyDetails.file_path =
      fileUploadResult?.data?.file_name || logoFileName;
  } else {
    companyDetails.file_path = null;
  }
  companyDetails.company_ppt = isCompanyPPt === 0 ? "yes" : "no";

  return companyDetails;
};

export const getFormattedData = (
  contactDetails,
  interviewDetailsState,
  designationDetatils,
  otherBenefits,
  isCompanyPPt,
  fileUploadResult,
  selectionProcess,
  pptData
) => {
  const designation = getDesgnationDetails(designationDetatils);
  const benefits = getOtherDetails(otherBenefits);
  const otherDetails = getDocumentData(isCompanyPPt, fileUploadResult, pptData);
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
      campus_dates: interviewDetailsState?.campusDates?.map((val) =>
        Number(val)
      ),
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
export const createInterviewDateModuleOptions = (
  module,
  contact,
  labelKey = "label",
  valueKey = "value",
  idKey = "id",
  showInterviewMode
) => {
  return {
    id: module[idKey],
    label: showInterviewMode
      ? formatDate(module[labelKey])
      : `${formatDate(module[labelKey])} (${module?.interview_type})`,
    name: module[labelKey],
    value: module[valueKey],
    isSelected: contact?.includes(String(module[valueKey])),
    selectedIndex: null,
  };
};

export const getFormattedContactDetails = (contactDetail) => {
  return {
    [keys.personName]: contactDetail?.name ?? "",
    [keys.emailId]: contactDetail?.email ?? "",
    [keys.mobileNumber]: contactDetail?.mobile_number ?? "",
    [keys.areaCode]: contactDetail?.std_country_code ?? "",
    [keys.telephoneNumber]: contactDetail?.telephone_number ?? "",
    [keys.countryCode]: contactDetail?.mobile_country_code ?? "+91 (India)",
  };
};

export const getInterviewDetails = (interviewDetails) => {
  return {
    [keys.campusDates]:
      interviewDetails?.campus_dates?.map((value) => String(value)) ?? [],
    [keys.companyAvailableForInterview]: interviewDetails?.interview_type ?? "",
  };
};

export const getSelectionProcess = (fields, selectionProcess) => {
  return fields.map((item) => {
    return {
      ...item,
      isSelected: selectionProcess?.includes(item.label),
    };
  });
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

export const getFormattedOtherBenefits = (benefitArray) => {
  return benefitArray
    ?.map((item, index) => {
      index += 1;
      let documentField = [...addDocumentField.map((item) => ({ ...item }))];
      documentField[0] = {
        ...documentField[0],
        cellID: index,
        value: item.name,
        itemId: item?.id,
      };
      documentField[1] = {
        ...documentField[1],
        cellID: index,
        value: Number(item.amount),
      };
      documentField[2] = {
        ...documentField[2],
        cellID: index,
        isAdd: index === benefitArray.length,
      };

      return documentField;
    })
    .flat();
};

export const getDesignationsData = (designationArray, options) => {
  return designationArray
    ?.map((item, index) => {
      index += 1;
      let designationField = [
        ...addDesignationField(options).map((item) => ({ ...item })),
      ];
      designationField[0] = {
        ...designationField[0],
        cellID: index,
        value: item.round_company_job_detail_id,
        itemId: item?.id,
      };
      designationField[1] = {
        ...designationField[1],
        cellID: index,
        value: Number(item.no_of_vacancy),
      };
      designationField[2] = {
        ...designationField[2],
        cellID: index,
        isAdd: index === designationArray.length,
      };

      return designationField;
    })
    .flat();
};
