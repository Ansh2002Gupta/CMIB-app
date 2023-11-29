import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./Loginscreen.style";
import PropTypes from "prop-types";
import HeaderText from "../../components/HeaderText/HeaderText";
import CustomTextInput from "../../components/CustomTextInput";
import ButtonComponent from "../../components/ButtonComponent";
import FollowUsIcons from "../../components/FollowUsIcons";
import CheckBox from "../../components/CheckBox/CheckBox";

const LoginScreenUI = (props) => {
  const {
    onLogin,
    active,
    onForgotPasswordClick,
    toggleUser,
    loginDisabled,
    errorMessage,
    userName,
    password,
    onChangeUsername,
    onChangePassword,
    intl,
    onCreateNewPasswordClick,
    options,
    handleToggle,
  } = props;

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <HeaderText
          text={intl.formatMessage({ id: "label.login_to_cmib" })}
          label={intl.formatMessage({ id: "label.secure_login_access" })}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.topTabs}
            onPress={() => toggleUser(false)}
          >
            <Text
              style={!active ? styles.activeTopTabsText : styles.topTabsText}
            >
              {intl.formatMessage({ id: "label.member_candidate" })}
            </Text>
            <View style={!active ? styles.activeStyle : styles.inActiveStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topTabs}
            onPress={() => toggleUser(true)}
          >
            <View>
              <Text
                style={active ? styles.activeTopTabsText : styles.topTabsText}
              >
                {intl.formatMessage({ id: "label.company" })}
              </Text>
            </View>
            <View style={active ? styles.activeStyle : styles.inActiveStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.borderStyle} />
      </View>
      {active && (
        <>
          <View style={styles.companyView}>
            <CustomTextInput
              label={intl.formatMessage({ id: "label.username" })}
              placeholder={intl.formatMessage({
                id: "label.email_id_placeholder",
              })}
              value={userName}
              onChangeText={(val) => onChangeUsername(val)}
              errorMessage={errorMessage}
              isError={!!errorMessage}
              isMandatory
            />
            <CustomTextInput
              label={intl.formatMessage({ id: "label.password" })}
              placeholder={intl.formatMessage({
                id: "label.password_placeholder",
              })}
              value={password}
              onChangeText={(val) => onChangePassword(val)}
              isMandatory
              eyeImage={true}
              isPassword={true}
            />
            <View style={styles.forgotPasswordView}>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  isSelected={options[0].isSelected}
                  handleCheckbox={handleToggle}
                  id={options[0].id}
                />
                <Text style={styles.rememberMeText}>
                  {intl.formatMessage({ id: "label.remember_me" })}
                </Text>
              </View>
              <TouchableOpacity onPress={onForgotPasswordClick}>
                <Text style={styles.forgotPasswordText}>
                  {intl.formatMessage({ id: "label.forgot_password" })}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginButtonView}>
              <ButtonComponent
                title={intl.formatMessage({ id: "label.login" })}
                onPress={onLogin}
                disabled={loginDisabled}
              />
            </View>
            <View style={styles.accountView}>
              <Text style={styles.accountText}>
                {intl.formatMessage({ id: "label.dont_have_account" })}
              </Text>
              <TouchableOpacity onPress={onCreateNewPasswordClick}>
                <Text style={styles.newAccountText}>
                  {intl.formatMessage({ id: "label.create_new_account" })}
                </Text>
              </TouchableOpacity>
            </View>
            <FollowUsIcons />
          </View>
        </>
      )}
    </View>
  );
};

LoginScreenUI.propTypes = {
  onLogin: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onForgotPasswordClick: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
  loginDisabled: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onCreateNewPasswordClick: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default LoginScreenUI;
