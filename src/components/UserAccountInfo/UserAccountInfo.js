import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Keyboard, Platform, View } from "@unthinkable/react-core-components";

import ChangePasswordModal from "../../containers/ChangePasswordModal";
import ConfirmationModal from "../../containers/ConfirmationModal/ConfirmationModal";
import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SessionBar from "../SessionBar";
import UserProfileActionDropDown from "../UserProfileActionDropDown/index";
import ViewProfileDetails from "../../containers/ViewProfile";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { useLocation, useNavigate } from "react-router";
import { navigations } from "../../constants/routeNames";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
  setShowViewProfileDetails,
} from "../../globalContext/userProfile/userProfileActions";
import commonStyles from "../../theme/styles/commonStyles";
import { useHeader } from "../../hooks/useHeader";
import images from "../../images";
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
  const navigate = useNavigate();
  const { pathname: currentRoute } = useLocation();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);

  const { isLoggingUserOut, onLogout } = useHeader();

  const { showChangePasswordModal, showLogoutModal, showViewProfileDetails } =
    userProfileDetails;
  const [isUpdateProfilePic, setIsUpdatePorfilePic] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";

  const keyboardDidHideCallback = () => {
    if (isIosPlatform) {
      setModalStyle({ ...styles.modalInnerContainer });
    }
  };

  const keyboardDidShowCallback = (e) => {
    const keyboardHeight = e?.endCoordinates?.height;
    if (isIosPlatform) {
      setModalStyle(commonStyles.largeModalContainer(keyboardHeight));
    }
  };

  useKeyboardShowHideListener({
    keyboardDidHideCallback,
    keyboardDidShowCallback,
  });

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
          customInnerContainerStyle={{
            ...styles.modalInnerContainer,
            ...modalStyle,
          }}
          headerTextStyle={styles.headerTextStyle}
          onBackdropPress={() => {
            userProfileDispatch(setShowChangePasswordModal(false));
          }}
        >
          <ChangePasswordModal
            onPressCancel={() => {
              Keyboard.dismiss();
              userProfileDispatch(setShowChangePasswordModal(false));
            }}
          />
        </CustomModal>
      ) : null}
      {showViewProfileDetails ? (
        <>
          {showDeleteAccountModal ? (
            <ConfirmationModal
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({ id: "label.delete" })}
              buttonTwoStyle={styles.buttonTwoStyle}
              buttonTwoTextStyle={styles.buttonTwotextStyle}
              headingText={intl.formatMessage({ id: "label.delete_account" })}
              icon={images.iconAlert}
              loader={false}
              onPressButtonOne={() => setShowDeleteAccountModal(false)}
              onPressButtonTwo={() => {
                //TODO: We'll integrate API for Delete account
              }}
              subHeading={intl.formatMessage({ id: "label.delete_message" })}
            />
          ) : (
            <CustomModal containerStyle={styles.containerStyle} maxWidth={"sm"}>
              <ViewProfileDetails
                onPressCross={() => {
                  if (currentRoute === navigations.VIEW_PROFILE) {
                    navigate(
                      `${selectedModule.key}/${navigations.MODULE_LANDING_PAGE}`
                    );
                  }
                  userProfileDispatch(setShowViewProfileDetails(false));
                }}
                onPressEditIcon={() => {
                  setIsUpdatePorfilePic(true);
                }}
                isUpdateProfilePic={isUpdateProfilePic}
                setShowDeleteAccountModal={setShowDeleteAccountModal}
              />
            </CustomModal>
          )}
        </>
      ) : null}
      {showLogoutModal && (
        <ConfirmationModal
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.logout" })}
          headingText={intl.formatMessage({ id: "label.logout" })}
          icon={images.iconWarning}
          loader={isLoggingUserOut}
          onPressButtonOne={() =>
            userProfileDispatch(setShowLogoutModal(false))
          }
          onPressButtonTwo={() => {
            onLogout({
              message: intl.formatMessage({ id: "label.logout_successfully" }),
              isLogoutToast: true,
              isError: false,
            });
          }}
          subHeading={intl.formatMessage({ id: "label.logout_message" })}
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
