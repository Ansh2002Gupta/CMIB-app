import React, {useState, useContext} from 'react';
import {useIntl} from 'react-intl';
import {Button} from '@unthinkable/react-button';
import {View, Text, TextInput} from '@unthinkable/react-core-components';

import {AuthContext} from '../../globalContext/auth/authProvider';
import {setAuth} from './../../globalContext/auth/authActions';
import {useNavigate} from '../../routes';
import {AuthService, StorageService} from './../../services';

import styles from './loginForm.style';

function useLoginForm(initialState = {username: 'user', password: 'password'}) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: initialState.username,
    password: initialState.password,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [, authDispatch] = useContext(AuthContext);
  const onLogin = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    const response = await AuthService.login(formValues);
    await StorageService.set('auth', response);
    authDispatch(setAuth(response));
    setIsProcessing(false);
    navigate('/');
  };
  return {
    formValues,
    setFormValues,
    onLogin,
    isProcessing,
  };
}

function LoginForm(props) {
  const intl = useIntl();
  const {formValues, setFormValues, onLogin, isProcessing} = useLoginForm();
  const {username, password} = formValues || {};
  const isLoginActionDisabled =
    !username.trim() || !password.trim() || isProcessing;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>
          {intl.formatMessage({id: 'label.welcome'})}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={intl.formatMessage({id: 'label.username'})}
          onChangeText={value => {
            setFormValues(v => {
              v.username = value;
              return {...v};
            });
          }}
          value={username}
        />
        <TextInput
          type="password"
          style={styles.input}
          placeholder={intl.formatMessage({id: 'label.password'})}
          onChangeText={value => {
            setFormValues(v => {
              v.password = value;
              return {...v};
            });
          }}
          secureTextEntry={true}
          value={password}
        />
        <Button
          text={intl.formatMessage({id: 'label.login'})}
          onPress={() => {
            onLogin();
          }}
          disabled={isLoginActionDisabled}
          disabledContainerStyle={{opacity: 0.5}}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

export default LoginForm;
