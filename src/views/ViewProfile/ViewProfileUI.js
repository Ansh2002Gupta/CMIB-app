import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import ConfirmationModal from "../../containers/ConfirmationModal/ConfirmationModal";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import EditProfileImage from "../../containers/EditProfileImage";
import IconHeader from "../../components/IconHeader/IconHeader";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useDeleteUserAPI from "../../services/apiServices/hooks/UserProfile/useDeleteUserAPI";
import { useHeader } from "../../hooks/useHeader";
import images from "../../images";
import style from "./ViewProfile.style";
import PopupMessage from "../../components/PopupMessage/PopupMessage";

const ViewProfileUI = ({
  handleEditPopup,
  intl,
  onGoBack,
  showEditModal,
  userProfileDetails,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const { errorWhileDeletion, handleDeleteUser, setErrorWhileDeletion } =
    useDeleteUserAPI();
  const { onLogout } = useHeader();

  const profileImage = userProfileDetails?.profile_photo;
  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const mobileNumber = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;

  const details = [
    { label: "label.designation", value: designation },
    { label: "label.mobile_number", value: mobileNumber },
    { label: "label.email_id", value: email },
  ];

  const handleDismissToast = () => {
    setErrorWhileDeletion("");
    setErrorMessage("");
  };

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        showEditIcon
        name={name}
        profileImage={profileImage}
        onPressEditIcon={() => {
          handleEditPopup(true);
        }}
      />
    );
  };

  const handleDeletePopUp = () => {
    setShowDeletePopUp((prev) => !prev);
  };

  const dismissDeletionPopUp = () => {
    setShowDeleteAccountModal(false);
    setShowDeletePopUp(false);
  };

  return (
    <>
      <IconHeader
        hasIconBar
        headerText={intl.formatMessage({ id: "label.view_profile" })}
        intl={intl}
        onPressLeftIcon={onGoBack}
        mobActionButton={images.iconMore}
        handleButtonClick={() => {
          handleDeletePopUp();
        }}
        iconStyle={showDeletePopUp ? style.iconStyle : style.inActiveIconStyle}
      />
      {showDeletePopUp && (
        <PopupMessage
          message={intl.formatMessage({ id: "label.delete_account" })}
          onPopupClick={() => setShowDeleteAccountModal(true)}
        />
      )}
      {showDeleteAccountModal && (
        <ConfirmationModal
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.delete" })}
          buttonTwoStyle={style.buttonTwoStyle}
          buttonTwoTextStyle={style.buttonTwotextStyle}
          headingText={intl.formatMessage({ id: "label.delete_account" })}
          icon={images.iconAlert}
          loader={false}
          onPressButtonOne={dismissDeletionPopUp}
          onPressButtonTwo={() => {
            handleDeleteUser({
              successCallback: () => {
                onLogout({
                  message: intl.formatMessage({
                    id: "label.account_deletion",
                  }),
                  isLogoutToast: true,
                  isError: false,
                });
              },
              errorCallback: dismissDeletionPopUp,
            });
          }}
          subHeading={intl.formatMessage({ id: "label.delete_message" })}
        />
      )}
      <View style={style.picParentContainer}>
        <View style={style.picContainer}>{renderProfileIcon()}</View>
        {!!name && (
          <CommonText
            fontWeight="600"
            customContainerStyle={style.customContainerStyle}
            customTextStyle={style.customTextStyle}
          >
            {name}
          </CommonText>
        )}
        <CardComponent customStyle={style.cardStyle}>
          <DetailComponent details={details} />
        </CardComponent>
        {showEditModal && (
          <EditProfileImage
            name={name}
            profileImage={profileImage}
            onPressIconCross={() => {
              handleEditPopup(false);
            }}
          />
        )}
      </View>
      {!!(errorMessage || errorWhileDeletion) && (
        <ToastComponent
          toastMessage={errorMessage || errorWhileDeletion}
          onDismiss={handleDismissToast}
        />
      )}
    </>
  );
};

ViewProfileUI.defaultProps = {
  userProfileDetails: {},
};

ViewProfileUI.propTypes = {
  handleEditPopup: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
  userProfileDetails: PropTypes.object,
};

export default ViewProfileUI;
