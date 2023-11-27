import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./Loginscreen.style";
import HeaderText from "../../components/HeaderText/HeaderText";
import CustomTextInput from "../../components/CustomTextInput";
import ButtonComponent from "../../components/ButtonComponent";
import FollowUsIcons from "../../components/FollowUsIcons";

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
    icons,
    intl,
    onCreateNewPasswordClick,
  } = props;

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <HeaderText
          text={intl.formatMessage({ id: "label.cmib" })}
          label={intl.formatMessage({ id: "label.cmibText" })}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.topTabs}
            onPress={() => toggleUser(false)}
          >
            <Text
              style={!active ? styles.activeTopTabsText : styles.topTabsText}
            >
              {intl.formatMessage({ id: "label.member_candidate_button" })}
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
                {intl.formatMessage({ id: "label.company_button" })}
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
              placeholder={intl.formatMessage({ id: "label.enterEmail" })}
              value={userName}
              onChangeText={(val) => onChangeUsername(val)}
              errorMessage={errorMessage}
              isMandatory
            />
            {!!errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <CustomTextInput
              label={intl.formatMessage({ id: "label.password" })}
              placeholder={intl.formatMessage({ id: "label.enterPassword" })}
              value={password}
              onChangeText={(val) => onChangePassword(val)}
              isMandatory
              eyeImage={true}
              isPassword={true}
            />
            <View style={styles.forgotPasswordView}>
              <Text style={styles.rememberMeText}>
                {intl.formatMessage({ id: "label.rememberMe" })}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onForgotPasswordClick();
                }}
              >
                <Text style={styles.forgotPasswordText}>
                  {intl.formatMessage({ id: "label.forgotPassword" })}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginButtonView}>
              <ButtonComponent
                title={intl.formatMessage({ id: "label.login" })}
                onPress={() => {
                  onLogin();
                }}
                disabled={loginDisabled}
              />
            </View>
            <View style={styles.accountView}>
              <Text style={styles.accountText}>
                {intl.formatMessage({ id: "label.account" })}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onCreateNewPasswordClick();
                }}
              >
                <Text style={styles.newAccountText}>
                  {intl.formatMessage({ id: "label.newAccount" })}
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

export default LoginScreenUI;
