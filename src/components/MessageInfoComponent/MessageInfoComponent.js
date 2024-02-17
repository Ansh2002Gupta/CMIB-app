import React, { useContext } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import styles from "./MessageInfoComponent.style";

const MessageInfoComponent = ({ message }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CommonText customTextStyle={styles.textSize(currentBreakpoint)}>
          {message}
        </CommonText>
      </View>
    </View>
  );
};

MessageInfoComponent.defaultProps = {
  assigneName: "",
  message: "",
};

MessageInfoComponent.propTypes = {
  assigneName: PropTypes.string,
  message: PropTypes.string,
};

export default MessageInfoComponent;
