import React, { useEffect, useState } from "react";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

import ExamsUI from "./ExamsUI";
import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import { MEMBER_CA_JOB_PROFILE_EDUCATION } from "../../services/apiServices/apiEndPoint";
import { useExams } from "./Controllers/useExams";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const ExamsComponent = ({ isEditable = true, handleEdit }) => {
  const {
    data,
    isLoading: isGettingEducationData,
    error: errorWhileGettingEducationData,
  } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });

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
          foundation_has_education: data["CA Foundation"]?.has_education,
          foundation_month: data["CA Foundation"]?.passing_month,
          foundation_year: data["CA Foundation"]?.passing_year,
          foundation_mark_in_percent: data["CA Foundation"]?.passing_percentage,
          foundation_rank_medal: data["CA Foundation"]?.passing_rank,
          foundation_attempt_count: data["CA Foundation"]?.attempt_count,

          intern_has_education: data["CA Intermediate"]?.has_education,
          intern_month: data["CA Intermediate"]?.passing_month,
          intern_year: data["CA Intermediate"]?.passing_year,
          intern_mark_in_percent: data["CA Intermediate"]?.passing_percentage,
          intern_rank_medal: data["CA Intermediate"]?.passing_rank,

          final_has_education: data["CA Final"]?.has_education,
          final_month: data["CA Final"]?.passing_month,
          final_year: data["CA Final"]?.passing_year,
          final_mark_in_percent: data["CA Final"]?.passing_percentage,
          final_rank_medal: data["CA Final"]?.passing_rank,
        }
      : {};

  const [state, setState] = useState(getData(data));

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
      "CA Foundation": {
        has_education: state?.foundation_has_education,
        passing_month: state?.foundation_month,
        passing_percentage: state?.foundation_mark_in_percent,
        passing_rank: state?.foundation_rank_medal,
        passing_year: state?.foundation_year,
        attempt_count: state?.foundation_attempt_count,
      },
      "CA Intermediate": {
        has_education: state?.intern_has_education,
        passing_month: state?.intern_month,
        passing_percentage: state?.intern_mark_in_percent,
        passing_rank: state?.intern_rank_medal,
        passing_year: state?.intern_year,
      },
      "CA Final": {
        has_education: state?.final_has_education,
        passing_month: state?.final_month,
        passing_percentage: state?.final_mark_in_percent,
        passing_rank: state?.final_rank_medal,
        passing_year: state?.final_year,
      },
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
      <ExamsUI
        ca_final={ca_final}
        ca_foundation={ca_foundation}
        ca_inter={ca_inter}
        isEditable={isEditable}
        isLoading={isUpdatingEducationData}
        onChangeValue={onChangeValue}
        handleFinalDetailBlur={handleFinalDetailBlur}
        handleFoundationDetailBlur={handleFoundationDetailBlur}
        handleInternDetailBlur={handleInternDetailBlur}
        isValidAllFields={isValidAllFields}
        onClickSave={handleSave}
        onClickCancel={() => {
          setState(getData(data));
          handleEdit(false);
        }}
      />
    </>
  );
};

export default ExamsComponent;
