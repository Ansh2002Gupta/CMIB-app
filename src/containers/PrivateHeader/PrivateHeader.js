import React from "react";
import { useLocation } from "react-router";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import CustomAvatar from "../../components/CustomAvatar";
import useIsWebView from "../../hooks/useIsWebView";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  leftIcon,
  rightIcon,
}) => {
  const { isWebView } = useIsWebView();
  const location = useLocation();
  const windowDimensions = useWindowDimensions();

  const profileImage = "";
  const firstName = "Elongated";
  const lastName = "Mask";
  const role = "Admin";

  const isMdOrGreater = windowDimensions.width >= 900;

  return (
    <>
      <View style={styles.webContainer}>
        <View style={styles.textContainer}>
          <HeaderLeft
            onPressLeftIcon={onPressLeftIcon}
            isMdOrGreater={isMdOrGreater}
            leftIcon={leftIcon}
          />
          {/*TODO: Right Now It's a static data, we will replace it by dynamic data as we get API */}
          {location.pathname === navigations.DASHBOARD && (
            <>
              <CommonText
                customTextStyle={styles.nameText}
                title={"Hey John -"}
              />
              <CommonText
                customTextStyle={styles.overView}
                title={"here’s your overview"}
              />
            </>
          )}
        </View>
        <HeaderRight
          onPressRightIcon={onPressRightIcon}
          rightIcon={rightIcon}
          isWebView={isWebView}
          profileImage={profileImage}
          firstName={firstName}
          lastName={lastName}
          role={role}
          isMdOrGreater={isMdOrGreater}
        />
      </View>
    </>
  );
};

const HeaderLeft = ({ onPressLeftIcon, isMdOrGreater, leftIcon }) => {
  if (!isMdOrGreater) {
    return (
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image source={leftIcon} style={styles.icons} />
      </TouchableOpacity>
    );
  }
  return null;
};

const HeaderRight = ({
  onPressRightIcon,
  rightIcon,
  isWebView,
  profileImage,
  firstName,
  lastName,
  role,
  isMdOrGreater,
}) => (
  <View style={styles.notficationIconView}>
    <TouchableOpacity onPress={onPressRightIcon}>
      <Image source={rightIcon} style={styles.iconNotification} />
    </TouchableOpacity>
    {isWebView && (
      <View style={styles.profileView}>
        <CustomAvatar image={profileImage} text={`${firstName} ${lastName}`} />
        {isMdOrGreater && (
          <View style={styles.profileNameSection}>
            <View>
              <CommonText
                customTextStyle={styles.fullNameStyle}
                title={`${firstName} ${lastName}`}
              />
              <CommonText title={role} customTextStyle={styles.roleStyle} />
            </View>
            <TouchableOpacity>
              <Image source={images.iconArrowDown2} style={styles.iconArrow} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )}
  </View>
);

export default PrivateHeader;
