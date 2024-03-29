import { useState } from "react";
import { useIntl } from "react-intl";
import { LANGUAGE } from "../../../constants/constants";

const languageSkill= [
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

const skillPriority= [
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

const languagesKnown = () => [
  {
    key: "languages_known",
    label: "label.languages_known",
    placeholder: "label.languages_known_placeholder",
    isDropdown: true,
    options: LANGUAGE,
  },
  {
    key: "languages_skill",
    label: "label.skills",
    isCheckBoxSelection: true,
    checkBoxOptions: languageSkill, 
    isActionToAdd: true
  },
];

const ITSkills = () => [
  {
    key: "it_skills",
    label: "label.it_skills",
    placeholder: "label.it_skills_placeholder",
    isDropdown: true,
    options: LANGUAGE,
  },
  {
    key: "itSkillPriority",
    label: "label.skills",
    isCheckBoxSelection: true,
    checkBoxOptions: skillPriority, 
    isActionToAdd: true,
    isSingleSelection: true,
  },
];

const softSkills = () => [
  {
    key: "soft_skills",
    label: "label.soft_skills",
    placeholder: "label.soft_skills_placeholder",
    isDropdown: true,
    options: LANGUAGE,
  },
  {
    key: "softSkillPriority",
    label: "label.skills",
    isCheckBoxSelection: true,
    checkBoxOptions: skillPriority, 
    isActionToAdd: true,
    isSingleSelection: true,
  },
];

const otherSkills = () => [
  [{
    key: "other_skills",
    placeholder: "label.other_skills_placeholder",
    width: 1,
    isTextInputWithChip: true
  }],
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
  const [languagesKnownState, setLanguagesKnownState] = useState([languagesKnown()]);
  const [ITSkillsState, setITSkillsState] = useState([ITSkills()]);
  const [softSkillsState, setSoftSkillsState] = useState([softSkills()]);
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

  const performHandleAddRemoveRow = (isActionToAdd, index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let itemToAdd;
    if (type === "itSkillPriority"){
         dataToPerformAction = ITSkillsState
         stateToPerformAction = setITSkillsState
         itemToAdd = ITSkills()
    }else if (type === "softSkillPriority"){
         dataToPerformAction = softSkillsState
         stateToPerformAction = setSoftSkillsState
         itemToAdd = softSkills()
    } else {
      dataToPerformAction = languagesKnownState
      stateToPerformAction = setLanguagesKnownState
      itemToAdd = languagesKnown()
    }
      const updatedState = dataToPerformAction[dataToPerformAction.length - 1].map((item) => {
        item.isActionToAdd = isActionToAdd ? false : true
        return item;
      });
      dataToPerformAction[dataToPerformAction.length - 1] = updatedState
      isActionToAdd
      ? stateToPerformAction((prevState) => [...prevState, itemToAdd])
      : stateToPerformAction((prevState) => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState; 
      });
  }
  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };
  function updateValueByKey(skill, key, value) {
    return skill.map((item) => {
      if (item.key === key) {
        return { ...item, value: value };
      }
      return item;
    });
  }
  function updateisSelectedCheckBox(skill, key, name, isSingleSelection ) {
    return skill.map((item) => {
      if (item.key === key) {
        const updatedCheckBoxOptions = item.checkBoxOptions.map((checkBoxItem) => {
          if (checkBoxItem.name === name) {
            return { ...checkBoxItem, isSelected: !checkBoxItem.isSelected };
          }
          if (isSingleSelection){
            return { ...checkBoxItem, isSelected: false};
          }
          return checkBoxItem;
        });
          return { ...item, checkBoxOptions: updatedCheckBoxOptions };
      }
        return item;
    });
  }

  const performValueUpdate = (label, value , index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let itemToAdd;
    if (type === "it_skills"){
         dataToPerformAction = ITSkillsState
         stateToPerformAction = setITSkillsState
         itemToAdd = ITSkills()
    }else if (type === "soft_skills"){
         dataToPerformAction = softSkillsState
         stateToPerformAction = setSoftSkillsState
         itemToAdd = softSkills()
    }else {
      dataToPerformAction = languagesKnownState
      stateToPerformAction = setLanguagesKnownState
      itemToAdd = languagesKnown()
    }
    const { key } = findKeyByLabel(label, itemToAdd);
    let currentState = [...dataToPerformAction];
    let currentIndexState = currentState[index] || {};
     currentIndexState = updateValueByKey(currentIndexState, key, value);
     currentState[index] = currentIndexState;
     stateToPerformAction(currentState);
  }

  const perfromHandleCheckBoxSelection = (id, index, type) => {
    let dataToPerformAction;
    let stateToPerformAction;
    let isSingleSelection;
    if (type === "itSkillPriority"){
         dataToPerformAction = ITSkillsState
         stateToPerformAction = setITSkillsState
         isSingleSelection = true;
    }else if (type === "softSkillPriority"){
         dataToPerformAction = softSkillsState
         stateToPerformAction = setSoftSkillsState
         isSingleSelection = true;
    } else {
      dataToPerformAction = languagesKnownState
      stateToPerformAction = setLanguagesKnownState
    }
    let currentState = [...dataToPerformAction];
    let currentIndexState = currentState[index] || {};
    currentIndexState = updateisSelectedCheckBox(currentIndexState,type, id, isSingleSelection);
    currentState[index] = currentIndexState;
    stateToPerformAction(currentState);
  }
  const performOtherSkillsUpdate = (chips) => {
     console.log("performOtherSkillsUpdate", chips)
     
  }
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

    // languagesKnown: addValueOnField({
    //   state,
    //   details: languagesKnownState,
    //   isEditable,
    // }),
    
    // otherSkills: addValueOnField({
    //   state,
    //   details: otherSkillsState,
    //   isEditable,
    // }),
   // handleLanguagesKnownBlur,
    //handleITSkillsBlur,
    //handleSoftSkillsBlur,
    handleOtherSkillsBlur,
  };
};
