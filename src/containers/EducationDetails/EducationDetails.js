import React, { useContext, useEffect, useState } from "react";
import EducationDetailsUI from "./EducationDetailsUI";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE_EDUCATION } from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useEducationDetails } from "./Controllers/useEducationDetails";

const EducationDetails = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );

  const {
    isValidAllFields,
    education_detail,
    higher_secondary_detail,
    graduation_detail,
    post_graduation_detail,
    handleEducationDetailBlur,
    handleHigherSecondaryDetailBlur,
    handleGraduationDetailBlur,
    handlePostGraduationDetailBlur,
  } = useEducationDetails({
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
    <EducationDetailsUI
      education_detail={education_detail}
      higher_secondary_detail={higher_secondary_detail}
      graduation_detail={graduation_detail}
      post_graduation_detail={post_graduation_detail}
      onChangeValue={onChangeValue}
      handleEducationDetailBlur={handleEducationDetailBlur}
      handleHigherSecondaryDetailBlur={handleHigherSecondaryDetailBlur}
      handleGraduationDetailBlur={handleGraduationDetailBlur}
      handlePostGraduationDetailBlur={handlePostGraduationDetailBlur}
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

export default EducationDetails;
