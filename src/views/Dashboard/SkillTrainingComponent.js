import React from "react";
import SkillTrainingUI from "./SkillTrainingUI";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE_OTHER_COURSES } from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useSkillTraining } from "./controller/useSkillTraining";

const SkillTrainingComponent = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_OTHER_COURSES}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_OTHER_COURSES}`,
  });
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );

  const {
    isValidAllFields,
    languagesKnown,
    ITSkills,
    softSkills,
    otherSkills,
    handleLanguagesKnownBlur,
    handleITSkillsBlur,
    handleSoftSkillsBlur,
    handleOtherSkillsBlur,
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
    const { key } = findKeyByLabel(label, details);

    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <SkillTrainingUI
      languagesKnown={languagesKnown}
      ITSkills={ITSkills}
      softSkills={softSkills}
      otherSkills={otherSkills}
      handleLanguagesKnownBlur={handleLanguagesKnownBlur}
      handleITSkillsBlur={handleITSkillsBlur}
      handleSoftSkillsBlur={handleSoftSkillsBlur}
      handleOtherSkillsBlur={handleOtherSkillsBlur}
      isEditable={isEditable}
      onChangeValue={onChangeValue}
      isLoading={isLoading}
      isError={isError}
      isValidAllFields={isValidAllFields}
      onClickSave={() => {
        handleUpdate(state, () => {
          // turn off the edit mode
          handleEdit(false);
        });
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default SkillTrainingComponent;
