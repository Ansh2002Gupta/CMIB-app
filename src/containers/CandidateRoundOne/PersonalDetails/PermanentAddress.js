import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./PersonalDetails.style";

const PermanentAddress = ({
  intl,
  isWebView,
  onValidationChange = () => {}
}, ref) => {
  const [permanentAddress1, setPermanentAddress1] = useState('');
  const [permanentAddress2, setPermanentAddress2] = useState('');
  const [permanentAddress3, setPermanentAddress3] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentCountry, setPermanentCountry] = useState('');
  const [permanentPincode, setPermanentPincode] = useState('');
  const [permanentState, setPermanentState] = useState('');

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        address: {
          type: "Permanent",
          address_line_1: permanentAddress1,
          address_line_2: permanentAddress2,
          address_line_3: permanentAddress3,
          city: permanentCity,
          country: permanentCountry,
          state: permanentState,
          pincode: permanentPincode
        }
      };
    },
  }));

  useEffect(() => {
   onValidationChange(permanentAddress1.length > 0 &&
    permanentCity.length > 0 &&
    permanentCountry.length > 3 &&
    permanentPincode.length > 3 &&
    permanentState.length > 3);
    
  }, [permanentAddress1,
    permanentCity,
    permanentCountry,
    permanentPincode,
    permanentState,
    onValidationChange]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.permanent_address" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address1" })}
              placeholder={intl.formatMessage({ id: "label.address1" })}
              isMandatory
              isMultiline
              noOfRows={2}
              value={permanentAddress1}
              onChangeText={setPermanentAddress1}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address2" })}
              placeholder={intl.formatMessage({ id: "label.address2" })}
              isMultiline
              noOfRows={2}
              value={permanentAddress2}
              onChangeText={setPermanentAddress2}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address3" })}
              placeholder={intl.formatMessage({ id: "label.address3" })}
              isMultiline
              noOfRows={2}
              value={permanentAddress3}
              onChangeText={setPermanentAddress3}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.country" })}
              placeholder={intl.formatMessage({ id: "label.country" })}
              isMandatory
              value={permanentCountry}
              onChangeText={setPermanentCountry}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.state" })}
              placeholder={intl.formatMessage({ id: "label.state" })}
              isMandatory
              value={permanentState}
              onChangeText={setPermanentState}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.city" })}
              placeholder={intl.formatMessage({ id: "label.city" })}
              isMandatory
              value={permanentCity}
              onChangeText={setPermanentCity}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.pincode" })}
              placeholder={intl.formatMessage({ id: "label.pincode" })}
              isMandatory
              value={permanentPincode}
              onChangeText={setPermanentPincode}
            />
          </View>
        </CardComponent>
  )
};

export default React.forwardRef(PermanentAddress);
