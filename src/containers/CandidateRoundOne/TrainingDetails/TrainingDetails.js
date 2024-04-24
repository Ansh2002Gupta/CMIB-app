//Libraries
import React, { useRef, useImperativeHandle, useState } from "react";
//UI & Styling
import GMCSDetailsTemplate from "./GMCSDetailsTemplate";
import useExamDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./TrainingDetails.style";
import { View } from "@unthinkable/react-core-components";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import CaTrainingDetailsTemplate from "./CaTrainingDetailsTemplate";

const TrainingDetails = ({ intl, isWebView, isViewMode = false, handleSave = () => {} }, ref) => {
    //refs
    const GMCSDetailsTemplateRef = useRef();
    const MembershipDetailsTemplateRef = useRef();
    const CaTrainingDetailsTemplateRef = useRef();

    const [isGMCSDetailsAdded, setIsGMCSDetailsAdded]  = useState(false);
    const [isMembershipDetailsAdded, setIsMembershipDetailsAdded]  = useState(false);
    const [isCaTrainingDetailsAdded, setIsCaTrainingDetailsAdded]  = useState(false);
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
      getAllData: () => {
        return {
          ...GMCSDetailsTemplateRef?.current?.getState(),
          ...MembershipDetailsTemplateRef?.current?.getState(),
          ...CaTrainingDetailsTemplateRef?.current?.getState(),
        }
      }
    }));

    const handleGMCSDeatils = (val) => {
      if (val !== isGMCSDetailsAdded) {
        setIsGMCSDetailsAdded(val);
        handleSave(val && isMembershipDetailsAdded && isCaTrainingDetailsAdded);
      }
    }
  
    const handleMembershipDetails = (val) => {
      if (val !== isMembershipDetailsAdded) {
        setIsMembershipDetailsAdded(val);
        handleSave(val && isGMCSDetailsAdded && isCaTrainingDetailsAdded);
      }
    }
  
    const handleCaTrainingDeatils = (val) => {
      if (val !== isCaTrainingDetailsAdded) {
        setIsCaTrainingDetailsAdded(val);
        handleSave(val && isGMCSDetailsAdded && isMembershipDetailsAdded);
      }
    }

    const edDetailsConfig = [
        {
          content: <GMCSDetailsTemplate ref={GMCSDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleGMCSDeatils}/>,
        },
        {
          content: <MembershipDetailsTemplate ref={MembershipDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleMembershipDetails}/>,
        },
        {
          content: <CaTrainingDetailsTemplate ref={CaTrainingDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleCaTrainingDeatils}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default React.forwardRef(TrainingDetails);
