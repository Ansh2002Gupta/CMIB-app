import React from "react";
import { View, Image } from "@unthinkable/react-core-components";

import images from "../../images";
import styles from "./commonHeader.style";

const CommonHeader = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerStyle}>
        <Image source={images.iconCmibLogo} />
      </View>
    </View>
  );
};

export default CommonHeader;
