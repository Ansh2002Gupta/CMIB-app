import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { Button } from "@unthinkable/react-button";
import { View, TextInput } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import { AuthContext } from "../../globalContext/auth/authProvider";
import { AuthService, StorageService } from "./../../services";
import { setAuth } from "./../../globalContext/auth/authActions";
import { navigations } from "../../constants/routeNames";
import styles from "./loginForm.style";

function useLoginForm(
  initialState = { username: "user", password: "password" }
) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: initialState.username,
    password: initialState.password,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [, authDispatch] = useContext(AuthContext);
  const onClickSignUp = () => {
    navigate(navigations.DASHBOARD);
  };
  const onLogin = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    const response = await AuthService.login(formValues);
    await StorageService.set("auth", response);
    authDispatch(setAuth(response));
    setIsProcessing(false);
    navigate(navigations.DASHBOARD);
  };
  return {
    formValues,
    setFormValues,
    onLogin,
    isProcessing,
    onClickSignUp,
  };
}

function LoginForm(props) {
  const intl = useIntl();
  const { formValues, setFormValues, onLogin, isProcessing, onClickSignUp } =
    useLoginForm();
  const { username, password } = formValues || {};
  const isLoginActionDisabled =
    !username.trim() || !password.trim() || isProcessing;
  return (
    <View style={styles.container}>
      <View>
        <CommonText customTextStyle={styles.header}>
          {intl.formatMessage({ id: "label.welcome" })}
        </CommonText>
        <TextInput
          style={styles.input}
          placeholder={intl.formatMessage({ id: "label.username" })}
          onChangeText={(value) => {
            setFormValues((v) => {
              v.username = value;
              return { ...v };
            });
          }}
          value={username}
        />
        <TextInput
          type="password"
          style={styles.input}
          placeholder={intl.formatMessage({ id: "label.password" })}
          onChangeText={(value) => {
            setFormValues((v) => {
              v.password = value;
              return { ...v };
            });
          }}
          secureTextEntry={true}
          value={password}
        />
        <Button
          text={intl.formatMessage({ id: "label.login" })}
          onPress={() => {
            onLogin();
          }}
          disabled={isLoginActionDisabled}
          disabledContainerStyle={{ opacity: 0.5 }}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <Button
          text={intl.formatMessage({ id: "label.sign_up" })}
          onPress={() => {
            onClickSignUp();
          }}
          disabledContainerStyle={{ opacity: 0.5 }}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

export default LoginForm;
