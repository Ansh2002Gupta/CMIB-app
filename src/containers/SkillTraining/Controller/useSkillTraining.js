import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { LANGUAGES, SKILLS } from "../../../services/apiServices/apiEndPoint";
import useFetch from "../../../hooks/useFetch";
import {
  SkillTraining_keys,
  getDropDownList,
  getSkills,
  updateItemToAdd,
  updateState,
} from "./utils";
import styles from "../SkillTraining.style";

const languageSkill = [
  {
    isSelected: false,
    label: "label.speak",
    name: "speak",
    selectedIndex: null,
    value: "Speak",
  },
  {
    isSelected: false,
    label: "label.read",
    name: "read",
    selectedIndex: null,
    value: "Read",
  },
  {
    isSelected: false,
    label: "label.write",
    name: "write",
    selectedIndex: null,
    value: "Write",
  },
];

const skillLevel = [
  {
    isSelected: false,
    label: "label.high",
    name: "high",
    selectedIndex: null,
    value: "High",
  },
  {
    isSelected: false,
    label: "label.medium",
    name: "medium",
    selectedIndex: null,
    value: "Medium",
  },
  {
    isSelected: false,
    label: "label.low",
    name: "low",
    selectedIndex: null,
    value: "Low",
  },
];
const languagesKnownField = (options) => [
  {
    key: SkillTraining_keys.LANGUAGE_KNOWN,
    label: "label.languages_known",
    placeholder: "label.languages_known_placeholder",
    isDropdown: true,
    labelField: "name",
    valueField: "name",
    options: options,
  },
  {
    key: SkillTraining_keys.LANGUAGE_SKILL,
    label: "label.proficiency",
    isCheckBoxSelection: true,
    checkBoxOptions: languageSkill,
    isActionToAdd: true,
    checkBoxTextStyle: styles.checkBoxItem,
  },
];
const ITSkillField = (options) => [
  {
    key: SkillTraining_keys.IT_SKIILS,
    label: "label.it_skills",
    placeholder: "label.it_skills_placeholder",
    isDropdown: true,
    options: options,
  },
  {
    key: SkillTraining_keys.ITSKILL_LEVEL,
    label: "label.proficiency",
    isCheckBoxSelection: true,
    checkBoxOptions: skillLevel,
    isActionToAdd: true,
    isSingleSelection: true,
    checkBoxTextStyle: styles.checkBoxItem,
  },
];

const softSkillField = (options) => [
  {
    key: SkillTraining_keys.SOFT_SKILLS,
    label: "label.soft_skills",
    placeholder: "label.soft_skills_placeholder",
    isDropdown: true,
    options: options,
  },
  {
    key: SkillTraining_keys.SOFTSKILL_LEVEL,
    label: "label.proficiency",
    isCheckBoxSelection: true,
    checkBoxOptions: skillLevel,
    isActionToAdd: true,
    isSingleSelection: true,
    checkBoxTextStyle: styles.checkBoxItem,
  },
];

const otherSkillField = (value) => [
  [
    {
      key: "other_skills",
      placeholder: "label.other_skills_placeholder",
      width: 1,
      isTextInputWithChip: true,
      value: value,
    },
  ],
];

