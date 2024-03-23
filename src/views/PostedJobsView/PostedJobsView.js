import React, { useEffect, useRef, useState } from "react";
import PostedJobsViewUI from "./PostedJobsViewUi";
import useIsWebView from "../../hooks/useIsWebView";
import useGetPostedJobsData from "../../services/apiServices/hooks/PostedJobs/useGetPostedJobsData";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { getFormatedData } from "../../utils/util";
import Http from "../../services/http-service";
import { POST_JOB } from "../../services/apiServices/apiEndPoint";
const PostedJobView = () => {
  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetPostedJobsData();
  const addComponentRef = useRef();
  const addQuestionRef = useRef();
  const [isCheckList, setIsCheckList] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = () => {
    let jobData;
    let questionnairelist;
    let isError = true;
    let questionError = true;
    if (addComponentRef.current) {
      jobData = addComponentRef.current.getChildState();
    }
    if (addQuestionRef.current) {
      questionnairelist = addQuestionRef.current.getQuestionData();
    }
    if (addComponentRef.current) {
      isError = addComponentRef.current.getErrors();
    }
    if (addComponentRef.current) {
      questionError = addQuestionRef.current.getQuestionError();
    }

    if (!isError && !questionError) {
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

  const { isWebView } = useIsWebView();

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && isSuccess && !isError && (
        <PostedJobsViewUI
          isWebView={isWebView}
          addComponentRef={addComponentRef}
          addQuestionRef={addQuestionRef}
          setIsCheckList={setIsCheckList}
          isCheckList={isCheckList}
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
