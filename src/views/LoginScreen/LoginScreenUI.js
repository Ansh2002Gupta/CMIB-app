import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./Loginscreen.style";
import HeaderName from "../../components/HeaderName";
import HeaderText from "../../components/HeaderText/HeaderText";
import CustomTextInput from "../../components/CustomTextInput";
import CustomLoginButton from "../../components/CustomLoginButton";
import HeaderImage from "../../components/HeaderImage";
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
  } = props;

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <HeaderImage
          image1={icons.cmibImage}
          image2={icons.cmibText}
          text={intl.formatMessage({ id: "label.fullName" })}
        />
        <View style={styles.headerTextView}>
          <HeaderText text={intl.formatMessage({ id: "label.cmib" })} />
        </View>
        <View style={styles.headerNameView}>
          <HeaderName text={intl.formatMessage({ id: "label.cmibText" })} />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.topTabs}
            onPress={() => toggleUser(false)}
          >
            <Text style={styles.topTabsText}>
              {intl.formatMessage({ id: "label.member_candidate_button" })}
            </Text>
            <View style={!active ? styles.inActiveStyle : styles.activeStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topTabs}
            onPress={() => toggleUser(true)}
          >
            <View style={{}}>
              <Text style={styles.topTabsText}>
                {intl.formatMessage({ id: "label.company_button" })}
              </Text>
            </View>
            <View style={active ? styles.inActiveStyle : styles.activeStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.borderStyle} />
      </View>
      {active ? (
        <>
          <View style={styles.companyView}>
            <View style={styles.firstTextInput}>
              <CustomTextInput
                label={intl.formatMessage({ id: "label.username" })}
                placeholder={intl.formatMessage({ id: "label.enterEmail" })}
                value={userName}
                onChangeText={(val) => onChangeUsername(val)}
                errorMessage={errorMessage}
              />
              {!!errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>
            <View style={styles.secoundTextInput}>
              <CustomTextInput
                label={intl.formatMessage({ id: "label.password" })}
                placeholder={intl.formatMessage({ id: "label.enterPassword" })}
                value={password}
                onChangeText={(val) => onChangePassword(val)}
                eyeImage={true}
                isPassword={true}
              />
            </View>
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
              <CustomLoginButton
                label={intl.formatMessage({ id: "label.login" })}
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
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.newAccountText}>
                  {intl.formatMessage({ id: "label.newAccount" })}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.followUsImageView}>
              <FollowUsIcons />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default LoginScreenUI;