export const useSkillTraining = ({ state, isEditable }) => {
  const intl = useIntl();
  const [languagesKnownState, setLanguagesKnownState] = useState([
    languagesKnownField(),
  ]);
  const [ITSkillsState, setITSkillsState] = useState([ITSkillField()]);
  const [softSkillsState, setSoftSkillsState] = useState([softSkillField()]);
  const [otherSkillsState, setOtherSkillsState] = useState(otherSkillField());

  const { data: languagesData } = useFetch({ url: LANGUAGES });
  const { data: skillsData } = useFetch({ url: SKILLS });

  useEffect(() => {
    if (
      languagesData !== null &&
      languagesData.length > 0 &&
      skillsData !== null
    ) {
      const { languages_known, it_skills, soft_skills, other_skills } = state;
      setLanguagesKnownState(
        updateState(
          languages_known,
          getDropDownList(
            [languagesKnownField()],
            SkillTraining_keys.LANGUAGE_KNOWN,
            languagesData
          )[0],
          SkillTraining_keys.LANGUAGE_KNOWN,
          SkillTraining_keys.LANGUAGE_SKILL,
          languageSkill
        )
      );
      setITSkillsState(
        updateState(
          it_skills,
          getDropDownList(
            [ITSkillField()],
            SkillTraining_keys.IT_SKIILS,
            getSkills(skillsData)[0]
          )[0],
          SkillTraining_keys.IT_SKIILS,
          SkillTraining_keys.ITSKILL_LEVEL,
          skillLevel
        )
      );
      setSoftSkillsState(
        updateState(
          soft_skills,
          getDropDownList(
            [softSkillField()],
            SkillTraining_keys.SOFT_SKILLS,
            getSkills(skillsData)[1]
          )[0],
          SkillTraining_keys.SOFT_SKILLS,
          SkillTraining_keys.SOFTSKILL_LEVEL,
          skillLevel
        )
      );
      setOtherSkillsState(otherSkillField(other_skills));
    }
  }, [state, languagesData, skillsData, isEditable]);

  const checkMandatoryFields = () => {
    let error = false;
    [...languagesKnownState, ...ITSkillsState, ...softSkillsState].forEach(
      (item) => {
        item.forEach((field) => {
          if (!field.value || field.value === "--") {
            error = true;
          }
        });
      }
    );
    return error;
  };

  const isValidToAddNewRow = (lastRowData) => {
    let isValid = true;
    [...lastRowData].forEach((item) => {
      if (!item.value || item.value === "--") {
        isValid = false;
      }
    });
    return isValid;
  };

  const performHandleAddRemoveRow = (isActionToAdd, index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let itemToAdd;
    if (type === SkillTraining_keys.ITSKILL_LEVEL) {
      dataToPerformAction = ITSkillsState;
      stateToPerformAction = setITSkillsState;
      itemToAdd = ITSkillField(getSkills(skillsData)[0]);
    } else if (type === SkillTraining_keys.SOFTSKILL_LEVEL) {
      dataToPerformAction = softSkillsState;
      stateToPerformAction = setSoftSkillsState;
      itemToAdd = softSkillField(getSkills(skillsData)[1]);
    } else {
      dataToPerformAction = languagesKnownState;
      stateToPerformAction = setLanguagesKnownState;
      itemToAdd = languagesKnownField(languagesData);
    }

    if (isActionToAdd) {
      if (
        isValidToAddNewRow(dataToPerformAction[dataToPerformAction.length - 1])
      ) {
        const updatedState = dataToPerformAction[
          dataToPerformAction.length - 1
        ].map((item) => {
          return {
            ...item,
            isActionToAdd: false,
            error: !item?.value
              ? intl.formatMessage({ id: "label.nonEmptyField" })
              : "",
          };
        });

        dataToPerformAction[dataToPerformAction.length - 1] = updatedState;
        stateToPerformAction((prevState) => [
          ...prevState,
          updateItemToAdd(itemToAdd),
        ]);
      } else {
        const updatedState = dataToPerformAction[
          dataToPerformAction.length - 1
        ].map((item) => {
          return {
            ...item,
            error: !item?.value
              ? intl.formatMessage({ id: "label.nonEmptyField" })
              : "",
          };
        });
        dataToPerformAction[dataToPerformAction.length - 1] = updatedState;

        stateToPerformAction([...dataToPerformAction]);
      }
    } else {
      stateToPerformAction((prevState) => {
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    }
  };
  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };
  function updateValueByKey(skill, key, value) {
    return skill.map((item) => {
      if (item.key === key) {
        return { ...item, value: value, error: "" };
      }
      return item;
    });
  }
  function updateisSelectedCheckBox(skill, key, name, isSingleSelection) {
    return skill.map((item) => {
      if (item.key === key) {
        const updatedCheckBoxOptions = item.checkBoxOptions.map(
          (checkBoxItem) => {
            if (checkBoxItem.value === name) {
              return { ...checkBoxItem, isSelected: !checkBoxItem.isSelected };
            }
            if (isSingleSelection) {
              return { ...checkBoxItem, isSelected: false };
            }
            return checkBoxItem;
          }
        );
        return {
          ...item,
          value: name,
          error: "",
          checkBoxOptions: updatedCheckBoxOptions,
        };
      }
      return item;
    });
  }

  const performValueUpdate = (label, value, index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let itemToAdd;
    if (type === SkillTraining_keys.IT_SKIILS) {
      dataToPerformAction = ITSkillsState;
      stateToPerformAction = setITSkillsState;
      itemToAdd = ITSkillField();
    } else if (type === SkillTraining_keys.SOFT_SKILLS) {
      dataToPerformAction = softSkillsState;
      stateToPerformAction = setSoftSkillsState;
      itemToAdd = softSkillField();
    } else {
      dataToPerformAction = languagesKnownState;
      stateToPerformAction = setLanguagesKnownState;
      itemToAdd = languagesKnownField();
    }
    const { key } = findKeyByLabel(label, itemToAdd);
    let currentState = [...dataToPerformAction];
    let currentIndexState = currentState[index] || {};
    currentIndexState = updateValueByKey(currentIndexState, key, value);
    currentState[index] = currentIndexState;
    stateToPerformAction(currentState);
  };

  const perfromHandleCheckBoxSelection = (id, index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let isSingleSelection;
    if (type === SkillTraining_keys.ITSKILL_LEVEL) {
      dataToPerformAction = ITSkillsState;
      stateToPerformAction = setITSkillsState;
      isSingleSelection = true;
    } else if (type === SkillTraining_keys.SOFTSKILL_LEVEL) {
      dataToPerformAction = softSkillsState;
      stateToPerformAction = setSoftSkillsState;
      isSingleSelection = true;
    } else {
      dataToPerformAction = languagesKnownState;
      stateToPerformAction = setLanguagesKnownState;
    }
    let currentState = [...dataToPerformAction];
    let currentIndexState = currentState[index] || {};
    currentIndexState = updateisSelectedCheckBox(
      currentIndexState,
      type,
      id,
      isSingleSelection
    );
    currentState[index] = currentIndexState;
    stateToPerformAction(currentState);
  };
  const performOtherSkillsUpdate = (chips) => {
    setOtherSkillsState(otherSkillField(chips));
  };

  return {
    isValidAllFields: checkMandatoryFields(),
    languagesKnown: languagesKnownState,
    ITSkills: ITSkillsState,
    softSkills: softSkillsState,
    otherSkills: otherSkillsState,
    handleValueUpdate: performValueUpdate,
    handleAddRemoveRow: performHandleAddRemoveRow,
    handleCheckBoxSelection: perfromHandleCheckBoxSelection,
    handleOtherSkillsUpdate: performOtherSkillsUpdate,
  };
};
