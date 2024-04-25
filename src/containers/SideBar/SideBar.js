import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import SideBarContentSection from "./SideBarContentSection";
import getStyles from "./SideBar.style";

const SideBar = ({ onClose, showCloseIcon }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
