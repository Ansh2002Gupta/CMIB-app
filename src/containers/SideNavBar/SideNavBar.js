import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
} from "@unthinkable/react-core-components";

import SideBar from "../SideBar/SideBar";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./SideNavBar.style";

const SideNavBar = ({
  handleDisplayHeader,
  items,
  onClose,
  onPress,
  resetList,
  showCloseIcon,
}) => {
  const sideBarPosition = useRef(new Animated.Value(-300)).current;
  const { isWebView } = useIsWebView();

  useEffect(() => {
    Animated.timing(sideBarPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
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
        <SideBar
          handleDisplayHeader={handleDisplayHeader}
          items={items}
          onClose={onClose}
          onPress={onPress}
          resetList={resetList}
          showCloseIcon={showCloseIcon}
        />
      </Animated.View>
    </View>
  );
};

SideNavBar.propTypes = {
  handleDisplayHeader: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

export default SideNavBar;
