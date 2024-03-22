import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useRef, useState } from "react";
import IconHeader from "../../components/IconHeader/IconHeader";
import styles from "./PostedJobsView.style";
import { useIntl } from "react-intl";
import AddJobComponent from "../../containers/PostedJobs/AddJobComponent";
import FooterComponent from "../../containers/PostedJobs/FooterComponent";
import AddQuestionaireComponent from "../../containers/PostedJobs/AddQuestionaireComponent/AddQuestionaireComponent";
import { TwoRow } from "../../core/layouts";

const PostedJobsViewUI = ({
  isWebView,
  setIsQuestionaireList,
  questionnairelist,
  isCheckList,
  setIsCheckList,
  error,
  onSubmit,
  setError,
  addComponentRef,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isQuestionaire, setIsQuestionaire] = useState(true);
  const intl = useIntl();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <IconHeader
          headerText={
            isWebView
              ? intl.formatMessage({ id: "label.add_new_jobs" })
              : intl.formatMessage({ id: "label.posted_jobs" })
          }
        />
        <TwoRow
          topSection={
            <View>
              <AddJobComponent
                ref={addComponentRef}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                isWebView={isWebView}
                error={error}
              />
              <AddQuestionaireComponent
                isQuestionaire={isQuestionaire}
                setIsQuestionaire={setIsQuestionaire}
                isWebView={isWebView}
                setIsQuestionaireList={setIsQuestionaireList}
                questionnairelist={questionnairelist}
                questionError={error.questionError}
                setError={setError}
              />
            </View>
          }
          style={styles.innerContainer}
          isTopFillSpace
          bottomSection={
            <FooterComponent
              isWebView={isWebView}
              isCheckList={isCheckList}
              setIsCheckList={setIsCheckList}
              onSubmit={onSubmit}
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export default PostedJobsViewUI;
