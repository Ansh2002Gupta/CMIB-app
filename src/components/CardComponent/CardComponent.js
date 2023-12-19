import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";

const CardComponent = ({ children, customStyle }) => {
  return <View style={[style.containerStyle, customStyle]}>{children}</View>;
};

CardComponent.defaultProps = {
  customStyle: {},
};

CardComponent.propTypes = {
  children: PropTypes.object.isRequired,
  customStyle: PropTypes.object,
};

export default CardComponent;
