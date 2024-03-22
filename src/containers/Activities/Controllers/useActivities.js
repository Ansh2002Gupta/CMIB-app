import { useState } from "react";
import { BOOLEAN_OPTION } from "../../../constants/constants";
import { useIntl } from "react-intl";

const achievements = () => [
  {
    key: "obtained_scholarships",
    label: "label.obtained_scholarships",
    isDropdown: true,
    options: BOOLEAN_OPTION,
    placeholder: "",
  },
  {
    key: "won_prizes",
    label: "label.won_prizes",
    isDropdown: true,
    options: BOOLEAN_OPTION,
  },
  {
    key: "won_prizes_in_debates",
    label: "label.won_prizes_in_debates",
    isDropdown: true,
    options: BOOLEAN_OPTION,
  },
  {
    key: "participation_in_social",
    label: "label.participation_in_social",
    isDropdown: true,
    options: BOOLEAN_OPTION,
  },
  {
    key: "other",
    label: "label.any_other_specify",
  },
];

const hobbies = () => [
  {
    key: "hobbies",
    placeholder: "label.hobbies_placeholder",
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

export const useActivities = ({ state, isEditable }) => {
  const intl = useIntl();
  const [achievementsState, setAchievementsState] = useState(achievements());
  const [hobbiesState, setHobbiesState] = useState(hobbies());

  const handleAchievementsBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: achievementsState,
      key,
      index,
      intl,
    });
    setAchievementsState(updatedData);
  };

  const handleHobbiesBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: hobbiesState,
      key,
      index,
      intl,
    });
    setHobbiesState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [...achievementsState].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    achievements: addValueOnField({
      state,
      details: achievementsState,
      isEditable,
    }),
    hobbies: addValueOnField({
      state,
      details: hobbiesState,
      isEditable,
    }),
    handleAchievementsBlur,
    handleHobbiesBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
