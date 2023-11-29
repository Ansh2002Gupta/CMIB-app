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
import CreateNewPasswordValidation from "../../components/CreateNewPasswordValidation";

function CreateNewPasswordUI(props) {
  const {
    handleSubmit,
    onClickGoToLogin,
    onChangePasswordInput,
    confirmNewPassword,
    newPassword,
    onChangeConfirmPasswordInput,
    error,
    intl,
  } = props;

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
        <CreateNewPasswordValidation
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
        />
      </View>
      <View style={styles.submitView}>
        <ButtonComponent
          title={intl.formatMessage({ id: "label.submit" })}
          onPress={handleSubmit}
        />
        <TouchableOpacity onPress={onClickGoToLogin}>
          <Text style={styles.backToLoginText}>
            {intl.formatMessage({ id: "label.backToLogin" })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreateNewPasswordUI;
