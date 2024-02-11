import React, { useState } from "react";
import PropTypes from "prop-types";
import {Modal, TouchableOpacity, TouchableWithoutFeedback,View } from "@unthinkable/react-core-components";
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
  const { errorWhileDeletion, handleDeleteUser, isLoading } =
    useDeleteUserAPI();
  const { onLogout } = useHeader();

  const profileImage = userProfileDetails?.profile_photo;
  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const code = userProfileDetails?.mobile_country_code;
  const mobileNumber = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;

  const details = [
    { label: "label.designation", value: designation },
    { label: "label.mobile_number", value: code + "-" + mobileNumber },
    { label: "label.email_id", value: email },
  ];

  const handleDismissToast = () => {
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


  // Function to hide the modal
  const hideModal = () => {
    setShowDeletePopUp(false);
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
        // <TouchableOpacity
        //   style={style.deletetextContainer}
        //   onPress={() => {
        //     setShowDeleteAccountModal(true);
        //   }}
        // >
        //   <CommonText customTextStyle={style.deletetext}>
        //     {intl.formatMessage({ id: "label.delete_account" })}
        //   </CommonText>
        // </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={showDeletePopUp}
        onRequestClose={hideModal}
      >
         <TouchableWithoutFeedback onPress={hideModal}>
          <View style={style.modalOverlay} />
        </TouchableWithoutFeedback>
        <TouchableOpacity style={style.deletetextContainer} onPress={()=>{setShowDeleteAccountModal(true)}}>
        <CommonText customTextStyle={style.deletetext}>
             {intl.formatMessage({ id: "label.delete_account" })}
           </CommonText>
        </TouchableOpacity>
       
      </Modal>
      )}
      {showDeleteAccountModal && (
        <ConfirmationModal
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={
            errorWhileDeletion
              ? intl.formatMessage({ id: "label.retry" })
              : intl.formatMessage({ id: "label.delete" })
          }
          buttonTwoStyle={style.buttonTwoStyle}
          buttonTwoTextStyle={style.buttonTwotextStyle}
          headingText={
            errorWhileDeletion
              ? intl.formatMessage({ id: "label.unable_to_delete" })
              : intl.formatMessage({ id: "label.delete_account" })
          }
          icon={images.iconAlert}
          loader={isLoading}
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
            });
          }}
          subHeading={
            errorWhileDeletion
              ? errorWhileDeletion
              : intl.formatMessage({ id: "label.delete_message" })
          }
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
      {!!errorMessage && (
        <ToastComponent
          toastMessage={errorMessage}
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
