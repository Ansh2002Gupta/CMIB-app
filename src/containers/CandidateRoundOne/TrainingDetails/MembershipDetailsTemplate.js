import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./TrainingDetails.style";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import { formatDate } from "../../../utils/util";

const MembershipDetailsTemplate = ({intl, isWebView, isViewMode = false, onValidationChange = () => {}}, ref) => {
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
          <View style={isWebView ? styles.gridView : styles.gap}>
            <View style={styles.textInputContainer(isWebView)}>
              <CustomLabelView
                label={intl.formatMessage({ id: "label.doYouHaveMembership" })}
                isMandatory
              />
              <CustomToggleComponent
                isMandatory
                customToggleStyle={styles.customToggleStyle}
                value={isMembershipNumber}
                onValueChange={handleGcmsNumberSelection}
              />
            </View>
            {!Boolean(isMembershipNumber) && <>
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={membershipEnrollNumber}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.membershipEnrollment" })}
                placeholder={'M-0249'}
                value={membershipEnrollNumber}
                onChangeText={setMembershipEnrollNumber}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={dateOfCompletion}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(false)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.dateOfCompletion" })}
                placeholder={formatDate(new Date().toISOString())}
                isCalendar
                format={'DD/MM/YYYY'}
                maxDate={new Date()}
                value={dateOfCompletion}
                onChangeText={setDateOfCompletion}
              />
            </>}
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(MembershipDetailsTemplate);