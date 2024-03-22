import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE } from "../../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import useUpdateService from "../../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useWorkExperienceDetail } from "./useWorkExperienceDetail";
import WorkExperienceUI from "./WorkExperienceUI";
const WorkExperienceComponent = ({ isEditable, handleEdit}) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });

  const [state, setState] = useState(data !== null && Object.keys(data).length ? data : {kindOfIndustry: []});
  const {
    workExperiences,
    handleWorkExperienceDetailBlur,
    isValidAllFields,
    initailWorkExperience
  } = useWorkExperienceDetail({
    state: state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  }, [data]);

  const onChangeValue = (details) => (label, value) => {
    setState((prev) => ({
      ...prev,
      [label]: value,
    }));
  };
  console.log("state::",state)

  return (
    <WorkExperienceUI
      initailWorkExperience={initailWorkExperience}
      workExperiences={workExperiences}
      onChangeValue={onChangeValue}
      handleWorkExperienceDetailBlur={handleWorkExperienceDetailBlur}
      isValidAllFields={isValidAllFields}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
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

export default WorkExperienceComponent;
