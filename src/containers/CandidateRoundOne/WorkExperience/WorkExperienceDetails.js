//Libraries
import React, { useRef } from "react";
//UI & Styling
import WorkExperienceDetailsTemplate from "./WorkExperienceDetailsTemplate";
import useExamDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./WorkExperienceDetails.style";
import { View } from "@unthinkable/react-core-components";
import CurrentStatusDetailsTemplate from "./CurrentStatusDetailsTemplate";

const WorkExperienceDetails = ({ intl, isWebView, isViewMode = false }) => {
    //refs
    const WorkExpDetailsTemplateRef = useRef();
    const CurrentStatusDetailsTemplateRef = useRef();
    // const { handleExamDetails} = useExamDetailsAPI();

    // useEffect(() => {
    //     handleExamDetails ({
    //       successCallback: (examDetails) => {
    //         updateExamDetails(examDetails);
    //       },
    //       errorCallback: () => {},
    //     });
    //   }, []);

    const edDetailsConfig = [
        {
          content: <WorkExperienceDetailsTemplate ref={WorkExpDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <CurrentStatusDetailsTemplate ref={CurrentStatusDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default WorkExperienceDetails;
