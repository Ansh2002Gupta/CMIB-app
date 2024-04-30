import React from "react";
import { useTheme } from "@unthinkable/react-theme";

import CustomImage from "../../components/CustomImage/CustomImage";
import images from "../../images";
import getStyles from "./Footer.style";

const Footer = () => {
  const FooterIcon = images.iconFooter;
  const theme = useTheme();
  const styles = getStyles(theme);

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
