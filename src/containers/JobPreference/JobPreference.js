import React, { useContext, useEffect, useState } from "react";

import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import JobPreferenceTemplate from "./JobPreferenceTemplate";
import useFetch from "../../hooks/useFetch";
import { COMPANY_FUNCTIONAL_AREAS, CORE_INDUSTRY_TYPE, MEMBER_CA_JOB_JOB_PREFERENCES, UPLOAD_IMAGE } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { useJobPreference } from "./controller/useJobPreference";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";

const JobPreference = ({isEditable, handleEdit}) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};

  const {
    data: functionalAreas,
    isLoading: functionalAreasIsLoading,
    error: functionalAreasError,
  } = useFetch({
    url: CORE_INDUSTRY_TYPE,
  });

  const {
    data: industryTypes,
    isLoading: industryTypesIsLoading,
    error: industryTypesError,
  } = useFetch({
    url: COMPANY_FUNCTIONAL_AREAS,
  });

  const { data, isError: isErrorJobPreferences, isLoading: isLoadingJobPreferences } = useFetch({
    url: MEMBER_CA_JOB_JOB_PREFERENCES,
  });

  const { handleUpdate, isError, isLoading, error, setError } = useUpdateService(MEMBER_CA_JOB_JOB_PREFERENCES);  
  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();
  const { handleDeleteLogo, errorWhileDeletion, setErrorWhileDeletion } = useDeleteLogo();

  const [state, setState] = useState(data !== null && Object.keys(data).length ? data : {});

  const updatedFileUploadResult = fileUploadResult;

  const {
    preferences_details,
    handlePreferencesDetailBlur,
    isValidAllFields,
    handleAreasOfInterestSelection,
  } = useJobPreference({
    state,
    isEditable,
    functionalAreas,
    industryTypes,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  }, [data]);

  const handleMultiSelect = (value, detail) => {
    
    const updatedArray = state?.[detail.key] ? [...state[detail.key]] : [];
    const valIndex = updatedArray.indexOf(value);
    if (valIndex > -1) {
      updatedArray.splice(valIndex, 1); 
    } else {
      updatedArray.push(value); 
    }
    setState({ ...state, [detail.key]: updatedArray });
  };

  const findKeyByLabel = (label, details) => {
    const item = details.flatMap(group => group).find(item => item.label === label);
    return item; 
  };

  const onChangeValue = (details) => (label, value) => {
    const { key } = findKeyByLabel(label, details);
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log("state::", state)

  const handleSave = () => {
    const payload = {
      posting_anywhere_in_india: state?.posting_anywhere_in_india,
      transferable_post_acceptable: state?.transferable_post_acceptable,
      posting_outside_india: state?.posting_outside_india,
      preferred_region: state?.preferred_region,
      expected_annual_salary: state?.expected_annual_salary,
      industry_preference: state?.industry_preference,
      functional_area_preference: state?.functional_area_preference,
      cv_path: "",
      job_photo_path: "",
      introduction_video_path: "",
    }
    
    handleUpdate(payload, () => {
      handleEdit(false);
    });
  }

  const handleImageDeletion = () => {
    if (state?.job_photo_path) {
      setState((prevData) => ({
        ...prevData,
        job_photo_path: "",
      }));
    }
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  const isPageLoading =
    isLoadingJobPreferences ||
    functionalAreasIsLoading ||
    industryTypesIsLoading;

  const fetchDataError =
    isErrorJobPreferences?.data ||
    functionalAreasError?.data ||
    industryTypesError?.data;

  const handleImageUploadResult = (uploadResult) => {
    console.log("uploadResult", uploadResult)
  }  

  return (
    <JobPreferenceTemplate
      errorWhileDeletion={errorWhileDeletion}
      errorWhileUpload={errorWhileUpload}
      updatedFileUploadResult={updatedFileUploadResult}
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
        // turn off the edit mode
        handleEdit(false);
      }}
      isPageLoading={isPageLoading}
      error={fetchDataError}
      onDeleteImage={handleImageDeletion} 
      uploadImageToServerUtils={{
        fileUploadResult,
        handleFileUpload,
        isUploadingImageToServer,
        setFileUploadResult,
        uploadPercentage,
      }}
    />
  );
};

export default JobPreference;
