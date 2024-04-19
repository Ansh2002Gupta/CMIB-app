import { COMPANY_DETAIL_MAX_LENGTH } from "../../../../constants/constants";

export const mapApiDataToUI = () => {
  return {
    preInterviewPrefrences: [
      {
        key: "short_listing_criteria",
        label: "label.short_listing_criteria",
        value: "",
        placeholder: "label.enter_short_listing_criteria",
        isMultiline: true,
        maxLength: COMPANY_DETAIL_MAX_LENGTH,
      },
      {
        key: "short_listing_criteria",
        label: "label.any_other_information",
        value: "",
        placeholder: "label.enter_any_other_information",
        isMultiline: true,
        maxLength: COMPANY_DETAIL_MAX_LENGTH,
      },
    ],
  };
};
