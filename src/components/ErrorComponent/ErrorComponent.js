import React from "react";
import { Text, View } from "@unthinkable/react-core-components";

const ErrorComponent = ({ errorMsg }) => {
  return (
    <View>
      <Text>{errorMsg}</Text>
    </View>
  );
};

ErrorComponent.propTypes = {
  headerText: ErrorComponent.string.isRequired,
};

export default ErrorComponent;
