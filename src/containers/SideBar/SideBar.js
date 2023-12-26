import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import styles from "./SideBar.style";
import SideBarContentSection from "./SideBarContentSection";

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
