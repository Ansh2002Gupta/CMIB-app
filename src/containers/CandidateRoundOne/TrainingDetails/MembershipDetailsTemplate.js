import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./TrainingDetails.style";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import { formatDate } from "../../../utils/util";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import DeclarationForm from "./DeclarationForm";

const MembershipDetailsTemplate = ({intl, isWebView, isViewMode = false, onValidationChange = () => {}, trainingDetails={}}, ref) => {
  //states
  const [isMembershipNumber, setIsMembershipNumber] = useState(1);
  const [membershipEnrollNumber, setMembershipEnrollNumber] = useState('');
  const [dateOfCompletion, setDateOfCompletion] = useState('');
  const [showDeclarationModal, setShowDeclarationModal] = useState(false);
  const [isDeclarationCompleted, setIsDeclarationCompleted] = useState(false);
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
        has_membership: !Boolean(isMembershipNumber),
        membership_enrollment_number: membershipEnrollNumber,
        membership_completion_date: dateOfCompletion ? formatDate(dateOfCompletion, 'YYYY-MM-DD') : '',
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    if(!Boolean(isMembershipNumber)) {
      // selected yes
      onValidationChange(membershipEnrollNumber.length > 0 && dateOfCompletion);
    } else {
      // selected no
      if(trainingDetails?.declaration_form) {
        onValidationChange(true);
      } else {
        onValidationChange(isDeclarationCompleted);
      }
    }

  }, [isMembershipNumber, membershipEnrollNumber, dateOfCompletion, onValidationChange, isDeclarationCompleted, trainingDetails]);
  
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
                onChangeValue={setDateOfCompletion}
              />
            </>}
            {Boolean(isMembershipNumber) && !trainingDetails?.declaration_form && 
              <View style={styles.submitFormContainer}>
                <CommonText>{intl.formatMessage({ id: "label.submitDeclaration" })}</CommonText>
                <CustomTouchableOpacity style={styles.submitButtonContainer} onPress={() => {setShowDeclarationModal(true)}}>
                  <CommonText customTextStyle={{color: '#04AF55', fontWeight: 600}}>{intl.formatMessage({ id: "label.submitDeclarationform" })}</CommonText>
                  <CustomImage
                    source={images.rightArrowGreen}
                    style={styles.imageStyle}
                  />
                </CustomTouchableOpacity>
              </View>
            }
          </View>
          {showDeclarationModal && <DeclarationForm intl={intl} onPressIconCross={() => setShowDeclarationModal(false)} setIsDeclarationCompleted={setIsDeclarationCompleted}/>}
        </CardComponent>
  )
};

export default  React.forwardRef(MembershipDetailsTemplate);