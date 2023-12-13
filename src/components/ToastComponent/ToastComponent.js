import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { toastTimeout } from "../../constants/constants";
import style from "./ToastComponent.style";

const ToastComponent = (props) => {
  const { duration = toastTimeout, onDismiss, toastMessage } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <View style={style.containerStyle}>
      <CommonText customTextStyle={style.textStyle} title={toastMessage} />
    </View>
  );
};

ToastComponent.propTypes = {
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
  toastMessage: PropTypes.string.isRequired,
};

export default ToastComponent;
