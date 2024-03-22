import { useState } from "react";
import { YEARS } from "../../constants/constants";
import { useIntl } from "react-intl";

const other_courses = () => [
  {
    key: "examination_name",
    label: "label.name_of_examination",
    placeholder: "label.name_of_examination_placeholder",
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
    key: "cgpa",
    label: "label.grade_cgpa",
    placeholder: "label.grade_cgpa",
    isNumeric: true,
  },
  {
    key: "mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "other_courses_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
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

export const useOtherCourses = ({ state, isEditable }) => {
  const intl = useIntl();
  const [otherCoursesState, setOtherCoursesState] = useState(other_courses());

  const handleOtherCoursesBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: otherCoursesState,
      key,
      index,
      intl,
    });
    setOtherCoursesState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [...otherCoursesState].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    other_courses: addValueOnField({
      state,
      details: otherCoursesState,
      isEditable,
    }),
    handleOtherCoursesBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
