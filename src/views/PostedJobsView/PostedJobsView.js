import React, { useEffect, useState } from "react";
import PostedJobsViewUI from "./PostedJobsViewUi";
import useIsWebView from "../../hooks/useIsWebView";

import useGetPostedJobsData from "../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import LoadingScreen from "../../components/LoadingScreen";
const PostedJobView = () => {
  const { isLoading, isError, isSuccess, countryData, functionalData } =
    useGetPostedJobsData();
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
  //functinal
  //country
  //jobType
  //categoryPrefernce
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <PostedJobsViewUI
          isWebView={isWebView}
          jobData={jobData}
          countryData={countryData}
          functionalData={functionalData}
          handleJobDetailsChange={handleJobDetailsChange}
        />
      )}
    </>
  );
};
export default PostedJobView;
