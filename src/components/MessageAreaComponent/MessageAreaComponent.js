import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../CommonText";
import getStyles from "./MessageAreaComponent.style";

const MessageAreaComponent = ({ message, sender }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const windowDimensions = useWindowDimensions();
  const width1200orLess = windowDimensions.width <= 1200;
  const senderStyle = sender
    ? width1200orLess
      ? styles.smSenderMessageStyle
      : styles.senderMessageStyle
    : width1200orLess
    ? styles.smRecieverMessageStyle
    : styles.recieverMessageStyle;
  return (
    <>
      {!!message && (
        <CommonText
          customContainerStyle={senderStyle}
          customTextStyle={styles.textSize}
        >
          {message}
        </CommonText>
      )}
    </>
  );
};

MessageAreaComponent.defaultProps = {
  message: "",
  sender: "",
};

MessageAreaComponent.propTypes = {
  message: PropTypes.string,
  sender: PropTypes.string,
};

export default MessageAreaComponent;
