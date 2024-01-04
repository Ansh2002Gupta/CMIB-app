import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

const ErrorComponent = ({ errorMsg }) => {
  return (
    <View>
      <Text>{errorMsg}</Text>
    </View>
  );
};

ErrorComponent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorComponent;
