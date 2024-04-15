import React, { useEffect, useState } from "react";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import OtherCoursesUI from "./OtherCoursesUI";
import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import { MEMBER_CA_JOB_PROFILE_EDUCATION } from "../../services/apiServices/apiEndPoint";
import { useOtherCourses } from "./Controllers/useOtherCourses";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const OtherCoursesComponent = ({
  isEditable = true,
  handleEdit,
  customUrl,
}) => {
  const {
    data,
    isLoading: isGettingEducationData,
    error: errorWhileGettingEducationData,
  } = useFetch({
    url: customUrl ?? `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });
  const {
    makeRequest: handleUpdate,
    isLoading: isUpdatingEducationData,
    error,
    setError,
  } = usePut({
    url: customUrl ?? `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
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

  return isGettingEducationData ? (
    <LoadingScreen />
  ) : errorWhileGettingEducationData ? (
    <ErrorComponent
      errorMsg={
        errorWhileGettingEducationData?.data?.message ||
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
