import React, { useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View, ScrollView } from "@unthinkable/react-core-components";

import IconHeader from "../../components/IconHeader/IconHeader";
import { useIntl } from "react-intl";
import AddModifyJobComponent from "../../containers/AddModifyNewJobs/AddModifyJobComponent";
import FooterComponent from "../../containers/AddModifyNewJobs/FooterComponent";
import AddQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import { TwoRow } from "../../core/layouts";
import getStyles from "./AddModifyNewJobs.styles.";

const AddNewJobsUi = ({
  isWebView,
  isCheckList,
  setIsCheckList,
  onSubmit,
  addComponentRef,
  addQuestionRef,
  addNewJobData,
  disabled,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isQuestionaire, setIsQuestionaire] = useState(true);
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <IconHeader
          headerText={intl.formatMessage({ id: "label.add_new_jobs" })}
        />
        <TwoRow
          topSection={
            <View>
              <AddModifyJobComponent
                ref={addComponentRef}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                isWebView={isWebView}
                addNewJobData={addNewJobData}
              />
              <AddQuestionaireComponent
                ref={addQuestionRef}
                isQuestionaire={isQuestionaire}
                setIsQuestionaire={setIsQuestionaire}
                addQuestionRef={addQuestionRef}
                isWebView={isWebView}
                addQuestionData={addNewJobData}
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
              disabled={disabled}
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export default AddNewJobsUi;
