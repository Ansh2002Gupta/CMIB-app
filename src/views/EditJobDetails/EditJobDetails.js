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

import { POST_JOB, UPDATE_JOB } from "../../services/apiServices/apiEndPoint";
import styles from "./EditJobDetails.styles";
import { AddJobContext } from "../../globalContext/addJob/addJobsProvider";
import useFetch from "../../hooks/useFetch";
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
  const [questionaire, setQuestionaire] = useState(intialQuestionData);
  const [loading, setLoading] = useState(false);
  const [isChecklist, setIsCheckList] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const questionaireRef = useRef(null);
  const addJobRef = useRef(null);
  const intl = useIntl();
  const [addJobs] = useContext(AddJobContext);

  const {
    fetchData,
    isLoading,
    isSuccess: newJobSuccess,
  } = useGetAddNewJobData();
  const {
    isLoading: isGetApiLoading,
    isSuccess: fetchApiSuccess,
    data,
    fetchData: fetchApiData,
  } = useFetch({
    url: `${POST_JOB}/${id}`,
  });

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
      setJobDetails(obj);
      setQuestionaire(transformedQuestionnaire);
      setLoading(false);
    }
  }, [data, newJobSuccess, fetchApiSuccess, addJobs]);
  console.log("XYZ", jobDetails);

  const addIsDeleteKey = (updatedArray) => {
    let mainArray = intialQuestionData;

    const updatedIds = new Set(updatedArray.map((item) => item.id));

    updatedArray = updatedArray.map((item) => ({ ...item, isDeleted: false }));

    mainArray.forEach((item) => {
      if (!updatedIds.has(item.id)) {
        updatedArray.push({ ...item, isDeleted: true });
      }
    });
    return updatedArray;
  };
  const onSubmit = () => {
    let jobDataPosted = intialJobData;
    let questionnairelist = intialQuestionData;
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
        isChecklist
      );
      if (questionaireRef.current) {
        formattedData.questions = addIsDeleteKey(
          formattedData.questions ? formattedData.questions : []
        );
      }
      Http.put(`${UPDATE_JOB}/${id}`, formattedData)
        .then((res) => {
          alert("Job Updated Successfully");
        })
        .catch((e) => {
          alert("SomeThing Went Wrong");
        })
        .finally(() => {
          navigate(-1);
        });
    }
  };
  return (
    <View style={styles.mainViewStyle}>
      <IconHeader
        headerText={intl.formatMessage({ id: "label.edit_jobs" })}
        isBorderVisible={false}
      />
      {(isLoading || isGetApiLoading || loading) && <LoadingScreen />}
      {!(isLoading || isGetApiLoading) && jobDetails && questionaire && (
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
                  questionnairelist = questionaireRef.current.getQuestionData();
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
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default EditJobDetails;
