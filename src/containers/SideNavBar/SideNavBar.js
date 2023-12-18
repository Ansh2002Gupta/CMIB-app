import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
} from "@unthinkable/react-core-components";

import SideBar from "../../components/SideBar/SideBar";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./SideNavBar.style";

const SideNavBar = ({ onClose, items, onPress }) => {
  const sideBarPosition = useRef(new Animated.Value(-300)).current;
  const { isWebView } = useIsWebView();

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
    <View style={[styles.container, isWebView ? styles.mainContainer : null]}>
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
          ...(isWebView ? styles.mainContainer : {}),
          transform: [{ translateX: sideBarPosition }],
        }}
      >
        <SideBar items={items} onPress={onPress} />
      </Animated.View>
    </View>
  );
};

SideNavBar.propTypes = {
  onClose: PropTypes.func,
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SideNavBar;
