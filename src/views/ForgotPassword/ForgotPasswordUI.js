import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./ForgotPassword.style";
import HeaderText from "../../components/HeaderText/HeaderText";
import ButtonComponent from "../../components/ButtonComponent";
import CustomModal from "../../components/CustomModal";

const ForgotPasswordUI = (props) => {
  const {
    onClickForgotPassword,
    onClickGoToLogin,
    onChangeInput,
    userName,
    successLogin,
    errorMessage,
    intl,
  } = props;
  return (
    <View style={styles.mainView}>
      <HeaderText
        label={intl.formatMessage({ id: "label.forgotPasswordText" })}
        text={intl.formatMessage({ id: "label.forgotPassword" })}
      />
      <View style={styles.borderStyle} />
      <View style={styles.companyView}>
        <CustomTextInput
          label={intl.formatMessage({ id: "label.enterId" })}
          placeholder={intl.formatMessage({ id: "label.enterEmail" })}
          value={userName}
          onChangeText={(val) => {
            onChangeInput(val);
          }}
          errorMessage={errorMessage}
          isError={!!errorMessage}
          isMandatory
        />
      </View>
      <View style={styles.submitView}>
        <ButtonComponent
          title={intl.formatMessage({ id: "label.submit" })}
          onPress={onClickForgotPassword}
        />
        <TouchableOpacity>
          <Text style={styles.backToLoginText} onPress={onClickGoToLogin}>
            {intl.formatMessage({ id: "label.backToLogin" })}
          </Text>
        </TouchableOpacity>
      </View>
      {successLogin && (
        <CustomModal
          headerText={intl.formatMessage({ id: "label.thanks" })}
          secondaryText={intl.formatMessage({ id: "label.passwordResetText" })}
          onPress={() => {
            onClickGoToLogin();
          }}
          buttonTitle={intl.formatMessage({ id: "label.goBackToLogin" })}
          isSuccess
        ></CustomModal>
      )}
    </View>
  );
};

export default ForgotPasswordUI;
