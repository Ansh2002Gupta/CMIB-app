import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import JobPreferenceTemplate from "./JobPreferenceTemplate";
import useFetch from "../../hooks/useFetch";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import {
  COMPANY_FUNCTIONAL_AREAS,
  CORE_INDUSTRY_TYPE,
  JOB_PREFERENCES,
  MEMBERS,
  MEMBER_CA_JOB_JOB_PREFERENCES,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { useJobPreference } from "./controller/useJobPreference";
import { formatJobPreferenceData } from "./controller/utils";

const JobPreference = ({ isEditable, handleEdit, onSaveSuccessfull }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantJobPreferenceData,
    isLoading: isGettingApplicantJobPreferenceDataLoading,
    error: errorWhileGettingApplicantJobPreferenceData,
    fetchData: fetchingApplicantJobPreferenceData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      MEMBERS +
      `/${id}` +
      JOB_PREFERENCES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: functionalAreas,
    isLoading: functionalAreasIsLoading,
    error: functionalAreasError,
    fetchData: fetchingFunctionalAreas,
  } = useFetch({
    url: COMPANY_FUNCTIONAL_AREAS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: industryTypes,
    isLoading: industryTypesIsLoading,
    error: industryTypesError,
    fetchData: fetchingIndustryTypes,
  } = useFetch({
    url: CORE_INDUSTRY_TYPE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: memberJobPreferenceData,
    error: errorWhileGettingMemberJobPreferenceData,
    isLoading: isLoadingMemberJobPreferences,
    fetchData,
  } = useFetch({
    url: MEMBER_CA_JOB_JOB_PREFERENCES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(async () => {
    if (currentModule) {
      if (isCompany) {
        await fetchingApplicantJobPreferenceData({});
      } else {
        await fetchingFunctionalAreas();
        await fetchingIndustryTypes();
        await fetchData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantJobPreferenceData : memberJobPreferenceData;
  const isLoadingJobPreferences = isCompany
    ? isGettingApplicantJobPreferenceDataLoading
    : isLoadingMemberJobPreferences;
  const isErrorJobPreferences = isCompany
    ? errorWhileGettingApplicantJobPreferenceData
    : errorWhileGettingMemberJobPreferenceData;

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
