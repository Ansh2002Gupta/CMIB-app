import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

const FormWrapper = ({ children, customFormStyle }) => {
  return <View style={customFormStyle}>{children}</View>;
};

FormWrapper.defaultProps = {
  customFormStyle: {},
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  customFormStyle: PropTypes.object,
}

export default FormWrapper;
