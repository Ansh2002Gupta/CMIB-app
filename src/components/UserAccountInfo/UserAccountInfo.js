import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import ChangePasswordModal from "../../containers/ChangePasswordModal";
import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import LogoutModal from "../../containers/LogoutModal/LogoutModal";
import SessionBar from "../SessionBar";
import UserProfileActionDropDown from "../UserProfileActionDropDown/index";
import ViewProfileModal from "../../containers/ViewProfileModal";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
  setShowViewProfileModal,
} from "../../globalContext/userProfile/userProfileActions";
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
  const intl = useIntl();
  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);

  const { showChangePasswordModal, showLogoutModal, showViewProfileModal } =
    userProfileDetails;

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
      {showChangePasswordModal ? (
        <CustomModal
          headerText={intl.formatMessage({
            id: "label.change_password",
          })}
          customInnerContainerStyle={styles.innerContainerStyle}
          headerTextStyle={styles.headerTextStyle}
        >
          <ChangePasswordModal
            onPressCancel={() =>
              userProfileDispatch(setShowChangePasswordModal(false))
            }
          />
        </CustomModal>
      ) : null}
      {showViewProfileModal ? (
        <CustomModal containerStyle={styles.containerStyle}>
          <ViewProfileModal
            onPressCancel={() =>
              userProfileDispatch(setShowViewProfileModal(false))
            }
          />
        </CustomModal>
      ) : null}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => userProfileDispatch(setShowLogoutModal(false))}
        />
      )}
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
