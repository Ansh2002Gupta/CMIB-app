import React from "react";
import PropTypes from "prop-types";

const FormWrapper = ({ children, customFormStyle, onSubmit }) => {
  return (
    <form style={customFormStyle} id="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

FormWrapper.defaultProps = {
  customFormStyle: {},
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  customFormStyle: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

export default FormWrapper;