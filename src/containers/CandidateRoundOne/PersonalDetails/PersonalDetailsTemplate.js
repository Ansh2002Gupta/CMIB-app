import React, {useState, useImperativeHandle} from "react";
import { View } from "@unthinkable/react-core-components";
import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import { GENDER, MARITAL_STATUS } from "../../../constants/constants";
import images from "../../../images";
import styles from "./PersonalDetails.style";

const PersonalDetailsTemplate = ({
  intl,
  isWebView,
}, ref) => {
  const [gender, onChangeGender] = useState('');
  const [maritalStatus, onChangeMaritalStatus] = useState('');
  const [dob, onChangeDob] = useState('');
  const [email, onChangeEmail] = useState('');
  const [passportNumber, onChangePassportNumber] = useState('');

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        gender,
        maritalStatus,
        dob,
        email,
        passportNumber
      };
    },
  }));

  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.personal_details" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.gender" })}
              placeholder={intl.formatMessage({ id: "label.gender" })}
              isMandatory
              isDropdown
              isEditable={false}
              options={GENDER}
              value={gender}
              onChangeValue={onChangeGender}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.marital_status" })}
              placeholder={intl.formatMessage({ id: "label.marital_status" })}
              isMandatory
              isDropdown
              options={MARITAL_STATUS}
              value={maritalStatus}
              onChangeValue={onChangeMaritalStatus}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.date_of_birth" })}
              placeholder={intl.formatMessage({ id: "label.date_of_birth" })}
              isMandatory
              value={dob}
              isEditable={false}
              rightIcon={images.iconCalendar}
              onChangeText={onChangeDob}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.email" })}
              placeholder={intl.formatMessage({ id: "label.email" })}
              isMandatory
              isEditable={false}
              value={email}
              onChangeText={onChangeEmail}
            />
            {isWebView ? (
              <>
                <View style={styles.textInputContainer(isWebView)}>
                  <CustomLabelView
                    label={intl.formatMessage({ id: "label.passport" })}
                    isMandatory
                  />
                  <CustomToggleComponent
                    isMandatory
                    customToggleStyle={styles.customToggleStyle}
                  />
                </View>
                <CustomTextInput
                  customStyle={styles.textInputContainer(false)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.passport_number" })}
                  placeholder={intl.formatMessage({
                    id: "label.passport_number",
                  })}
                  isMandatory
                  value={passportNumber}
                  onChangeText={onChangePassportNumber}
                />
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <View style={styles.textInputContainer(isWebView)}>
                    <CustomLabelView
                      label={intl.formatMessage({ id: "label.passport" })}
                      isMandatory
                    />
                    <CustomToggleComponent
                      isMandatory
                      customToggleStyle={styles.customToggleStyle}
                    />
                  </View>
                  <View style={styles.passportNo}>
                    <CustomTextInput
                      customStyle={styles.textInputContainer(false)}
                      isPaddingNotRequired
                      label={intl.formatMessage({
                        id: "label.passport_number",
                      })}
                      placeholder={intl.formatMessage({
                        id: "label.passport_number",
                      })}
                      isMandatory
                      value={passportNumber}
                      onChangeText={onChangePassportNumber}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </CardComponent>
  )
};

export default React.forwardRef(PersonalDetailsTemplate);
