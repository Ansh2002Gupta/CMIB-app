import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import SideBarContentSection from "./SideBarContentSection";
import styles from "./SideBar.style";

const SideBar = ({ onClose, showCloseIcon }) => {
  return (
    <View style={styles.mainContainerWeb}>
      <SideBarContentSection onClose={onClose} showCloseIcon={showCloseIcon} />
    </View>
  );
};

SideBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBar;
