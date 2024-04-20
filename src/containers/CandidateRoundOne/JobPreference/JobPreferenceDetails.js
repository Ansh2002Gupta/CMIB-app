//Libraries
import React, { useRef } from "react";
//UI & Styling
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./JobPreferenceDetails.style";
import { View } from "@unthinkable/react-core-components";
import PreferenceRegarding from "./PreferenceRegarding";
import CitySelection from "./CitySelection";
import MockInterview from "./MockInterview";
import CvUpload from "./CvUpload";

const JobPreferenceDetails = ({ intl, isWebView, isViewMode = false }) => {
    //refs
    const preferenceRegardingRef = useRef();
    const citySelectionRef = useRef();
    const mockInterviewRef = useRef();
    const cvUploadRef = useRef();
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
          content: <PreferenceRegarding ref={preferenceRegardingRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <CitySelection ref={citySelectionRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <MockInterview ref={mockInterviewRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <CvUpload ref={cvUploadRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default JobPreferenceDetails;
