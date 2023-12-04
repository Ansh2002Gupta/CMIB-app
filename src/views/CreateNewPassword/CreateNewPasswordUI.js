import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={styles.scrollViewContainerStyle}
    >
      <View>
        <View style={styles.container}>
          <HeaderText
            text={intl.formatMessage({ id: "label.create_new_password" })}
            label={intl.formatMessage({ id: "label.enter_new_password" })}
          />
          <View style={styles.borderStyle} />
        </View>
        <View style={styles.companyView}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.new_password" })}
            placeholder={intl.formatMessage({
              id: "label.enter_your_new_password",
            })}
            value={newPassword}
            onChangeText={(val) => onChangePasswordInput(val)}
            isMandatory
            eyeImage={true}
            isPassword={true}
          />
          <CustomTextInput
            label={intl.formatMessage({ id: "label.confirm_new_password" })}
            placeholder={intl.formatMessage({
              id: "label.confirm_your_new_password",
            })}
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
      </View>
      <View style={styles.submitView}>
        <ButtonComponent
          title={intl.formatMessage({ id: "label.submit" })}
          onPress={handleSubmit}
        />
        <TouchableOpacity onPress={onClickGoToLogin}>
          <Text style={styles.backToLoginText}>
            {intl.formatMessage({ id: "label.back_to_login" })}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CreateNewPasswordUI;
