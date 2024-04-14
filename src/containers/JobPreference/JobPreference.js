import React, { useContext, useEffect, useMemo, useState } from "react";

import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import JobPreferenceTemplate from "./JobPreferenceTemplate";
import useFetch from "../../hooks/useFetch";
import {
  COMPANY_FUNCTIONAL_AREAS,
  CORE_INDUSTRY_TYPE,
  MEMBER_CA_JOB_JOB_PREFERENCES,
} from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { useJobPreference } from "./controller/useJobPreference";
import { formatJobPreferenceData } from "./controller/utils";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

const JobPreference = ({ isEditable, handleEdit, onSaveSuccessfull }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};

  const {
    data: functionalAreas,
    isLoading: functionalAreasIsLoading,
    error: functionalAreasError,
  } = useFetch({
    url: COMPANY_FUNCTIONAL_AREAS,
  });

  const {
    data: industryTypes,
    isLoading: industryTypesIsLoading,
    error: industryTypesError,
  } = useFetch({
    url: CORE_INDUSTRY_TYPE,
  });

  const {
    data,
    isError: isErrorJobPreferences,
    isLoading: isLoadingJobPreferences,
    fetchData,
  } = useFetch({
    url: MEMBER_CA_JOB_JOB_PREFERENCES,
  });

  const { handleUpdate, isError, isLoading, error, setError } =
    useUpdateService(MEMBER_CA_JOB_JOB_PREFERENCES);

  const formattedJobPreference = useMemo(() => {
    return formatJobPreferenceData(data);
  }, [data]);

  const [state, setState] = useState(
    formattedJobPreference !== null &&
      Object.keys(formattedJobPreference).length
      ? formattedJobPreference
      : {}
  );

  const {
    preferences_details,
    handlePreferencesDetailBlur,
    isValidAllFields,
    imageDetails,
    handleResetError,
  } = useJobPreference({
    state,
    isEditable,
    functionalAreas,
    industryTypes,
  });

  useEffect(() => {
    handleSetData(formattedJobPreference);
  }, [formattedJobPreference]);

  const handleSetData = (data) => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  };

  const handleMultiSelect = (value, detail) => {
    let updatedArray = state?.[detail.key] ? [...state[detail.key]] : [];
    const valIndex = updatedArray.indexOf(value);
    if (valIndex > -1) {
      updatedArray.splice(valIndex, 1);
    } else {
      updatedArray = [...updatedArray, value];
    }
    setState({ ...state, [detail.key]: updatedArray });
  };

  const findKeyByLabel = (label, details) => {
    const item = details
      .flatMap((group) => group)
      .find((item) => item.label === label);
    return item;
  };

  const onChangeValue = (details) => (label, value) => {
    const { key, isToggle } = findKeyByLabel(label, details);
    setState({
      ...state,
      [key]: isToggle ? Number(!Boolean(value)) : value,
    });
    handleResetError(key);
  };

  const handleSave = () => {
    const payload = {
      posting_anywhere_in_india: state?.posting_anywhere_in_india ?? 1,
      transferable_post_acceptable: state?.transferable_post_acceptable ?? 1,
      posting_outside_india: state?.posting_outside_india ?? 1,
      preferred_region: state?.preferred_region,
      expected_annual_salary: state?.expected_annual_salary,
      industry_preference: state?.industry_preference,
      functional_area_preference: state?.functional_area_preference,
      cv_path: state?.cv_path,
      job_photo_path: state?.job_photo_path,
      introduction_video_path: state?.introduction_video_path,
    };
    handleUpdate(payload, () => {
      onSaveSuccessfull && onSaveSuccessfull();
      fetchData();
      handleEdit(false);
    });
  };

  const handleImageDeletion = (imageKey) => {
    setState({ ...state, [imageKey]: "" });
  };

  const isPageLoading =
    isLoadingJobPreferences ||
    functionalAreasIsLoading ||
    industryTypesIsLoading;

  const fetchDataError =
    isErrorJobPreferences?.data ||
    functionalAreasError?.data ||
    industryTypesError?.data;

  const handleImageUploadResult = (uploadResult, indexKey) => {
    setState({ ...state, [indexKey]: uploadResult?.data?.url ?? "" });
  };

  const handleDismissToast = () => {
    setError("");
  };

  return (
    <>
      <JobPreferenceTemplate
        preferences_details={preferences_details}
        onChangeValue={onChangeValue}
        handlePreferencesDetailBlur={handlePreferencesDetailBlur}
        isValidAllFields={isValidAllFields}
        handleMultiSelection={handleMultiSelect}
        handleImageUploadResult={handleImageUploadResult}
        isError={isError}
        isLoading={isLoading}
        isEditable={isEditable}
        onClickSave={handleSave}
        onClickCancel={() => {
          handleSetData(formattedJobPreference);
          // turn off the edit mode
          handleEdit(false);
        }}
        isPageLoading={isPageLoading}
        error={fetchDataError}
        onDeleteImage={handleImageDeletion}
        imageDetails={imageDetails}
      />
      {error ? (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      ) : null}
    </>
  );
};

export default JobPreference;
