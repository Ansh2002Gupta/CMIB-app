import { Platform, ScrollView, View } from "@unthinkable/react-core-components";
import React, { useEffect, useRef, useState } from "react";
import useIsWebView from "../../hooks/useIsWebView";
import AddModifyQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import AddModifyJobComponent from "../../containers/AddModifyNewJobs/AddModifyJobComponent";
import FooterComponent from "../../containers/AddModifyNewJobs/FooterComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import { CustomTabs, FormTabs } from "../../components/Tab";
import { useIntl } from "react-intl";
import useGetAddNewJobData from "../../services/apiServices/hooks/AddNewJobs/useGetAddNewJobData";
import colors from "../../assets/colors";
import { useLocation, useNavigate } from "../../routes";
import LoadingScreen from "../../components/LoadingScreen";
import { getFormatedData } from "../../utils/util";
import Http from "../../services/http-service";
import { UPDATE_JOB } from "../../services/apiServices/apiEndPoint";

const EditJobDetails = () => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobData, questionData } = location.state;
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
    let jobData = jobDetails;
    let questionnairelist = questionaire;
    let isError = true;
    let questionError = true;
    if (addJobRef.current) {
      jobData = addJobRef.current.getChildState();
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
      jobData.jobOpeningDate = new Date(jobData.jobOpeningDate);
      jobData.jobClosingDate = new Date(jobData.jobClosingDate);
      console.log("ccc", questionnairelist);
      const formattedData = getFormatedData(jobData, questionnairelist);
      // Http.put(`${UPDATE_JOB}/157`, formattedData)
      //   .then((res) => {
      //     alert("Job Updated Successfully");
      //   })
      //   .catch((e) => {
      //     alert("SomeThing Went Wrong");
      //   })
      //   .finally(() => {
      //     navigate(-1);
      //   });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.offWhite }}>
      <IconHeader headerText={"Edit Jobs"} isBorderVisible={false} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.offWhite,
              flex: 1,
            }}
          >
            <CustomTabs
              containerStyle={{ backgroundColor: colors.white }}
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
                    <View style={{ padding: 16 }}>
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
                    <View
                      style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 16,
                      }}
                    >
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
          <View style={{ padding: 16 }}>
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
