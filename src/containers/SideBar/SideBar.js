import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import styles from "./SideBar.style";
import SideBarContentSection from "./SideBarContentSection";

const SideBar = ({ items, onClose, listItems, resetList, showCloseIcon }) => {
  return (
    <View style={styles.mainContainerWeb}>
      <SideBarContentSection
        items={items}
        onClose={onClose}
        listItems={listItems}
        resetList={resetList}
        showCloseIcon={showCloseIcon}
      />
    </View>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  listItems: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBar;
