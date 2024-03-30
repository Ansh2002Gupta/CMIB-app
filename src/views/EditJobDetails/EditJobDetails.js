import React, { useEffect, useRef, useState } from "react";
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

import { getFormatedData } from "../../utils/util";
import Http from "../../services/http-service";
import { useIntl } from "react-intl";

import { UPDATE_JOB } from "../../services/apiServices/apiEndPoint";
import styles from "./EditJobDetails.styles";
const EditJobDetails = () => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobData, questionData, id } = location.state;
  const [jobDetails, setJobDetails] = useState(jobData);
  const [questionaire, setQuestionaire] = useState(questionData);
  const [isChecklist, setIsCheckList] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const questionaireRef = useRef(null);
  const addJobRef = useRef(null);
  const intl = useIntl();
  const { fetchData, isLoading } = useGetAddNewJobData();
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit = () => {
    let jobDataPosted = jobData;
    let questionnairelist = questionData;
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
      const formattedData = getFormatedData(jobDataPosted, questionnairelist);
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
