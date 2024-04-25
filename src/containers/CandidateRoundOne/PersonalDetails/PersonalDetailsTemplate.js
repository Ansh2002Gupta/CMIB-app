import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";
import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import { GENDER, MARITAL_STATUS } from "../../../constants/constants";
import images from "../../../images";
import styles from "./PersonalDetails.style";
import { capitalizeFirstLetter, formatDate } from "../../../utils/util";

const PersonalDetailsTemplate = ({
  intl,
  isWebView,
  onValidationChange = () => {},
  personalDetails,
  filledData,
}, ref) => {
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [isPassport, setIsPassport] = useState(1);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        name: personalDetails?.name,
        nationality: personalDetails?.nationality,
        gender: capitalizeFirstLetter(gender),
        marital_status: maritalStatus,
        dob: personalDetails?.dob || dob,
        email,
        passport_number: passportNumber,
        has_passport: isPassport === 1 ? 0 : 1,
      };
    },
  }));

  useEffect(() => {
    if (personalDetails) {
      personalDetails?.gender && setGender(personalDetails?.gender);
      personalDetails?.dob && setDob(formatDate(new Date(personalDetails?.dob)));
      personalDetails?.email && setEmail(personalDetails?.email);
    }
  }, [personalDetails]);

  useEffect(() => {
    filledData?.marital_status && setMaritalStatus(filledData?.marital_status);
    filledData?.passport_number && setIsPassport(0);
    filledData?.passport_number && setPassportNumber(filledData?.passport_number);
  }, [filledData])

  useEffect(() => {
   let res = gender.length > 0 && maritalStatus.length > 0 && dob.length > 0 && email.length > 0;
   if (!Boolean(isPassport)) {
      return onValidationChange(res && passportNumber.length > 0);
   } else {
      return onValidationChange(res);
   }
  }, [dob, email, gender, isPassport, maritalStatus, onValidationChange, passportNumber]);

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
              isEditable={!personalDetails?.gender}
              options={GENDER}
              value={gender}
              onChangeValue={setGender}
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
              onChangeValue={setMaritalStatus}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.date_of_birth" })}
              placeholder={intl.formatMessage({ id: "label.date_of_birth" })}
              isMandatory
              value={dob}
              format={'DD/MM/YYYY'}
              isEditable={false}
              rightIcon={images.iconCalendar}
              onChangeText={setDob}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.email" })}
              placeholder={intl.formatMessage({ id: "label.email" })}
              isMandatory
              isEditable={false}
              value={email}
              onChangeText={setEmail}
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
                    value={isPassport}
                    onValueChange={setIsPassport}
                  />
                </View>
                {!Boolean(isPassport) && <CustomTextInput
                  customStyle={styles.textInputContainer(false)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.passport_number" })}
                  placeholder={intl.formatMessage({
                    id: "label.passport_number",
                  })}
                  isMandatory
                  value={passportNumber}
                  onChangeText={setPassportNumber}
                />}
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
                      onChangeText={setPassportNumber}
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
