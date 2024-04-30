import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import style from "./CardComponent.style";
import getStyles from "./CardComponent.style";

const CardComponent = ({ children, className, customStyle }) => {
  const theme = useTheme();
  const style = getStyles(theme);
  const webProps = Platform.OS.toLowerCase() === "web" ? { className } : {};

  return (
    <View style={[style.containerStyle, customStyle]} {...webProps}>
      {children}
    </View>
  );
};

CardComponent.defaultProps = {
  customStyle: {},
};

CardComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.string,
  customStyle: PropTypes.object,
};

export default CardComponent;
