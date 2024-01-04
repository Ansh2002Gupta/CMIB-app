import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import styles from "./ErrorComponent.style";

const ErrorComponent = ({ errorMsg }) => {
  return (
    <View style={styles.containerStyle}>
      <Text>{errorMsg}</Text>
    </View>
  );
};

ErrorComponent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorComponent;
