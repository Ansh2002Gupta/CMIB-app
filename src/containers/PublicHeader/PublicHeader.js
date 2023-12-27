import React, { useContext } from "react";

import { MediaQueryContext } from "@unthinkable/react-theme";
import { View, Image } from "@unthinkable/react-core-components";

import images from "../../images";
import styles from "./PublicHeader.style";

const PublicHeader = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const hideRightIcons =
    currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const isWebView = currentBreakpoint !== "xs";

  return (
    <>
      {isWebView ? (
        <View
          style={
            hideRightIcons
              ? [styles.mainView, styles.headerBorder]
              : [styles.webMainView, styles.headerBorder]
          }
        >
          <View
            style={
              hideRightIcons
                ? styles.smContainerStyle
                : styles.webContainerStyle
            }
          >
            <Image
              source={images.iconCmibLogo}
              style={styles.cmibLogo}
              resizeMode="contain"
            />
            {!hideRightIcons && (
              <View style={styles.rightIconContainer}>
                <Image
                  source={images.iconGloPac}
                  style={styles.gloPac}
                  resizeMode="contain"
                />
                <Image
                  source={images.iconG20}
                  style={styles.iconG20}
                  resizeMode="contain"
                />
                <Image
                  source={images.iconAzadiMahotsav}
                  style={styles.azadiMahotsav}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.mainView}>
          <View style={styles.containerStyle}>
            <Image source={images.iconCmibLogo} />
          </View>
        </View>
      )}
    </>
  );
};

export default PublicHeader;
