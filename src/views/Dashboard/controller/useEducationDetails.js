import { useState } from "react";
import { Education_Status_Options, YEARS } from "../../../constants/constants";
import { useIntl } from "react-intl";

const educational_detail = () => [
  {
    key: "examination_name",
    label: "label.name_of_examination",
    placeholder: "label.name_of_examination_placeholder",
  },
  {
    key: "status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];
const higher_secondary_detail = () => [
  {
    key: "higher_secondary",
    label: "label.higher_secondary",
    placeholder: "label.higher_secondary",
  },
  {
    key: "higher_secondary_status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "higher_board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "higher_secondary_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "higher_secondary_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "higher_secondary_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];

const graduation_detail = () => [
  {
    key: "graduation",
    label: "label.graduation",
    placeholder: "label.graduation",
    isToggle: true,
  },
  {
    key: "graduation_examination_name",
    label: "label.name_of_examination",
    placeholder: "label.name_of_examination_placeholder",
    isDropdown: true,
  },
  {
    key: "graduation_status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "graduation_board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "graduation_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "graduation_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "graduation_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];

const post_graduation_detail = () => [
  {
    key: "post_graduation",
    label: "label.post_graduation",
    placeholder: "label.post_graduation",
    isToggle: true,
  },
  {
    key: "post_graduation_examination_name",
    label: "label.name_of_examination",
    placeholder: "label.name_of_examination_placeholder",
    isDropdown: true,
  },
  {
    key: "post_graduation__status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "post_graduation_board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "post_graduation_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "post_graduation_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "post_graduation_rank_medal",
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

export const useEducationDetails = ({ state, isEditable }) => {
  const intl = useIntl();
  const [educationalDetailState, setEducationalDetailState] = useState(
    educational_detail()
  );
  const [higherSecondaryDetailState, setHigherSecondaryDetailState] = useState(
    higher_secondary_detail()
  );
  const [graduationDetailState, setGraduationDetailState] = useState(
    graduation_detail()
  );
  const [postGraduationDetailState, setPostGraduationDetailState] = useState(
    post_graduation_detail()
  );

  const handleEducationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: educationalDetailState,
      key,
      index,
      intl,
    });
    setEducationalDetailState(updatedData);
  };

  const handleHigherSecondaryDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: higherSecondaryDetailState,
      key,
      index,
      intl,
    });
    setHigherSecondaryDetailState(updatedData);
  };

  const handleGraduationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: graduationDetailState,
      key,
      index,
      intl,
    });
    setGraduationDetailState(updatedData);
  };

  const handlePostGraduationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: postGraduationDetailState,
      key,
      index,
      intl,
    });
    setPostGraduationDetailState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...educationalDetailState,
      ...higherSecondaryDetailState,
      ...graduationDetailState,
      ...postGraduationDetailState,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    education_detail: addValueOnField({
      state,
      details: educationalDetailState,
      isEditable,
    }),
    higher_secondary_detail: addValueOnField({
      state,
      details: higherSecondaryDetailState,
      isEditable,
    }),
    graduation_detail: addValueOnField({
      state,
      details: graduationDetailState,
      isEditable,
    }),
    post_graduation_detail: addValueOnField({
      state,
      details: postGraduationDetailState,
      isEditable,
    }),
    handleEducationDetailBlur,
    handleHigherSecondaryDetailBlur,
    handleGraduationDetailBlur,
    handlePostGraduationDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
