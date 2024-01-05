import React from "react";
import { View } from "@unthinkable/react-core-components";

import MyAccountComponent from "../../views/MyAccount";
import styles from "./MyAccountSection.style";

const MyAccountSection = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <MyAccountComponent omitArrowIcon={true} />
      </View>
    </View>
  );
};

export default MyAccountSection;
