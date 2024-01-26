import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../../components/CustomImage";
import TouchableImage from "../../components/TouchableImage";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./PublicHeader.style";

const PublicHeader = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const hideRightIcons =
    currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const isWebView = currentBreakpoint !== "xs";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(navigations.LOGIN);
  };

  return (
    <>
      {isWebView ? (
        <View
          style={{
            ...styles.webResetMainView,
            ...(hideRightIcons
              ? { ...styles.mainView, ...styles.headerBorder }
              : { ...styles.webMainView, ...styles.headerBorder }),
          }}
        >
          <View
            style={{
              ...styles.webResetContainerStyle,
              ...(hideRightIcons
                ? styles.smContainerStyle
                : styles.webContainerStyle),
            }}
          >
            <TouchableImage
              onPress={handleNavigate}
              parentStyle={styles.imagesContainer}
              resizeMode="contain"
              source={images.iconCmibLogo}
              style={styles.cmibLogo}
            />
            {!hideRightIcons && (
              <View style={styles.rightIconContainer}>
                <CustomImage
                  source={images.iconGloPac}
                  style={styles.gloPac}
                  resizeMode="contain"
                />
                <CustomImage
                  source={images.iconG20}
                  style={styles.iconG20}
                  resizeMode="contain"
                />
                <CustomImage
                  source={images.iconAzadiMahotsav}
                  style={styles.iconAzadiMahotsav}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.byDefaultPhonePadding,
            ...styles.mainView,
          }}
        >
          <View
            style={{
              ...styles.byDefaultPhonePadding,
              ...styles.containerStyle,
            }}
          >
            <CustomImage source={images.iconCmibLogo} style={styles.cmibLogo} />
          </View>
        </View>
      )}
    </>
  );
};

export default PublicHeader;
