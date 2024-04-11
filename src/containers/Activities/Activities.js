import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ActivitiesUI from "./ActivitesUI";
import useFetch from "../../hooks/useFetch";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import {
  ACTIVITIES,
  MEMBERS,
  MEMBER_CA_JOB_PROFILE_ACTIVITY,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import { useActivities } from "./Controllers/useActivities";
import { getIndexForBoolean, yesNoToBoolean } from "../../utils/util";

const Activities = ({ isEditable = true, handleEdit }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantActivityData,
    isLoading: isGettingApplicantActivityDataLoading,
    error: errorWhileGettingApplicantActivityData,
    fetchData: fetchingApplicantActivityData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY + `/${currentModule}` + MEMBERS + `/${id}` + ACTIVITIES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: memberActivityData,
    fetchData,
    isLoading: ismemberActivityDataLoading,
    error: errorWhilememberActivityData,
  } = useFetch({
    url: MEMBER_CA_JOB_PROFILE_ACTIVITY,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (currentModule) {
      if (isCompany) {
        fetchingApplicantActivityData({});
      } else {
        fetchData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantActivityData : memberActivityData;
  const isPageLoading = isCompany
    ? isGettingApplicantActivityDataLoading
    : ismemberActivityDataLoading;
  const fetchDataError = isCompany
    ? errorWhileGettingApplicantActivityData
    : errorWhilememberActivityData;

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
      fetchDataError={fetchDataError}
      isPageLoading={isPageLoading}
      onClickCancel={() => {
        setState({ ...data });
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default Activities;
