import React, { useEffect, useState } from "react";
import PostedJobsViewUI from "./PostedJobsViewUi";
import useIsWebView from "../../hooks/useIsWebView";

import useGetPostedJobsData from "../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
const PostedJobView = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    countryData,
    functionalData,
    jobLocationData,
    isErrorData,
  } = useGetPostedJobsData();
  const [questionnairelist, setIsQuestionaireList] = useState([]);
  const [jobData, setJobData] = useState({
    jobSummary: "",
    jobDetails: "",
    jobtype: "",
    isUrgentJob: 0,
    minimumExperience: 0,
    maximumExperience: 0,
    nationality: "",
    designation: "",
    jobLocation: "",
    functionalAreas: "",
    genderPreference: "",
    categoryPrefernce: "",
    essentialQualification: "",
    desiredQualification: "",
    jobOpeningDate: new Date(),
    jobClosingDate: new Date(),
    numberOfVacancies: 0,
    vacanciesCountType: 0,
    modeofWork: "",
    flexiHours: 0,
    fullTime: 0,
    typeOfDisabilty: "",
    disabiltyPercentage: 0,
    salaryNagotiable: 0,
    minimumSalary: 0,
    maximumSalary: 0,
  });
  const handleJobDetailsChange = (field, value) => {
    setJobData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const { isWebView } = useIsWebView();
  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && isSuccess && !isError && (
        <PostedJobsViewUI
          isWebView={isWebView}
          jobData={jobData}
          countryData={countryData}
          functionalData={functionalData}
          handleJobDetailsChange={handleJobDetailsChange}
          setIsQuestionaireList={setIsQuestionaireList}
          questionnairelist={questionnairelist}
        />
      )}
      {!isLoading && isError && (
        <ErrorComponent
          errorMsg={
            isErrorData?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
          }
          // onRetry={getErrorDetails().onRetry}
          // disableRetryBtn={isLoadingAPIs}
        />
      )}
    </>
  );
};
export default PostedJobView;
