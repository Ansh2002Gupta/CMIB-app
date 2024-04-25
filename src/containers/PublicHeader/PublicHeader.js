import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import TouchableImage from "../../components/TouchableImage";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import getStyles from "./PublicHeader.style";

const PublicHeader = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isMobileView = currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const isWebView = currentBreakpoint !== "xs";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(navigations.LOGIN);
  };

  const getMainViewStyle = () => {
    if (isWebView) {
      return {
        ...styles.webResetMainView,
        ...styles.headerBorder,
        ...(isMobileView ? styles.mainView : styles.webMainView),
      };
    }
    return {
      ...styles.byDefaultPhonePadding,
      ...styles.mainView,
    };
  };

  const getContainerStyle = () => {
    if (isWebView) {
      return {
        ...styles.webResetContainerStyle,
        ...(isMobileView ? styles.smContainerStyle : styles.webContainerStyle),
      };
    }
    return {
      ...styles.byDefaultPhonePadding,
      ...styles.containerStyle,
    };
  };

  return (
    <View style={getMainViewStyle()}>
      <View style={getContainerStyle()}>
        <TouchableImage
          onPress={handleNavigate}
          parentStyle={styles.imagesContainer}
          resizeMode="contain"
          source={images.iconCmibLight}
          style={styles.cmibLogo}
          height={isWebView ? 55 : 40}
          width={isWebView ? 166 : 120}
        />
      </View>
    </View>
  );
};

export default PublicHeader;
