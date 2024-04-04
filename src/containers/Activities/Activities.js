import React from "react";
import ActivitiesUI from "./ActivitesUI";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import {
  MEMBER_CA_JOB_PROFILE_ACTIVITY,
  MEMBER_CA_JOB_PROFILE_OTHER_COURSES,
} from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useActivities } from "./Controllers/useActivities";
import { getIndexForBoolean, yesNoToBoolean } from "../../utils/util";

const Activities = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data, fetchData } = useFetch({
    url: MEMBER_CA_JOB_PROFILE_ACTIVITY,
  });

  const { handleUpdate, isError, isLoading, error, setError } =
    useUpdateService(MEMBER_CA_JOB_PROFILE_ACTIVITY);
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? { ...data } : {}
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
      setState({ ...data });
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
      [key]: yesNoToBoolean(value),
    }));
  };

  const handleActivityUpdate = () => {
    let body = {
      study_certificates: getIndexForBoolean(state?.study_certificates),
      sport_prizes: getIndexForBoolean(state?.sport_prizes),
      debate_prizes: getIndexForBoolean(state?.debate_prizes),
      social_programe_participation: getIndexForBoolean(
        state?.social_programe_participation
      ),
      anyother_achievements: state?.anyother_achievements ?? "",
      hobbies: state?.hobbies,
    };

    handleUpdate(body, () => {
      fetchData();
      // turn off the edit mode
      handleEdit(false);
    });
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
      error={error}
      setError={setError}
      isValidAllFields={isValidAllFields}
      onClickSave={handleActivityUpdate}
      onClickCancel={() => {
        setState({ ...data });
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default Activities;
