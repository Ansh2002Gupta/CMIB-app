import React from "react";

const FormWrapper = ({ children, onSubmit }) => {
  console.log('onSubmit', onSubmit);
  return (
    <form id="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;