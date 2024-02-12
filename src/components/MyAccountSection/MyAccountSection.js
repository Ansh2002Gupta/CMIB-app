import React from "react";
import { View } from "@unthinkable/react-core-components";

import MyAccountComponent from "../../views/MyAccount";
import styles from "./MyAccountSection.style";

const MyAccountSection = ({ setShowAccountSection }) => {
  return (
    <View style={styles.container}>
      <MyAccountComponent
        omitArrowIcon
        setShowAccountSection={setShowAccountSection}
      />
    </View>
  );
};

export default MyAccountSection;
