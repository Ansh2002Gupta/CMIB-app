import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";

const CardComponent = (props) => {
  const { children } = props;
  return <View style={style.containerStyle}>{children}</View>;
};

CardComponent.propTypes = {
  children: PropTypes.object.isRequired,
};

export default CardComponent;
