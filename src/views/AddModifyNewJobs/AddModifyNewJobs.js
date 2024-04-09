import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "../../routes";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { getFormatedData } from "../../utils/util";
import Http from "../../services/http-service";
import useGetAddNewJobData from "../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import useIsWebView from "../../hooks/useIsWebView";
import { POST_JOB } from "../../services/apiServices/apiEndPoint";
import AddModifyNewJobsUi from "./AddModifyNewJobsUi";
import { useIntl } from "react-intl";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

const AddModifyNewJobs = () => {
  const { isLoading, isSuccess, isError, isErrorData, fetchData } =
    useGetAddNewJobData();
  const navigate = useNavigate();
  const addComponentRef = useRef();
  const addQuestionRef = useRef();
  const [isCheckList, setIsCheckList] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = () => {
    setError(null);
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
      const formattedData = getFormatedData(
        jobData,
        questionnairelist,
        isCheckList
      );
      Http.post(POST_JOB, formattedData)
        .then((res) => {
          setSuccessMessage(
            intl.formatMessage({ id: "label.job_saved_successfully" })
          );
          navigate(-1);
        })
        .catch((e) => {
          setError(
            e.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
          );
          setSuccessMessage(`${GENERIC_GET_API_FAILED_ERROR_MESSAGE}, ${e}`);
          navigate(-1);
        });
    } else {
      setSuccessMessage(intl.formatMessage({ id: "label.fill_mandatory" }));
    }
  };

  const { isWebView } = useIsWebView();

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && isSuccess && !isError && !error && (
        <AddModifyNewJobsUi
          isWebView={isWebView}
          addComponentRef={addComponentRef}
          addQuestionRef={addQuestionRef}
          setIsCheckList={setIsCheckList}
          isCheckList={isCheckList}
          onSubmit={onSubmit}
        />
      )}
      {!isLoading && isError && error && (
        <ErrorComponent
          errorMsg={
            isErrorData?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
          }
        />
      )}
      {successMessage && (
        <ToastComponent
          toastMessage={successMessage}
          onDismiss={() => {
            setSuccessMessage(null);
          }}
        />
      )}
    </>
  );
};
export default AddModifyNewJobs;
