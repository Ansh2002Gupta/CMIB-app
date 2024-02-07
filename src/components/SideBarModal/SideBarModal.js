import React from "react";
import { Platform, View } from "@unthinkable/react-core-components";

import styles from "./SideBarModal.style";

const SidebarModal = ({
  children,
  style,
  isVisible,
  animationIn,
  animationOut,
}) => {
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
