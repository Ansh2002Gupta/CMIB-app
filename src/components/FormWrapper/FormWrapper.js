import React from "react";
import PropTypes from "prop-types";

const FormWrapper = ({ children, customFormStyle, onSubmit }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form style={customFormStyle} id="form" onSubmit={submitHandler}>
      {children}
    </form>
  );
};

FormWrapper.defaultProps = {
  customFormStyle: {},
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  customFormStyle: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default FormWrapper;
