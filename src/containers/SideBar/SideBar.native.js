import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native";

import styles from "./SideBar.style";
import SideBarContentSection from "./SideBarContentSection";

const SideBar = ({ onClose, listItems, resetList, showCloseIcon, items }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <SideBarContentSection
        items={items}
        onClose={onClose}
        listItems={listItems}
        resetList={resetList}
        showCloseIcon={showCloseIcon}
      />
    </SafeAreaView>
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
