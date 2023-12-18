import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";

const CardComponent = (props) => {
  const { children, customStyle } = props;
  return <View style={[style.containerStyle, customStyle]}>{children}</View>;
};

CardComponent.propTypes = {
  children: PropTypes.object.isRequired,
  customStyle: PropTypes.object,
};

export default CardComponent;
