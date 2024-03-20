import React from "react";
import ActivitiesUI from "./ActivitesUI";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE_OTHER_COURSES } from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useActivities } from "./controller/useActivities";

const ActivitiesComponent = ({ isEditable = true, handleEdit }) => {
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
    achievements,
    hobbies,
    handleAchievementsBlur,
    handleHobbiesBlur,
  } = useActivities({
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
    <ActivitiesUI
      achievements={achievements}
      hobbies={hobbies}
      handleAchievementsBlur={handleAchievementsBlur}
      handleHobbiesBlur={handleHobbiesBlur}
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

export default ActivitiesComponent;
