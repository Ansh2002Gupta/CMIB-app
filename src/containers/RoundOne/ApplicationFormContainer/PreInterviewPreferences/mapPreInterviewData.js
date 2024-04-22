import {
  COMPANY_DETAIL_MAX_LENGTH,
  NEWLY_QUALIFIED,
} from "../../../../constants/constants";

export const mapApiDataToUI = (currentModule) => {
  const preInterviewPrefrencesToggleArray = [
    {
      key: "participating",
      label: "label.participating",
      placeholder: "label.participating",
      value: null,
      isToggle: true,
      useExactToggleValue: true,
      isMandatory: true,
    },
  ];

  const preInterviewPrefrences = [
    {
      key: "short_listing_criteria",
      label: "label.short_listing_criteria",
      value: "",
      placeholder: "label.enter_short_listing_criteria",
      isMultiline: true,
      maxLength: COMPANY_DETAIL_MAX_LENGTH,
    },
    {
      key: "other_details",
      label: "label.any_other_information",
      value: "",
      placeholder: "label.enter_any_other_information",
      isMultiline: true,
      maxLength: COMPANY_DETAIL_MAX_LENGTH,
    },
  ];
  if (currentModule !== NEWLY_QUALIFIED) {
    return {
      preInterviewPrefrences: [
        ...preInterviewPrefrencesToggleArray,
        ...preInterviewPrefrences,
      ],
    };
  } else {
    return { preInterviewPrefrences: [...preInterviewPrefrences] };
  }
};
