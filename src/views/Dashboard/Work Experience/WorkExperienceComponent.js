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

  const [state, setState] = useState(data !== null && Object.keys(data).length ? data : {});
 // const [workExperiences, setWorkExperiences] = useState([{}]);

  const {
    workExperience_detail,
    handleWorkExperienceDetailBlur,
    isValidAllFields,
  } = useWorkExperienceDetail({
    state: state,
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
   // console.log("onChangeValue---",details,label,value,codeValue)
    const { key } = findKeyByLabel(label, details);
    //console.log("value", value, "key", key, "label", label , "details", details)
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("state::",state, workExperience_detail)

  return (
    <WorkExperienceUI
      workExperience_detail={workExperience_detail}
      onChangeValue={onChangeValue}
      handleWorkExperienceDetailBlur={handleWorkExperienceDetailBlur}
      isValidAllFields={isValidAllFields}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
      //workExperiences={state.workExperiences ? state.workExperiences : [{}]}
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
      // onClickAdd={() => {
      //   //on add more experience
      //   setState({workExperiences: [state.workExperiences, {}]});

      //   //setState({})
      // }}
    />
  );
};

export default WorkExperienceComponent;
