import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Keyboard, Platform, View } from "@unthinkable/react-core-components";
import { useLocation, useNavigate } from "react-router";

import ChangePasswordModal from "../../containers/ChangePasswordModal";
import ConfirmationModal from "../../containers/ConfirmationModal/ConfirmationModal";
import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import EditProfileImage from "../../containers/EditProfileImage";
import SessionBar from "../SessionBar";
import useDeleteUserAPI from "../../services/apiServices/hooks/UserProfile/useDeleteUserAPI";
import useIsWebView from "../../hooks/useIsWebView";
import UserProfileActionDropDown from "../UserProfileActionDropDown/index";
import ViewProfileDetails from "../../containers/ViewProfile";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { navigations } from "../../constants/routeNames";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
  setShowViewProfileDetails,
} from "../../globalContext/userProfile/userProfileActions";
import { useHeader } from "../../hooks/useHeader";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./UserAccountInfo.style";

const UserAccountInfo = ({ isMdOrGreater, onPressRightIcon, rightIcon }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { pathname: currentRoute } = useLocation();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const { errorWhileDeletion, handleDeleteUser, isLoading } =
    useDeleteUserAPI();
  const { isWebView } = useIsWebView();

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);

  const { isLoggingUserOut, onLogout } = useHeader();

  const { showChangePasswordModal, showLogoutModal, showViewProfileDetails } =
    userProfileDetails;
  const [isUpdateProfilePic, setIsUpdateProfilePic] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";

  const userInfo = userProfileDetails?.userDetails;

  const profileImage = userInfo?.profile_photo || "";
  const name = userInfo?.name || "";
  const role = userInfo?.user_type || "";

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

  const onPressClose = () => {
    if (currentRoute === navigations.VIEW_PROFILE) {
      navigate(`${selectedModule.key}/${navigations.MODULE_LANDING_PAGE}`);
    }
    userProfileDispatch(setShowViewProfileDetails(false));
  };

  const renderChangePasswordModal = () => {
    return (
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
    );
  };

  const renderViewProfileDetails = () => {
    if (showDeleteAccountModal) {
      return (
        <ConfirmationModal
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={
            errorWhileDeletion
              ? intl.formatMessage({ id: "label.retry" })
              : intl.formatMessage({ id: "label.delete" })
          }
          buttonOneStyle={isLoading ? styles.disableStyle : {}}
          buttonTwoStyle={styles.buttonTwoStyle}
          buttonTwoTextStyle={styles.buttonTwotextStyle}
          headingText={
            errorWhileDeletion
              ? intl.formatMessage({ id: "label.unable_to_delete" })
              : intl.formatMessage({ id: "label.delete_account" })
          }
          icon={images.iconAlert}
          loader={isLoading}
          onPressButtonOne={
            isLoading ? () => {} : () => setShowDeleteAccountModal(false)
          }
          onPressButtonTwo={() => {
            handleDeleteUser({
              successCallback: async () => {
                onLogout(
                  {
                    message: intl.formatMessage({
                      id: "label.account_deletion",
                    }),
                    isLogoutToast: true,
                    isError: false,
                  },
                  true
                );
              },
            });
          }}
          subHeading={
            errorWhileDeletion
              ? errorWhileDeletion
              : intl.formatMessage({ id: "label.delete_message" })
          }
        />
      );
    }

    if (isUpdateProfilePic) {
      return (
        <EditProfileImage
          name={name}
          profileImage={profileImage}
          onPressIconCross={() => setIsUpdateProfilePic(false)}
        />
      );
    }

    return (
      <CustomModal
        containerStyle={styles.containerStyle}
        maxWidth={"sm"}
        onPressIconCross={onPressClose}
      >
        <ViewProfileDetails
          onPressCross={onPressClose}
          onPressEditIcon={() => {
            setIsUpdateProfilePic(true);
          }}
          isUpdateProfilePic={isUpdateProfilePic}
          userProfileDetails={userProfileDetails?.userDetails}
          setShowDeleteAccountModal={setShowDeleteAccountModal}
        />
      </CustomModal>
    );
  };

  return (
    <>
      <View style={styles.notficationIconView}>
        {isWebView && <SessionBar />}
        <CustomTouchableOpacity onPress={onPressRightIcon}>
          <CustomImage source={rightIcon} style={styles.iconNotification} />
        </CustomTouchableOpacity>
        <UserProfileActionDropDown
          {...{
            name,
            isMdOrGreater,
            isWebView,
            profileImage,
            role,
          }}
        />
      </View>
      {showChangePasswordModal && renderChangePasswordModal()}
      {showViewProfileDetails && renderViewProfileDetails()}
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

UserAccountInfo.propTypes = {
  isMdOrGreater: PropTypes.bool.isRequired,
  onPressRightIcon: PropTypes.func.isRequired,
  rightIcon: PropTypes.string.isRequired,
};

export default UserAccountInfo;
