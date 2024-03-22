import { useState } from "react";
import { useIntl } from "react-intl";

const languagesKnown = () => [
  {
    key: "languages_known",
    label: "label.languages_known",
    placeholder: "label.languages_known_placeholder",
  },
];

const ITSkills = () => [
  {
    key: "it_skills",
    label: "label.it_skills",
    placeholder: "label.it_skills_placeholder",
  },
];

const softSkills = () => [
  {
    key: "soft_skills",
    label: "label.soft_skills",
    placeholder: "label.soft_skills_placeholder",
  },
];

const otherSkills = () => [
  {
    key: "other_skills",
    label: "label.other_skills",
    placeholder: "label.other_skills_placeholder",
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

export const useSkillTraining = ({ state, isEditable }) => {
  const intl = useIntl();
  const [languagesKnownState, setLanguagesKnownState] = useState(
    languagesKnown()
  );
  const [ITSkillsState, setITSkillsState] = useState(ITSkills());
  const [softSkillsState, setSoftSkillsState] = useState(softSkills());
  const [otherSkillsState, setOtherSkillsState] = useState(otherSkills());

  const handleLanguagesKnownBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: languagesKnownState,
      key,
      index,
      intl,
    });
    setLanguagesKnownState(updatedData);
  };

  const handleITSkillsBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: ITSkillsState,
      key,
      index,
      intl,
    });
    setITSkillsState(updatedData);
  };

  const handleSoftSkillsBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: softSkillsState,
      key,
      index,
      intl,
    });
    setSoftSkillsState(updatedData);
  };

  const handleOtherSkillsBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: otherSkillsState,
      key,
      index,
      intl,
    });
    setOtherSkillsState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...languagesKnownState,
      ...ITSkillsState,
      ...softSkillsState,
      ...otherSkillsState,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    isValidAllFields: checkMandatoryFields(),
    languagesKnown: addValueOnField({
      state,
      details: languagesKnownState,
      isEditable,
    }),
    ITSkills: addValueOnField({ state, details: ITSkillsState, isEditable }),
    softSkills: addValueOnField({
      state,
      details: softSkillsState,
      isEditable,
    }),
    otherSkills: addValueOnField({
      state,
      details: otherSkillsState,
      isEditable,
    }),
    handleLanguagesKnownBlur,
    handleITSkillsBlur,
    handleSoftSkillsBlur,
    handleOtherSkillsBlur,
  };
};
