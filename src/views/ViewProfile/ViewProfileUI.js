import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import ConfirmationModal from "../../containers/ConfirmationModal/ConfirmationModal";
import CustomModal from "../../components/CustomModal/CustomModal";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import ImagePicker from "../../components/ImagePickerComponent/ImagePickerComponent";
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
  const [photoEditFlag, setPhotoEditFlag] = useState(false);
  const [profileImage, setProfileImage] = useState(
    userProfileDetails?.profile_photo
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const { errorWhileDeletion, handleDeleteUser, setErrorWhileDeletion } =
    useDeleteUserAPI();
  const { onLogout } = useHeader();

  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const mobileNumber = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;

  const details = [
    { label: "label.designation", value: designation },
    { label: "label.mobile_number", value: mobileNumber },
    { label: "label.email_id", value: email },
  ];
  const buttonTitle = profileImage
    ? intl.formatMessage({ id: "label.change" })
    : intl.formatMessage({ id: "label.add" });

  useEffect(() => {
    if (!showEditModal) {
      setPhotoEditFlag(false);
    }
  }, [showEditModal]);

  const handleDismissToast = () => {
    setErrorWhileDeletion("");
    setErrorMessage("");
  };

  const renderProfileIcon = (useCustomContainerStyle = false) => {
    return (
      <ProfileIcon
        showEditIcon={!useCustomContainerStyle}
        customContainerStyle={
          useCustomContainerStyle ? style.editProfileContainer : {}
        }
        customImageStyle={
          useCustomContainerStyle ? style.modalProfileImage : {}
        }
        name={name}
        profileImage={profileImage}
        onPressEditIcon={() => {
          handleEditPopup(true);
        }}
      />
    );
  };

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        setProfileImage(image?.sourceURL || image?.path);
        setPhotoEditFlag(true);
      }
    } catch (error) {
      //TODO: Replace this error log with a toast which has been created by Kashish.
      setErrorMessage(error);
    }
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
        <TouchableOpacity
          style={style.deletetextContainer}
          onPress={() => {
            setShowDeleteAccountModal(true);
          }}
        >
          <CommonText customTextStyle={style.deletetext}>
            {intl.formatMessage({ id: "label.delete_account" })}
          </CommonText>
        </TouchableOpacity>
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
        <View style={style.picContainer}>
          {renderProfileIcon()}
          <TouchableOpacity
            style={style.iconEditStyle}
            onPress={() => {
              handleEditPopup(true);
            }}
          >
            <Image source={images.iconEdit} style={style.editIcon} />
          </TouchableOpacity>
        </View>
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
          <CustomModal
            headerText={intl.formatMessage({
              id: "label.edit_profile_picture",
            })}
            isIconCross
            onPressIconCross={() => {
              handleEditPopup(false);
            }}
          >
            {renderProfileIcon(true)}
            <View style={style.editButtonContainer}>
              <View style={style.buttonStyle}>
                <Image source={images.iconChange} />
                <TouchableOpacity
                  onPress={() => {
                    openImagePicker();
                  }}
                >
                  <CommonText
                    customTextStyle={style.textStyle}
                    fontWeight="600"
                  >
                    {buttonTitle}
                  </CommonText>
                </TouchableOpacity>
              </View>
              {!!profileImage &&
                (photoEditFlag ? (
                  <View
                    style={[style.saveButtonStyle, style.secondButtonStyle]}
                  >
                    <Image source={images.iconTick} />
                    <CommonText
                      customTextStyle={style.saveTextStyle}
                      fontWeight="600"
                    >
                      {intl.formatMessage({ id: "label.save" })}
                    </CommonText>
                  </View>
                ) : (
                  <View style={[style.buttonStyle, style.secondButtonStyle]}>
                    <Image source={images.iconDelete} />
                    <CommonText
                      customTextStyle={style.textStyle}
                      fontWeight="600"
                    >
                      {intl.formatMessage({ id: "label.remove" })}
                    </CommonText>
                  </View>
                ))}
            </View>
          </CustomModal>
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
