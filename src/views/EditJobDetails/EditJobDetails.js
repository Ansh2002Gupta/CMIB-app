import { View } from "@unthinkable/react-core-components";
import React from "react";
import AddModifyQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import useIsWebView from "../../hooks/useIsWebView";
import FooterComponent from "../../containers/AddModifyNewJobs/FooterComponent";
import AddModifyJobComponent from "../../containers/AddModifyNewJobs/AddModifyJobComponent";
const EditJobDetails = ({ questionnaireData, appData }) => {
  const { isWebView } = useIsWebView();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {false && (
        <AddModifyQuestionaireComponent
          isQuestionaire={true}
          addNewJobData={questionnaireData}
          isWebView={isWebView}
        />
      )}
      <AddModifyJobComponent
        addNewJobData={appData}
        isExpanded={true}
        isWebView={isWebView}
      />
    </View>
  );
};
export default EditJobDetails;
