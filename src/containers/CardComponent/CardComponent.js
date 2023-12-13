import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";

const CardComponent = ({ children, customCardComponentStyle }) => {
  return (
    <View style={[style.containerStyle, customCardComponentStyle]}>
      {children}
    </View>
  );
};

CardComponent.propTypes = {
  children: PropTypes.object.isRequired,
  customCardComponentStyle: PropTypes.object,
};

export default CardComponent;
