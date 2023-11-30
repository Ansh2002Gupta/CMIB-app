import React from "react";
import { View, Image } from "@unthinkable/react-core-components";
import styles from "./loginHeader.style";
import images from "../../images";

const LoginHeader = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerStyle}>
        <Image source={images.iconCmibLogo} />
      </View>
    </View>
  );
};

export default LoginHeader;
