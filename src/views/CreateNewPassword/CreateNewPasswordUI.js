import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./CreateNewPassword.style";
import HeaderText from "../../components/HeaderText/HeaderText";
import ButtonComponent from "../../components/ButtonComponent";
import colors from "../../assets/colors";

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
  const bulletStyle = (isValid) => ({
    width: 6,
    height: 6,
    borderRadius: 5,
    margin: 5,
    backgroundColor: isValid ? colors.green : colors.lightGrey,
  });
  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <HeaderText
          text={intl.formatMessage({ id: "label.createNewPassword" })}
          label={intl.formatMessage({ id: "label.createNewPasswordText" })}
        />
        <View style={styles.borderStyle} />
      </View>
      <View style={styles.companyView}>
        <CustomTextInput
          label={intl.formatMessage({ id: "label.newPassword" })}
          placeholder={intl.formatMessage({ id: "label.enterNewPassword" })}
          value={newPassword}
          onChangeText={(val) => onChangePasswordInput(val)}
          isMandatory
          eyeImage={true}
          isPassword={true}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.confirmPassword" })}
          placeholder={intl.formatMessage({ id: "label.confirmNewPassword" })}
          value={confirmNewPassword}
          onChangeText={(val) => {
            onChangeConfirmPasswordInput(val);
          }}
          isMandatory
          eyeImage={true}
          isPassword={true}
        />

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
