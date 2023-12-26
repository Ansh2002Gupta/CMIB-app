import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native";

import styles from "./SideBar.style";
import SideBarContentSection from "./SideBarContentSection";

const SideBar = ({ onClose, showCloseIcon }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <SideBarContentSection onClose={onClose} showCloseIcon={showCloseIcon} />
    </SafeAreaView>
  );
};

SideBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBar;
