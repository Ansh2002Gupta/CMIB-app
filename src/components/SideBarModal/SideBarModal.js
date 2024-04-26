import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import getStyles from "./SideBarModal.style";

const SidebarModal = ({
  children,
  style,
  isVisible,
  animationIn,
  animationOut,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      isVisible: isVisible,
      animationIn: animationIn,
      animationOut: animationOut,
    },
  });

  return (
    <View
      {...platformSpecificProps}
      style={{
        ...styles.mainViewStyle,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default SidebarModal;
