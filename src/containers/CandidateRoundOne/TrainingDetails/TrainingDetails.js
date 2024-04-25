//Libraries
import React, { useRef, useImperativeHandle, useState, useEffect } from "react";
//UI & Styling
import GMCSDetailsTemplate from "./GMCSDetailsTemplate";
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./TrainingDetails.style";
import { View } from "@unthinkable/react-core-components";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import CaTrainingDetailsTemplate from "./CaTrainingDetailsTemplate";
import useTrainingDetails from "../../../services/apiServices/hooks/CandidateRoundeOne/useTrainingDetails";

const TrainingDetails = ({ intl, isWebView, isViewMode = false, handleSave = () => {} }, ref) => {
    //refs
    const GMCSDetailsTemplateRef = useRef();
    const MembershipDetailsTemplateRef = useRef();
    const CaTrainingDetailsTemplateRef = useRef();

    const [isGMCSDetailsAdded, setIsGMCSDetailsAdded]  = useState(false);
    const [isMembershipDetailsAdded, setIsMembershipDetailsAdded]  = useState(false);
    const [isCaTrainingDetailsAdded, setIsCaTrainingDetailsAdded]  = useState(false);
    const { handleTrainingDetails, trainingDetails} = useTrainingDetails();

    useEffect(() => {
      handleTrainingDetails();
      }, []);

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
          content: <GMCSDetailsTemplate trainingDetails={trainingDetails} ref={GMCSDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleGMCSDeatils}/>,
        },
        {
          content: <MembershipDetailsTemplate trainingDetails={trainingDetails} ref={MembershipDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleMembershipDetails}/>,
        },
        {
          content: <CaTrainingDetailsTemplate trainingDetails={trainingDetails} ref={CaTrainingDetailsTemplateRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} onValidationChange={handleCaTrainingDeatils}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default React.forwardRef(TrainingDetails);
