import { View } from "@unthinkable/react-core-components";
import React from "react";
import AddModifyQuestionaireComponent from "../../containers/AddModifyNewJobs/AddModifyQuestionaireComponent/AddModifyQuestionaireComponent";
import useIsWebView from "../../hooks/useIsWebView";
import FooterComponent from "../../containers/AddModifyNewJobs/FooterComponent";
const EditJobDetails = ({ questionnaireData }) => {
  const { isWebView } = useIsWebView();

  return (
    <View style={{ flex: 1 }}>
      <AddModifyQuestionaireComponent
        isQuestionaire={true}
        addNewJobData={questionnaireData}
        isWebView={isWebView}
      />
      <FooterComponent
        isWebView={isWebView}
        isMessageVisible={false}
        // isCheckList={isCheckList}
        // setIsCheckList={setIsCheckList}
        // onSubmit={onSubmit}
      />
    </View>
  );
};
export default EditJobDetails;
