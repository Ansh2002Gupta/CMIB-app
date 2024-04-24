import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./TrainingDetails.style";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import { formatDate } from "../../../utils/util";

const GMCSDetailsTemplate = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //states
  const [isGcmsNumber, setIsGcmsNumber] = useState(1);
  const [gcmsCertifiedNumber, setGcmsCertifiedNumber] = useState('');
  const [dateOfCompletion, setDateOfCompletion] = useState('');

  //custom functions
  const handleGcmsNumberSelection = (val) => {
    // val is 0,1,2 .... here
    setIsGcmsNumber(val);
    if(Boolean(val)) {
      setGcmsCertifiedNumber('');
      setDateOfCompletion('')
    }
  }

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        has_mcs_certification: !Boolean(isGcmsNumber),
        mcs_certification_number: gcmsCertifiedNumber,
        mcs_completion_date: dateOfCompletion ? formatDate(dateOfCompletion, 'YYYY-MM-DD') : '',
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    if(!Boolean(isGcmsNumber)) {
      // selected yes
      onValidationChange(gcmsCertifiedNumber.length > 0 && dateOfCompletion);
    } else {
      // selected no
      onValidationChange(true);
    }

  }, [isGcmsNumber, gcmsCertifiedNumber, dateOfCompletion, onValidationChange]);
  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.gmcsDetails" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <View style={styles.textInputContainer(isWebView)}>
              <CustomLabelView
                label={intl.formatMessage({ id: "label.doYouHaveGmcsNumber" })}
                isMandatory
              />
              <CustomToggleComponent
                isMandatory
                customToggleStyle={styles.customToggleStyle}
                value={isGcmsNumber}
                onValueChange={handleGcmsNumberSelection}
              />
            </View>
            {!Boolean(isGcmsNumber) && <>
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={gcmsCertifiedNumber}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.gmcsCertifiedNumber" })}
                placeholder={'1234-5678-910'}
                value={gcmsCertifiedNumber}
                onChangeText={setGcmsCertifiedNumber}
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
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(GMCSDetailsTemplate);