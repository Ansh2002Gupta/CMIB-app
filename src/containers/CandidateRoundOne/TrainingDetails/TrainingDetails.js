//Libraries
import React, { useRef, useImperativeHandle } from "react";
//UI & Styling
import GMCSDetailsTemplate from "./GMCSDetailsTemplate";
import useExamDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./TrainingDetails.style";
import { View } from "@unthinkable/react-core-components";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import CaTrainingDetailsTemplate from "./CaTrainingDetailsTemplate";

const TrainingDetails = ({ intl, isWebView, isViewMode = false }, ref) => {
    //refs
    const GMCSDetailsTemplateRef = useRef();
    const MembershipDetailsTemplateRef = useRef();
    const CaTrainingDetailsTemplateRef = useRef();
    // const { handleExamDetails} = useExamDetailsAPI();

    // useEffect(() => {
    //     handleExamDetails ({
    //       successCallback: (examDetails) => {
    //         updateExamDetails(examDetails);
    //       },
    //       errorCallback: () => {},
    //     });
    //   }, []);

    useImperativeHandle(ref, () => ({
      getALlData: () => {
        return {
          ...GMCSDetailsTemplateRef?.current?.getState(),
          ...MembershipDetailsTemplateRef?.current?.getState()
        }
      }
    }));

    const edDetailsConfig = [
        {
          content: <GMCSDetailsTemplate ref={GMCSDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <MembershipDetailsTemplate ref={MembershipDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <CaTrainingDetailsTemplate ref={CaTrainingDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default React.forwardRef(TrainingDetails);
