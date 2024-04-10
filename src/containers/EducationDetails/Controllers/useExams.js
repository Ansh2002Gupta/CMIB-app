import { useState } from "react";
import { MONTHS, YEARS } from "../../../constants/constants";
import { useIntl } from "react-intl";

const ca_foundation = () => [
  {
    key: "foundation_month",
    label: "label.month",
    placeholder: "label.month",
    isDropdown: true,
    options: MONTHS,
  },
  {
    key: "foundation_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "foundation_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "foundation_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
  {
    key: "foundation_attempt_count",
    label: "label.foundation_attempt_count",
    placeholder: "label.foundation_attempt_count",
    isNumeric: true,
  },
];
const ca_inter = () => [
  {
    key: "intern_month",
    label: "label.month",
    placeholder: "label.month",
    isDropdown: true,
    options: MONTHS,
  },
  {
    key: "intern_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "intern_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "intern_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];

const ca_final = () => [
  {
    key: "final_month",
    label: "label.month",
    placeholder: "label.month",
    isDropdown: true,
    options: MONTHS,
  },
  {
    key: "final_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "final_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "final_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    return {
      ...item,
      value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
      codeValue: state.codeValue,
    };
  });
};

const validateOnBlur = ({ state, details, key, index, intl }) => {
  const value = state[key];
  const updatedData = details.map((item, i) => {
    if (key === item.key) {
      return {
        ...item,
        value,
        error: item.validate ? item.validate(value, intl) : "",
      };
    }
    return item;
  });
  return updatedData;
};

export const useExams = ({ state, isEditable }) => {
  const intl = useIntl();
  const [foundationDetailState, setFoundationDetailState] = useState(
    ca_foundation()
  );
  const [interDetailState, setInterDetailState] = useState(ca_inter());
  const [finalDetailState, setFinalDetailState] = useState(ca_final());

  const handleFoundationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: foundationDetailState,
      key,
      index,
      intl,
    });
    setFoundationDetailState(updatedData);
  };
  const handleInternDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: interDetailState,
      key,
      index,
      intl,
    });
    setInterDetailState(updatedData);
  };
  const handleFinalDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: finalDetailState,
      key,
      index,
      intl,
    });
    setFinalDetailState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...foundationDetailState,
      ...interDetailState,
      ...finalDetailState,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    ca_foundation: addValueOnField({
      state,
      details: foundationDetailState,
      isEditable,
    }),
    ca_inter: addValueOnField({
      state,
      details: interDetailState,
      isEditable,
    }),
    ca_final: addValueOnField({
      state,
      details: finalDetailState,
      isEditable,
    }),
    handleFoundationDetailBlur,
    handleInternDetailBlur,
    handleFinalDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
