import { addKeyValuePair, containsDuplicate } from "../../../utils/util";

export const SkillTraining_keys = {
  LANGUAGE_KNOWN: "languages_known",
  LANGUAGE_SKILL: "languages_skill",
  IT_SKIILS: "it_skills",
  ITSKILL_LEVEL: "itSkill_level",
  SOFT_SKILLS: "soft_skills",
  SOFTSKILL_LEVEL: "softSkill_level",
};

export const updateState = (
  state,
  formFields,
  skillKey,
  levelKey,
  skillLevelOptions
) => {
  let updatedState = [];

  if (state?.length > 0) {
    updatedState = state.map((item, index) => {
      const isLastItem = index === state.length - 1;
      let fields = formFields;

      let updatedFields = fields.map((field) => {
        const isSingleSelection = field.isSingleSelection;
        if (field.key === skillKey) {
          return {
            ...field,
            value: item.skill_name,
            showLabel: index === 0 ? true : false,
          };
        }
        if (field.key === levelKey) {
          return {
            ...field,
            value: isSingleSelection
              ? updateSingleSkillLevelValue(item.level)
              : item.level,
            showLabel: index === 0 ? true : false,
            isActionToAdd: isLastItem ? true : false,
            checkBoxOptions: updateSkillLevel(skillLevelOptions, item.level),
          };
        }
        return field;
      });
      return updatedFields;
    });
  } else {
    //no data
    updatedState = [
      formFields.map((field) => ({
        ...field,
        value: "--",
      })),
    ];
  }

  return updatedState;
};

const updateSingleSkillLevelValue = (valueArr) => {
  if (valueArr?.length > 0) {
    return capitalizeFirstLetter(valueArr[0]);
  }
};

function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateSkillLevel = (skillLevelOptions, value) => {
  const updatedSkillLevelOptions = skillLevelOptions.map((level) => {
    const isSelected = value.some((v) => level.value === v || level.name === v);
    return { ...level, isSelected };
  });
  return updatedSkillLevelOptions;
};

export const getDropDownList = (state, skillKey, data) => {
  let updatedState = [];

  if (state?.length > 0) {
    updatedState = state?.map((item) => {
      let updatedFields = item.map((field) => {
        if (field.key === skillKey) {
          return { ...field, options: data };
        }
        return field;
      });
      return updatedFields;
    });
  }
  return updatedState;
};

export const getSkills = (skillsData) => {
  if (skillsData !== null) {
    const { it_skill, soft_skill } = skillsData[0];
    let itSkiils = addKeyValuePair(it_skill) || [];
    let softSkiils = addKeyValuePair(soft_skill) || [];
    return [itSkiils, softSkiils];
  }
};

export const updateItemToAdd = (field) => {
  return field.map((item) => {
    return { ...item, showLabel: false };
  });
};

export const isDuplicateExist = (payload) => {
  let checkKeysForDuplicateData = [
    "languages_known",
    "it_skills",
    "soft_skills",
  ];
  let isExist = false;
  checkKeysForDuplicateData.forEach((key) => {
    let arr = payload[key].map((value) => value.skill_name);
    if (containsDuplicate(arr)) {
      isExist = true;
    }
  });
  return isExist;
};
