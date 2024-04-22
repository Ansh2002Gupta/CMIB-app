import React from "react";
import { View } from "@unthinkable/react-core-components";

const CustomScrollView = React.forwardRef((props, ref) => {
  return <View ref={ref} {...props} />;
});

export default CustomScrollView;
