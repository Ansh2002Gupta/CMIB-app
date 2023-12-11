import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./loginHeader.style";
import images from "../../images";

const LoginHeaderContainer = ({ onPress }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerStyle}>
        <TouchableOpacity onPress={onPress}>
          <Image source={images.iconCmibLogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginHeaderContainer;
