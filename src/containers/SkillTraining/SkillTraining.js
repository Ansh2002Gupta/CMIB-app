import React from "react";
import SkillTrainingUI from "./SkillTrainingUI";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useSkillTraining } from "././Controller/useSkillTraining";
import { MEMBER_CA_JOB_PROFILE_SKILLS } from "../../services/apiServices/apiEndPoint";

const SkillTraining = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE_SKILLS}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService(
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

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value) => {
    // const { key } = findKeyByLabel(label, details);

    // setState((prev) => ({
    //   ...prev,
    //   [key]: value,
    // }));
  };

  const performSaveChanges = () => {
      const payload = getSkillTrainingPayload()
      console.log("payload", payload)
      handleUpdate(payload, () => {
          handleEdit(false);
          console.log("***api success")
      });
  }

  const getSkillTrainingPayload = () => {
    const payload = {
      languages_known: setPayloadByField("languages_known", "languages_skill", languagesKnown),
      it_skills: setPayloadByField("it_skills", "itSkillPriority", ITSkills),
      soft_skills: setPayloadByField("soft_skills", "softSkillPriority", softSkills),
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
          level = field.checkBoxOptions[0]?.name
          //todo - need to add array of level in payload - need to update from backend first
         }
      }) 
      skill_name && level && payload.push( {skill_name: skill_name, level: level }) 
    })
    return payload;
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
      onChangeValue={onChangeValue}
      isLoading={isLoading}
      isError={isError}
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
