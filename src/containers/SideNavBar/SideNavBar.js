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

const SideNavBar = ({ onClose, handleItemListRendering, items }) => {
  const sideBarPosition = useRef(new Animated.Value(-300)).current;
  const { isWebView } = useIsWebView();

  useEffect(() => {
    Animated.timing(sideBarPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
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
        <SideBar items={items} handleItemListRendering={handleItemListRendering} />
      </Animated.View>
    </>
  );
};

SideNavBar.propTypes = {
  onClose: PropTypes.func,
  handleItemListRendering: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default SideNavBar;
