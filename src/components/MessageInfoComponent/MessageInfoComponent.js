import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./MessageInfoComponent.style";

const MessageInfoComponent = ({ assigneName, message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CommonText fontWeight={"600"} customTextStyle={styles.textSize}>
          {assigneName}&nbsp;
        </CommonText>
        <CommonText customTextStyle={styles.textSize}>{message}</CommonText>
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
