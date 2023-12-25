import React, { useContext, useMemo } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import CustomAvatar from "../../components/CustomAvatar";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({ toggleSideBar, menuIconVisible }) => {
  const { isWebView } = useIsWebView();
  const windowDimensions = useWindowDimensions();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  //TODO: Replace this dummy data with api data.
  const profileImage = "";
  const firstName = "Elongated";
  const lastName = "Mask";
  const role = "Admin";

  const borderBottomStyles =
    currentBreakpoint === "xs" ? {} : styles.borderStyling;

  const isMdOrGreater = useMemo(
    () => windowDimensions.width >= 900,
    [windowDimensions.width]
  );

  return (
    <>
      {isWebView ? (
        <View style={[styles.webContainer, borderBottomStyles]}>
          <View style={styles.textContainer}>
            {currentBreakpoint === "sm" && menuIconVisible ? (
              <TouchableOpacity onPress={toggleSideBar} style={styles.menuButton}>
                <Image source={images.iconMenu} />
              </TouchableOpacity>
            ) : null}
            <CommonText
              customTextStyle={styles.nameText}
              title={"Hey John -"}
            />
            <CommonText
              customTextStyle={styles.overView}
              title={"here’s your overview"}
            />
          </View>

          <View style={styles.notficationIconView}>
            <Image
              source={images.iconNotification}
              style={styles.iconNotification}
            />
            <View style={styles.profileView}>
              <CustomAvatar
                image={profileImage}
                text={`${firstName} ${lastName}`}
              />
              {isMdOrGreater && (
                <View style={styles.profileNameSection}>
                  <View>
                    <CommonText
                      customTextStyle={styles.fullNameStyle}
                      title={`${firstName} ${lastName}`}
                    />
                    <CommonText
                      title={role}
                      customTextStyle={styles.roleStyle}
                    />
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={images.iconArrowDown2}
                      style={styles.iconArrow}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            !menuIconVisible ? styles.sideBarVisible : styles.sideBarNotVisible,
          ]}
        >
          {menuIconVisible && (
            <TouchableOpacity
              onPress={toggleSideBar}
            >
              <Image source={images.iconMenu} />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Image source={images.iconNotification} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PrivateHeader;
