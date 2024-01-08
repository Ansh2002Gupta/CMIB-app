import React from "react";
import { View } from "@unthinkable/react-core-components";

const FormWrapper = ({ children, customFormStyle }) => {
  return <View style={customFormStyle}>{children}</View>;
};

export default FormWrapper;
