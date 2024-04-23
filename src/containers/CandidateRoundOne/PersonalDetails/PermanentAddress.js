import React, {useState, useImperativeHandle} from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";

import MultiRow from "../../../core/layouts/MultiRow";
import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import MobileNumberInput from "../../../components/MobileNumberInput";
import { numericValidator } from "../../../utils/validation";
import { GENDER, MARITAL_STATUS } from "../../../constants/constants";
import images from "../../../images";
import styles from "./PersonalDetails.style";

const PermanentAddress = ({
  intl,
  isWebView,
  onValidationChange = () => {}
}) => {
  const [permanentAddress1, setPermanentAddress1] = useState('');
  const [permanentAddress2, setPermanentAddress2] = useState('');
  const [permanentAddress3, setPermanentAddress3] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentCountry, setPermanentCountry] = useState('');
  const [permanentPincode, setPermanentPincode] = useState('');
  const [permanentState, setPermanentState] = useState('');
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

export default PermanentAddress;
