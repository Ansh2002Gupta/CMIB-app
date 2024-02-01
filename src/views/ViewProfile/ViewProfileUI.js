import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal/CustomModal";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import ImagePicker from "../../components/ImagePickerComponent/ImagePickerComponent";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import images from "../../images";
import style from "./ViewProfile.style";

const ViewProfileUI = ({ handleEditPopup, intl, onGoBack, showEditModal }) => {
  const [photoEditFlag, setPhotoEditFlag] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //TODO: Dummy data to be replaced by api data.
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const details = [
    { label: "label.designation", value: "Senior Chartered Accountant" },
    { label: "label.mobile_number", value: "+91-1234 5678 21" },
    { label: "label.email_id", value: "pooja.dhar@j&k.co" },
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
        firstName={firstName}
        lastName={lastName}
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

  return (
    <>
      <IconHeader
        hasIconBar
        headerText={intl.formatMessage({ id: "label.view_profile" })}
        intl={intl}
        onPressLeftIcon={onGoBack}
      />
      <View style={style.picParentContainer}>
        <View style={style.picContainer}>{renderProfileIcon()}</View>
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
      {!!errorMessage && (
        <ToastComponent
          toastMessage={errorMessage}
          onDismiss={handleDismissToast}
        />
      )}
    </>
  );
};

ViewProfileUI.propTypes = {
  handleEditPopup: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
};

export default ViewProfileUI;
