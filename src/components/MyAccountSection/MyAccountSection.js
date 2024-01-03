import React from "react";
import { View, Image } from "@unthinkable/react-core-components";

import styles from "./MyAccountSection.style";
import MyAccountComponent from "../../views/MyAccount";

const MyAccountSection = ({}) => {
  return (
    <View style={styles.container}>
      <MyAccountComponent />
    </View>
  );
};

export default MyAccountSection;
