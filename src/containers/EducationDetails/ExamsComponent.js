import { useContext, useEffect, useState } from "react";
import ExamsUI from "./ExamsUI";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE_EXAMS } from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useExams } from "./useExams";

const ExamsComponent = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_EXAMS}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_EXAMS}`,
  });
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );

  const {
    isValidAllFields,
    ca_final,
    ca_foundation,
    ca_inter,
    handleFinalDetailBlur,
    handleFoundationDetailBlur,
    handleInternDetailBlur,
  } = useExams({
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
    <ExamsUI
      ca_final={ca_final}
      ca_foundation={ca_foundation}
      ca_inter={ca_inter}
      isEditable={isEditable}
      isLoading={isLoading}
      isError={isError}
      onChangeValue={onChangeValue}
      handleFinalDetailBlur={handleFinalDetailBlur}
      handleFoundationDetailBlur={handleFoundationDetailBlur}
      handleInternDetailBlur={handleInternDetailBlur}
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

export default ExamsComponent;
