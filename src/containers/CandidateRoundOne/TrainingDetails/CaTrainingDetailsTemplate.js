import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import { YEARS } from "../../../constants/constants";
import styles from "./TrainingDetails.style";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import { formatDate } from "../../../utils/util";
import ArticlesTraining from "./ArticlesTraining";

const CaTrainingDetailsTemplate = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //states
  const [isMembershipNumber, setIsMembershipNumber] = useState(1);
  const [membershipEnrollNumber, setMembershipEnrollNumber] = useState('');
  const [dateOfCompletion, setDateOfCompletion] = useState('');

  //custom functions
  const handleGcmsNumberSelection = (val) => {
    // val is 0,1,2 .... here
    setIsMembershipNumber(val);
    if(Boolean(val)) {
      setMembershipEnrollNumber('');
      setDateOfCompletion('')
    }
  }

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        isMembershipNumber: !Boolean(isMembershipNumber),
        membershipEnrollNumber,
        dateOfCompletion,
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    if(!Boolean(isMembershipNumber)) {
      // selected yes
      onValidationChange(membershipEnrollNumber.length > 0 && dateOfCompletion.length > 0);
    } else {
      // selected no
      onValidationChange(true);
    }

  }, [isMembershipNumber, membershipEnrollNumber, dateOfCompletion, onValidationChange]);
  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.membershipDetails" })}
          </CommonText>
          <ArticlesTraining intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>
    </CardComponent>
  )
};

export default  React.forwardRef(CaTrainingDetailsTemplate);