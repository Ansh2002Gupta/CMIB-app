import React from "react";
import { View } from "@unthinkable/react-core-components";

import styles from "./SideBarModal.style";

const SidebarModal = ({
  children,
  style,
  isVisible,
  animationIn,
  animationOut,
}) => {
  return (
    <View
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
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
