import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SessionBar from "../SessionBar";
import UserProfileActionDropDown from "../UserProfileActionDropDown/index";
import styles from "./UserAccountInfo.style";

const UserAccountInfo = ({
  firstName,
  isMdOrGreater,
  isWebView,
  lastName,
  onPressRightIcon,
  profileImage,
  rightIcon,
  role,
}) => {
  return (
    <>
      <View style={styles.notficationIconView}>
        {isWebView && <SessionBar />}
        <CustomTouchableOpacity onPress={onPressRightIcon}>
          <CustomImage source={rightIcon} style={styles.iconNotification} />
        </CustomTouchableOpacity>
        <UserProfileActionDropDown
          firstName={firstName}
          isMdOrGreater={isMdOrGreater}
          isWebView={isWebView}
          lastName={lastName}
          profileImage={profileImage}
          role={role}
        />
      </View>
    </>
  );
};

UserAccountInfo.defaultProps = {
  isWebView: false,
  lastName: "",
  profileImage: "",
  role: "",
};

UserAccountInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  isMdOrGreater: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool,
  lastName: PropTypes.string,
  onPressRightIcon: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
  rightIcon: PropTypes.string.isRequired,
  role: PropTypes.string,
};

export default UserAccountInfo;
