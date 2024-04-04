import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";

import useIsWebView from "../../hooks/useIsWebView";

import AddModifyQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import AddModifyJobComponent from "../../containers/AddModifyNewJobs/AddModifyJobComponent";
import FooterComponent from "../../containers/AddModifyNewJobs/FooterComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import { CustomTabs } from "../../components/Tab";
import useGetAddNewJobData from "../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import { useLocation, useNavigate } from "../../routes";
import LoadingScreen from "../../components/LoadingScreen";

import { getDecryptApiData, getFormatedData } from "../../utils/util";
import Http from "../../services/http-service";
import { useIntl } from "react-intl";

import { UPDATE_JOB } from "../../services/apiServices/apiEndPoint";
import styles from "./EditJobDetails.styles";
import { AddJobContext } from "../../globalContext/addJob/addJobsProvider";
import useGetEditJobs from "../../services/apiServices/hooks/EditJobs/useGetEditJobs";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
const EditJobDetails = () => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    jobData: intialJobData,
    questionData: intialQuestionData,
    id,
  } = location.state;
  const [jobDetails, setJobDetails] = useState(intialJobData);
  const initialJob = useRef(intialJobData);
  const initialQuestion = useRef(intialQuestionData);
  const [questionaire, setQuestionaire] = useState(intialQuestionData);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecklist, setIsCheckList] = useState(
    intialJobData?.notify_company === 1 ?? false
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [postError, setPostError] = useState(null);
  const questionaireRef = useRef(null);
  const addJobRef = useRef(null);
  const intl = useIntl();
  const [addJobs] = useContext(AddJobContext);
  const {
    fetchData,
    isLoading,
    isSuccess: newJobSuccess,
    isError,
    isErrorData,
  } = useGetAddNewJobData();
  const {
    isLoading: isGetApiLoading,
    isSuccess: fetchApiSuccess,
    stateResult: data,
    getJobs: fetchApiData,
    error: error,
    isError: jobError,
  } = useGetEditJobs(id);

  useEffect(() => {
    if (!intialJobData) {
      fetchApiData();
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (data && fetchApiSuccess && newJobSuccess) {
      setLoading(true);
      const { obj, transformedQuestionnaire } = getDecryptApiData(
        data,
        addJobs
      );
      initialJob.current = obj;
      initialQuestion.current = transformedQuestionnaire;
      setJobDetails(obj);
      setQuestionaire(transformedQuestionnaire);
      setIsCheckList(obj?.notify_company === 1 ?? false);
      setLoading(false);
    }
  }, [data, newJobSuccess, fetchApiSuccess, addJobs]);

  const addIsDeleteKey = (updatedArray) => {
    let mainArray = initialQuestion.current;

    const mainIds = new Set(mainArray.map((item) => item.id));
    const updatedIds = new Set(updatedArray.map((item) => item.id));

    updatedArray = updatedArray.map((item) => {
      if (mainIds.has(item.id)) {
        return { ...item, deleted: false };
      } else {
        const { id, ...newItem } = item;
        return { ...newItem, deleted: false };
      }
    });

    mainArray.forEach((item) => {
      if (!updatedIds.has(item.id)) {
        updatedArray.push({ ...item, deleted: true });
      }
    });

    return updatedArray;
  };
  const onSubmit = () => {
    let jobDataPosted = initialJob.current;
    let questionnairelist = initialQuestion.current;
    let isError = true;
    let questionError = true;
    if (addJobRef.current) {
      jobDataPosted = addJobRef.current.getChildState();
    }
    if (questionaireRef.current) {
      questionnairelist = questionaireRef.current.getQuestionData();
    }
    if (addJobRef.current) {
      isError = addJobRef.current.getErrors();
    }
    if (questionaireRef.current) {
      questionError = questionaireRef.current.getQuestionError();
    }
    if (
      (!isError || selectedTab == 1) &&
      (!questionError || selectedTab == 0)
    ) {
      jobDataPosted.jobOpeningDate = new Date(jobDataPosted.jobOpeningDate);
      jobDataPosted.jobClosingDate = new Date(jobDataPosted.jobClosingDate);
      let formattedData = getFormatedData(
        jobDataPosted,
        questionnairelist,
        isChecklist == 1 ? true : false
      );

      formattedData.questions = addIsDeleteKey(
        formattedData.questions ? formattedData.questions : []
      );
      setLoading(true);

      Http.put(`${UPDATE_JOB}/${id}`, formattedData)
        .then((res) => {
          setSuccessMessage(
            intl.formatMessage({ id: "label.job_updated_successfully" })
          );
          setLoading(false);
        })
        .catch((e) => {
          setPostError(e);
          setSuccessMessage(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
          setLoading(false);
        })
        .finally(() => {
          navigate(-1);
        });
    } else {
      setSuccessMessage(intl.formatMessage({ id: "label.fill_mandatory" }));
    }
  };
  return (
    <View style={styles.mainViewStyle}>
      <IconHeader
        headerText={intl.formatMessage({ id: "label.edit_jobs" })}
        isBorderVisible={false}
      />
      {(isLoading || isGetApiLoading || loading) && <LoadingScreen />}
      {!(isLoading || isGetApiLoading || loading) &&
        jobDetails &&
        questionaire && (
          <ScrollView style={styles.container}>
            <View style={styles.mainViewStyle}>
              <CustomTabs
                containerStyle={styles.backgroundWhite}
                setSelectedTab={setSelectedTab}
                cleanupFuntion={() => {
                  let jobData;
                  let questionnairelist;
                  if (addJobRef.current) {
                    jobData = addJobRef.current.getChildState();
                    setJobDetails(jobData);
                  }
                  if (questionaireRef.current) {
                    questionnairelist =
                      questionaireRef.current.getQuestionData();
                    setQuestionaire(questionnairelist);
                  }
                }}
                tabs={[
                  {
                    label: intl.formatMessage({
                      id: "label.job_details",
                    }),
                    component: (
                      <View style={styles.padding16}>
                        <AddModifyJobComponent
                          ref={addJobRef}
                          addNewJobData={jobDetails}
                          isExpanded={true}
                          isWebView={isWebView}
                          isMinimisedVisible={false}
                        />
                      </View>
                    ),
                  },
                  {
                    label: intl.formatMessage({
                      id: "label.view_questionaire",
                    }),
                    component: (
                      <View style={styles.paddingAllSide}>
                        <AddModifyQuestionaireComponent
                          isQuestionaire={true}
                          addNewJobData={questionaire}
                          isWebView={isWebView}
                          ref={questionaireRef}
                          isMinimisedVisible={false}
                          headerText={"label.view_questionaire"}
                        />
                      </View>
                    ),
                  },
                ]}
              />
            </View>
            <View style={styles.padding16}>
              <FooterComponent
                onSubmit={onSubmit}
                isWebView={isWebView}
                isCheckList={isChecklist}
                setIsCheckList={setIsCheckList}
                submitButtonText={"label.save"}
              />
            </View>
          </ScrollView>
        )}
      {!isLoading && (isError || jobError || postError) && (
        <ErrorComponent
          errorMsg={
            isErrorData?.data?.message ||
            error ||
            postError?.data?.message ||
            GENERIC_GET_API_FAILED_ERROR_MESSAGE
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
    </View>
  );
};
export default EditJobDetails;
