import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { TOAST_TIMEOUT } from "../../constants/constants";
import style from "./ToastComponent.style";

const ToastComponent = (props) => {
  const {
    customToastStyle,
    duration = TOAST_TIMEOUT,
    onDismiss,
    toastMessage,
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <View style={[style.containerStyle, customToastStyle]}>
      <CommonText customTextStyle={style.textStyle} title={toastMessage} />
    </View>
  );
};

ToastComponent.propTypes = {
  customToastStyle: PropTypes.object,
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
  toastMessage: PropTypes.string.isRequired,
};

export default ToastComponent;
