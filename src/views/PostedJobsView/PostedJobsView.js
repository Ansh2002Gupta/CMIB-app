import React, { useEffect, useState } from "react";
import PostedJobsViewUI from "./PostedJobsViewUi";
import useIsWebView from "../../hooks/useIsWebView";
import useGetPostedJobsData from "../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import {
  getFormatedData,
  validateJobData,
  validateQuestions,
} from "../../utils/util";
import Http from "../../services/http-service";
import { POST_JOB } from "../../services/apiServices/apiEndPoint";
const PostedJobView = () => {
  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetPostedJobsData();
  useEffect(() => {
    fetchData();
  }, []);
  const [questionnairelist, setIsQuestionaireList] = useState([]);
  const [error, setError] = useState({});
  const [jobData, setJobData] = useState({
    jobSummary: "",
    jobDetails: "",
    jobType: {},
    isUrgentJob: 0,
    minimumExperience: 0,
    maximumExperience: 0,
    nationality: "",
    designation: "",
    jobLocation: [],
    functionalAreas: [],
    genderPreference: {},
    categoryPreference: {},
    essentialQualification: "",
    desiredQualification: "",
    jobOpeningDate: new Date(),
    jobClosingDate: new Date(),
    numberOfVacancies: 0,
    vacanciesCountType: 0,
    modeofWork: {},
    flexiHours: 0,
    fullTime: 0,
    typeOfDisabilty: "",
    disabiltyPercentage: 0,
    salaryNagotiable: 0,
    minimumSalary: 0,
    maximumSalary: 0,
    contractYear: 0,
    contractMonth: 0,
    contractDay: 0,
  });
  const [isCheckList, setIsCheckList] = useState(false);

  const onSubmit = () => {
    const { isValid, errors } = validateJobData(jobData);
    const { isValidQuestion, questionError } =
      validateQuestions(questionnairelist);
    if (!isValid) {
      setError(errors);
    }
    if (!isValidQuestion) {
      setError((prev) => {
        return {
          ...prev,
          questionError: questionError,
        };
      });
    }
    if (isValid && isValidQuestion) {
      const formattedData = getFormatedData(jobData, questionnairelist);
      Http.post(POST_JOB, formattedData)
        .then((res) => {
          console.log("RESPOSNE", res);
        })
        .catch((e) => {
          console.log("ERROR in POST", e);
        });
    }
  };
  const handleJobDetailsChange = (field, value) => {
    if (error[field]) {
      setError((prev) => {
        return {
          ...prev,
          [field]: null,
        };
      });
    }

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
          handleJobDetailsChange={handleJobDetailsChange}
          setIsQuestionaireList={setIsQuestionaireList}
          questionnairelist={questionnairelist}
          setIsCheckList={setIsCheckList}
          isCheckList={isCheckList}
          error={error}
          setError={setError}
          onSubmit={onSubmit}
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
