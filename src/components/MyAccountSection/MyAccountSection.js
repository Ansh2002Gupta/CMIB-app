import React from "react";
import { View } from "@unthinkable/react-core-components";

import MyAccountComponent from "../../views/MyAccount";
import styles from "./MyAccountSection.style";

const MyAccountSection = ({}) => {
  return (
    <View style={styles.container}>
      <MyAccountComponent
        showArrow={false}
      />
    </View>
  );
};

export default MyAccountSection;
