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
  const [currentStatus, setCurrentStatus] = useState(data !== null && Object.keys(data).length ? data : {});
  const {
    workExperiences,
    current_status,
    handleWorkExperienceDetailBlur,
    handleCurrentStatusDetailBlur,
    isValidAllFields,
    initailWorkExperience
  } = useWorkExperienceDetail({
    state: state,
    currentStatus: currentStatus,
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
  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };
  const onChangeValue_currentStatus = (details) => (label, value, codeValue) => {
    const { key } = findKeyByLabel(label, details);
    if (codeValue) {
      setCurrentStatus((prev) => ({
        ...prev,
        codeValue: value,
      }));
    } else {
      setCurrentStatus((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };
  console.log("state::",state)
  console.log("setCurrentStatus",setCurrentStatus)

  return (
    <WorkExperienceUI
      initailWorkExperience={initailWorkExperience}
      workExperiences={workExperiences}
      current_status={current_status}
      onChangeValue={onChangeValue}
      onChangeValue_currentStatus={onChangeValue_currentStatus}
      handleWorkExperienceDetailBlur={handleWorkExperienceDetailBlur}
      handleCurrentStatusDetailBlur={handleCurrentStatusDetailBlur}
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
