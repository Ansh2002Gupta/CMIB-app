import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./ErrorComponent.style";

const ErrorComponent = ({ errorMsg }) => {
  return (
    <View style={styles.containerStyle}>
      <CommonText title={errorMsg} />
    </View>
  );
};

ErrorComponent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorComponent;
