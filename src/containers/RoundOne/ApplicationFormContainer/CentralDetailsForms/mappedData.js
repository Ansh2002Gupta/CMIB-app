import { Platform } from "@unthinkable/react-core-components";
import {
  ADDRESS_MAX_LENGTH,
  CODE_MAX_LENGTH,
  COMPANY_DETAIL_MAX_LENGTH,
  COMPANY_TYPE_OPTIONS,
  DEFAULT_INPUT_MAX_LENGTH,
  ENTITY_OPTIONS,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  MODULE_OPTIONS,
  NATURE_OF_SUPPLIER,
  NUMBER_OF_PARTNERS_LENGTH,
  NUMBER_MAX_LENGTH,
  SALUTATION_OPTIONS,
} from "../../../../constants/constants";

export const mapApiDataToUI = ({ apiData, isEditMode = false }) => {
  const {} = apiData ?? {};

  const checkValue = (value, showPlaceholder = true) => {
    if (isEditMode) {
      return value || "";
    }
    return value || (showPlaceholder ? "--" : "");
  };

  return {
    contactPersonalDetails: [
      [
        { label: "label.contact_person", placeholder: "label.contact_person" },
        { label: "label.email_id", placeholder: "label.email_id" },
        {
          label: "label.mobile_number",
          placeholder: "label.mobile_number",
          isMobileNumber: true,
        },
      ],
      [
        { label: "label.areaCode", placeholder: "label.areaCode" },
        {
          label: "label.telephoneNumber",
          placeholder: "label.telephoneNumber",
        },
        { isEmptyField: true },
      ],
    ],
    interviewDetails: [
      [
        {
          label: "label.campusDates",
          placeholder: "label.campusDates",
          isMandatory: true,
        },
        {
          label: "label.companyAvailableForInterview",
          placeholder: "label.selectCompany",
          isMandatory: true,
        },
      ],
    ],
  };
};
