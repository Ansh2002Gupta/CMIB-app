import React from "react";

const FormWrapper = ({ children, onSubmit, customFormStyle }) => {
  return (
    <form style={customFormStyle} id="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;