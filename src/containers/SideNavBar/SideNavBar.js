import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  TouchableWithoutFeedback,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { MediaQueryContext } from "@unthinkable/react-theme";

import SideBar from "../SideBar/index";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./SideNavBar.style";

const SideNavBar = ({
  onClose,

  showCloseIcon,
}) => {
  const { isWebView } = useIsWebView();
  const windowDimensions = useWindowDimensions();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <View style={[styles.container, isWebView ? styles.mainContainer : null]}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overLay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          ...(currentBreakpoint === "sm" ? styles.sideBarMd : styles.sideBar),
          ...(isWebView && windowDimensions.width >= 900
            ? styles.mainContainer
            : {}),
        }}
      >
        <SideBar onClose={onClose} showCloseIcon={showCloseIcon} />
      </View>
    </View>
  );
};

SideNavBar.propTypes = {
  onClose: PropTypes.func,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideNavBar;
