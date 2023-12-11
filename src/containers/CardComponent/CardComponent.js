import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";

const CardCaomponent = (props) => {
  const { children, customCardComponentStyle } = props;
  return (
    <View style={[style.containerStyle, customCardComponentStyle]}>
      {children}
    </View>
  );
};

CardCaomponent.propTypes = {
  children: PropTypes.object.isRequired,
  customCardComponentStyle: PropTypes.object,
};

export default CardCaomponent;
