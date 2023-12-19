import React, { useContext, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({ onPress, showCloseIcon }) => {
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [menuIconVisible, setMenuIconVisible] = useState(true);

  //TODO: Replace this dummy data with api data.
  const profileImage = "";
  const firstName = "Elongated";
  const lastName = "Mask";
  const role = "Admin";

  const renderProfileIcon = () => {
    if (profileImage) {
      return (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      );
    } else {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
      return (
        <View style={styles.profileTextView}>
          <View style={styles.initialsContainer}>
            <CommonText
              customTextStyle={styles.initialsText}
              title={initials}
            />
          </View>
        </View>
      );
    }
  };

  const borderBottomStyles =
    currentBreakpoint === "xs" ? {} : styles.borderStyling;

  return (
    <>
      {isWebView ? (
        <View style={[styles.webContainer, borderBottomStyles]}>
          <View style={styles.textContainer}>
            {currentBreakpoint === "sm" && menuIconVisible ? (
              <TouchableOpacity
                onPress={() => {
                  onPress();
                  setMenuIconVisible(false);
                }}
                style={styles.menuButton}
              >
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
              {renderProfileIcon()}
              <View>
                <CommonText
                  customTextStyle={styles.fullNameStyle}
                  title={`${firstName} ${lastName}`}
                />
                <CommonText title={role} customTextStyle={styles.roleStyle} />
              </View>
            </View>
            <TouchableOpacity>
              <Image source={images.iconArrowDown2} style={styles.iconArrow} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              showCloseIcon();
              onPress();
            }}
          >
            <Image source={images.iconMenu} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.iconNotification} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PrivateHeader;
