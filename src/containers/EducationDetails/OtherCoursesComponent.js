import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import OtherCoursesUI from "./OtherCoursesUI";
import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import {
  ACADEMICS,
  MEMBERS,
  MEMBER_CA_JOB_PROFILE_EDUCATION,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { useOtherCourses } from "./Controllers/useOtherCourses";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const OtherCoursesComponent = ({ isEditable = true, handleEdit }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantAcadimicsData,
    isLoading: isGettingapplicantAcadimicsDataLoading,
    error: errorWhileGettingapplicantAcadimicsData,
    fetchData: fetchingApplicantAcadimicsData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY + `/${currentModule}` + MEMBERS + `/${id}` + ACADEMICS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: educationData,
    isLoading: isGettingEducationData,
    error: errorWhileGettingEducationData,
    fetchData: fetchingEducationData,
  } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (currentModule) {
      if (isCompany) {
        fetchingApplicantAcadimicsData({});
      } else {
        fetchingEducationData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantAcadimicsData : educationData;
  const isLoading = isCompany
    ? isGettingapplicantAcadimicsDataLoading
    : isGettingEducationData;
  const errorWhileFetching = isCompany
    ? errorWhileGettingapplicantAcadimicsData
    : errorWhileGettingEducationData;

  const {
    makeRequest: handleUpdate,
    isLoading: isUpdatingEducationData,
    error,
    setError,
  } = usePut({
    url: `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });

  const getData = (data) =>
    data && Object.keys(data).length
      ? {
          has_education: data["Others"][0]?.has_education,
          examination_name: data["Others"][0]?.exam_name,
          board: data["Others"][0]?.exam_board,
          year: data["Others"][0]?.passing_year,
          cgpa: data["Others"][0]?.passing_cgpa,
          mark_in_percent: data["Others"][0]?.passing_percentage,
        }
      : {};

  const [state, setState] = useState(getData(data));

  const { isValidAllFields, handleOtherCoursesBlur, other_courses } =
    useOtherCourses({
      state,
      isEditable,
    });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(getData(data));
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

  const handleDismissToast = () => {
    setError("");
  };

  const handleSave = () => {
    let payload = {
      Others: [
        {
          has_education: state?.has_education,
          exam_name: state?.examination_name,
          passing_percentage: state?.mark_in_percent,
          passing_year: state?.year,
          exam_board: state?.board,
          passing_cgpa: state?.cgpa,
        },
      ],
    };
    handleUpdate({
      body: payload,
      onSuccessCallback: () => {
        handleEdit(false);
      },
    });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : errorWhileFetching ? (
    <ErrorComponent
      errorMsg={
        errorWhileFetching?.data?.message ||
        GENERIC_GET_API_FAILED_ERROR_MESSAGE
      }
    />
  ) : (
    <>
      {error && (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      )}
      <OtherCoursesUI
        other_courses={other_courses}
        isEditable={isEditable}
        onChangeValue={onChangeValue}
        handleOtherCoursesBlur={handleOtherCoursesBlur}
        isLoading={isUpdatingEducationData}
        isValidAllFields={isValidAllFields}
        onClickSave={handleSave}
        onClickCancel={() => {
          handleEdit(false);
        }}
      />
    </>
  );
};

export default OtherCoursesComponent;
