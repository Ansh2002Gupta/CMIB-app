import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderImage from "../../components/HeaderImage";
import styles from "./CreateNewPassword.style";
import HeaderName from "../../components/HeaderName";
import HeaderText from "../../components/HeaderText/HeaderText";
import ButtonComponent from "../../components/ButtonComponent";

function CreateNewPasswordUI(props) {
  const {
    handleSubmit,
    onClickGoToLogin,
    validations,
    onChangePasswordInput,
    confirmNewPassword,
    newPassword,
    onChangeConfirmPasswordInput,
    error,
    intl,
  } = props;
  const icons = useTheme("icons");
  const bulletStyle = (isValid) => ({
    width: 6,
    height: 6,
    borderRadius: 5,
    margin: 5,
    backgroundColor: isValid ? colors.darkGreen : colors.lightGrey,
  });
  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <HeaderImage
          image1={icons.cmibImage}
          image2={icons.cmibText}
          text={intl.formatMessage({ id: "label.fullName" })}
        />
        <View style={styles.headerTextView}>
          <HeaderText
            text={intl.formatMessage({ id: "label.createNewPassword" })}
          />
        </View>
        <View style={styles.headerNameView}>
          <HeaderName
            text={intl.formatMessage({ id: "label.createNewPasswordText" })}
          />
        </View>
        <View style={styles.borderStyle} />
      </View>
      <View style={styles.companyView}>
        <View style={styles.firstTextInput}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.newPassword" })}
            placeholder={intl.formatMessage({ id: "label.enterNewPassword" })}
            value={newPassword}
            onChangeText={(val) => onChangePasswordInput(val)}
            eyeImage={true}
            isPassword={true}
          />
        </View>
        <View style={styles.secoundTextInput}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.confirmPassword" })}
            placeholder={intl.formatMessage({ id: "label.confirmNewPassword" })}
            value={confirmNewPassword}
            onChangeText={(val) => {
              onChangeConfirmPasswordInput(val);
            }}
            eyeImage={true}
            isPassword={true}
          />
          {error ? <Text>{error}</Text> : null}
        </View>
        <View style={styles.requirmentView}>
          <Text style={styles.validationText}>
            {intl.formatMessage({ id: "label.passwordRequirment" })}
          </Text>
          <View style={styles.validationView}>
            <View style={bulletStyle(validations.length)}></View>
            <Text style={styles.bulletText}>
              {intl.formatMessage({ id: "label.characterLength" })}
            </Text>
          </View>
          <View style={styles.validationView}>
            <View style={bulletStyle(validations.numeric)}></View>
            <Text style={styles.bulletText}>
              {intl.formatMessage({ id: "label.numericCharacter" })}
            </Text>
          </View>
          <View style={styles.validationView}>
            <View style={bulletStyle(validations.uppercase)}></View>
            <Text style={styles.bulletText}>
              {intl.formatMessage({ id: "label.upercaseCharacter" })}
            </Text>
          </View>
          <View style={styles.validationView}>
            <View style={bulletStyle(validations.lowercase)}></View>
            <Text style={styles.bulletText}>
              {intl.formatMessage({ id: "label.lowercaseCharacter" })}
            </Text>
          </View>
          <View style={styles.validationView}>
            <View style={bulletStyle(validations.specialChar)}></View>
            <Text style={styles.bulletText}>
              {intl.formatMessage({ id: "label.specialCharacter" })}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.submitView}>
        <ButtonComponent
          title={intl.formatMessage({ id: "label.submit" })}
          onPress={handleSubmit}
        />
        <TouchableOpacity>
          <Text style={styles.backToLoginText} onPress={onClickGoToLogin}>
            {intl.formatMessage({ id: "label.backToLogin" })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateNewPasswordUI;
