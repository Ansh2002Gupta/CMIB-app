import React from "react";

import CustomImage from "../../components/CustomImage/CustomImage";
import images from "../../images";
import styles from "./Footer.style";

const Footer = () => {
  const FooterIcon = images.iconFooter;

  return (
    <CustomImage
      Icon={FooterIcon}
      style={styles.imageStyle}
      source={FooterIcon}
      isSvg
    />
  );
};

export default Footer;
