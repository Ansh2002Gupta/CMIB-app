import React, { useEffect } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { TOAST_TIMEOUT } from "../../constants/constants";
import getStyles from "./ToastComponent.style";

const ToastComponent = (props) => {
  const theme = useTheme();
  const style = getStyles(theme);
  const { customToastStyle, duration, onDismiss, toastMessage } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <View style={[style.containerStyle, customToastStyle]}>
      <CommonText customTextStyle={style.textStyle}>{toastMessage} </CommonText>
    </View>
  );
};

ToastComponent.defaultProps = {
  customToastStyle: {},
  duration: TOAST_TIMEOUT,
  onDismiss: () => {},
};

ToastComponent.propTypes = {
  customToastStyle: PropTypes.object,
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
  toastMessage: PropTypes.string.isRequired,
};

export default ToastComponent;
