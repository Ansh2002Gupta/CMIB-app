import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
} from "@unthinkable/react-core-components";

import SideBar from "../../components/SideBar/SideBar";
import styles from "./SideNavBar.style";

const SideNavBar = ({ onClose, items, onPress }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  const sideBarPosition = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(sideBarPosition, {
      toValue: 0, // Animate to 0 to bring it into view
      duration: 200, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [sideBarPosition]);

  const handleCloseSidebar = () => {
    Animated.timing(sideBarPosition, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
    onClose();
  };

  return (
    <>
      {isWebView ? (
        <></>
      ) : (
        <TouchableWithoutFeedback onPress={handleCloseSidebar}>
          <View style={styles.overLay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={{
          ...styles.sideBar,
          transform: [{ translateX: sideBarPosition }],
        }}
      >
        <SideBar items={items} onPress={onPress} />
      </Animated.View>
    </>
  );
};

SideNavBar.propTypes = {
  onClose: PropTypes.func,
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SideNavBar;
