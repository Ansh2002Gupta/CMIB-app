import { addKeyValuePair } from "../../../utils/util";

export const SkillTraining_keys = {
    LANGUAGE_KNOWN: 'languages_known',
    LANGUAGE_SKILL: 'languages_skill',
    IT_SKIILS: 'it_skills',
    ITSKILL_LEVEL: 'itSkill_level',
    SOFT_SKILLS: 'soft_skills',
    SOFTSKILL_LEVEL: 'softSkill_level',
};

export const updateState = (state, formFields, skillKey, levelKey, skillLevelOptions) => {
    let updatedState = [];
  
    if (state?.length > 0) {
        updatedState = state.map((item, index) => {
        const isLastItem = index === state.length - 1;    
        let fields = formFields;
  
        let updatedFields = fields.map((field) => {
          
          if (field.key === skillKey) {
            return { ...field, value: item.skill_name };
          }
          if (field.key === levelKey) {
            return { ...field, value: item.level, isActionToAdd: isLastItem ? true : false, checkBoxOptions: updateSkillLevel(skillLevelOptions, item.level) };
          }
          return field;
        });
        return updatedFields;
      });
    } else {
        //no data
        updatedState = [formFields.map(field => ({
            ...field, 
            value: "--" 
          }))]
    }

    return updatedState;
  };

  const updateSkillLevel = (skillLevelOptions, value) => {
    const updatedSkillLevelOptions = skillLevelOptions.map((level) => {
      
      if (level.value === value) {
        return { ...level, isSelected: true };
      }
      return { ...level, isSelected: level.isSelected || false };
    });
    return updatedSkillLevelOptions;
  };

  export const getDropDownList = (state, skillKey, data) => {
    let updatedState= [];

    if (state?.length > 0) {
        updatedState = state?.map((item) => {    
          let updatedFields = item.map((field) => {
            if (field.key === skillKey) {
              return { ...field, options: data};
            }
            return field;
          });
          return updatedFields;
        });
      }
      return updatedState;
  };

  export const getSkills = (skillsData) => {
    if (skillsData !== null){
      const {it_skill, soft_skill} = skillsData[0]
      let itSkiils = addKeyValuePair(it_skill) || []
      let softSkiils = addKeyValuePair(soft_skill) || []
      return[itSkiils, softSkiils]
    }
  }  

