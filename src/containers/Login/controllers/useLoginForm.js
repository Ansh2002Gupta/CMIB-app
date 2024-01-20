import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import useNavigateScreen from "../../../services/hooks/useNavigateScreen";
import useLoginUser from "../../../services/apiServices/hooks/useLoginUser";
import { validateEmail } from "../../../utils/validation";
import { navigations } from "../../../constants/routeNames";

const useLoginForm = () => {
  const navigate = useNavigateScreen();
  const intl = useIntl();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const { handleUserLogin, isLoading, errorWhileLoggingIn } = useLoginUser();

  const [options, setOptions] = useState([
    {
      title: intl.formatMessage({ id: "label.remember_me" }),
      isSelected: false,
      id: 1,
    },
  ]);

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
  };

  const onForgotPasswordClick = async () => {
    navigate(navigations.FORGOT_PASSWORD);
  };

  const onCreateNewPasswordClick = async () => {
    navigate(navigations.SIGN_UP);
  };

  const toggleUser = (val) => {
    setActive(val);
  };

  const onLogin = () => {
    let error = validateEmail(userName);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      handleUserLogin({ email: userName, password: password });
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    setErrorMessage("");
  };

  const onChangeUsername = (val) => {
    setuserName(val);
    setErrorMessage("");
  };

  useEffect(() => {
    if (userName !== "" && password !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userName, password]);

  return {
    active,
    errorMessage,
    loginDisabled,
    isLoading,
    errorWhileLoggingIn,
    handleToggle,
    onForgotPasswordClick,
    onCreateNewPasswordClick,
    toggleUser,
    onLogin,
    onChangePassword,
    onChangeUsername,
    options,
    password,
    userName,
  };
};

export default useLoginForm;
