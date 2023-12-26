import React from "react";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../../components/CustomImage/CustomImage";
import images from "../../images";
import styles from "./Footer.style";

const Footer = () => {
  const FooterIcon = images.iconFooter;

  return (
    <View style={styles.mainView}>
      <CustomImage
        Icon={FooterIcon}
        style={styles.imageStyle}
        source={FooterIcon}
        isSvg={true}
      />
    </View>
  );
};

export default Footer;
