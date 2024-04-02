import React from "react";
import SkillTrainingUI from "./SkillTrainingUI";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useSkillTraining } from "././Controller/useSkillTraining";
import { MEMBER_CA_JOB_PROFILE_SKILLS } from "../../services/apiServices/apiEndPoint";
import { SkillTraining_keys } from "./Controller/utils";

const SkillTraining = ({ isEditable = true, handleEdit }) => {
  const { data } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE_SKILLS}`,
  });

  const { handleUpdate, isError, isLoading, error, setError } = useUpdateService(
       MEMBER_CA_JOB_PROFILE_SKILLS
  );

  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );
  const {
    isValidAllFields,
    languagesKnown,
    handleValueUpdate,
    ITSkills,
    softSkills,
    otherSkills,
    handleLanguagesKnownBlur,
    handleITSkillsBlur,
    handleSoftSkillsBlur,
    handleOtherSkillsBlur,
    handleAddRemoveRow,
    handleCheckBoxSelection,
    handleOtherSkillsUpdate,
  } = useSkillTraining({
    state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  }, [data]);

  const performSaveChanges = () => {
      const payload = getSkillTrainingPayload()
      handleUpdate(payload, () => {
          handleEdit(false);
          handleUpdate();
      });
  }

  const getSkillTrainingPayload = () => {
    const payload = {
      languages_known: setPayloadByField(SkillTraining_keys.LANGUAGE_KNOWN, SkillTraining_keys.LANGUAGE_SKILL, languagesKnown),
      it_skills: setPayloadByField(SkillTraining_keys.IT_SKIILS, SkillTraining_keys.ITSKILL_LEVEL, ITSkills),
      soft_skills: setPayloadByField(SkillTraining_keys.SOFT_SKILLS, SkillTraining_keys.SOFTSKILL_LEVEL, softSkills),
      other_skills: getOtherSkillsPayload(),
    }
    return payload;
  }

  const getOtherSkillsPayload = () => {
    let otherSkills_ = [];
    otherSkills[0].map((item) => {
      otherSkills_ = item.value;
    })
    return otherSkills_;
  }

  const setPayloadByField = (skillKey, levelKey, data) => {   
    let payload = [];
    data.map((item) => {
      let skill_name;
      let level;
      item.map((field) => {
        if (field.key === skillKey){
            skill_name = field?.value
         }
         else if (field.key === levelKey){
          level = getSelectedLevel(field.checkBoxOptions)
         }
      }) 
      skill_name && level && payload.push( {skill_name: skill_name, level: level }) 
    })
    return payload;
  }
  const getSelectedLevel = (checkBoxes) => {
    const selectedLevel = checkBoxes
      .filter(checkBox => checkBox.isSelected)
      .map(checkBox => checkBox.name);
    return selectedLevel;
  }

  return (
    <SkillTrainingUI
      languagesKnown={languagesKnown}
      handleValueUpdate={handleValueUpdate}
      handleCheckBoxSelection={handleCheckBoxSelection}
      ITSkills={ITSkills}
      softSkills={softSkills}
      otherSkills={otherSkills}
      handleLanguagesKnownBlur={handleLanguagesKnownBlur}
      handleITSkillsBlur={handleITSkillsBlur}
      handleSoftSkillsBlur={handleSoftSkillsBlur}
      handleOtherSkillsBlur={handleOtherSkillsBlur}
      handleAddRemoveRow={handleAddRemoveRow}
      handleOtherSkillsUpdate={handleOtherSkillsUpdate}
      isEditable={isEditable}
      isLoading={isLoading}
      isError={isError}
      error={error}
      setError={setError}
      isValidAllFields={isValidAllFields}
      onClickSave={() => {
         performSaveChanges()
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default SkillTraining;
