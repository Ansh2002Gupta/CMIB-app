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
import images from "../../images";
import style from "./ViewProfile.style";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

const ViewProfileUI = ({ handleEditPopup, intl, onGoBack, showEditModal }) => {
  const [photoEditFlag, setPhotoEditFlag] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //TODO: Dummy data to be replaced by api data.
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const details = [
    { title: "Designation", value: "Senior Chartered Accountant" },
    { title: "Mobile Number", value: "+91-1234 5678 21" },
    { title: "Email ID", value: "pooja.dhar@j&k.co" },
  ];

  useEffect(() => {
    if (!showEditModal) {
      setPhotoEditFlag(false);
    }
  }, [showEditModal]);

  const handleDismissToast = () => {
    setErrorMessage("");
  };
  
  const renderProfileIcon = (iconType) => {
    return (
      <ProfileIcon
        showEditModal={showEditModal}
        iconType={iconType}
        firstName={firstName}
        lastName={lastName}
        profileImage={profileImage}
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
        setProfileImage(image?.sourceURL);
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
        intl={intl}
        headerText={intl.formatMessage({ id: "label.view_profile" })}
        onPressLeftIcon={onGoBack}
        iconLeft={images.iconBack}
        iconRight={images.iconNotification}
      />
      <View style={style.picParentContainer}>
        <View style={style.picContainer}>
          {renderProfileIcon("profileIcon")}
          <TouchableOpacity
            style={style.iconEditStyle}
            onPress={() => {
              handleEditPopup(true);
            }}
          >
            <Image source={images.iconEdit} style={style.editIcon} />
          </TouchableOpacity>
        </View>
        <CardComponent>
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
            {renderProfileIcon("modalIcon")}
            <View style={style.editButtonContainer}>
              <View style={style.buttonStyle}>
                <Image source={images.iconChange} />
                <TouchableOpacity
                  onPress={() => {
                    openImagePicker();
                  }}
                >
                  {profileImage !== "" ? (
                    <CommonText
                      customTextStyle={style.textStyle}
                      title={intl.formatMessage({ id: "label.change" })}
                    />
                  ) : (
                    <CommonText
                      customTextStyle={style.textStyle}
                      title={intl.formatMessage({ id: "label.add" })}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {profileImage !== "" &&
                (photoEditFlag ? (
                  <View
                    style={[style.saveButtonStyle, style.secondButtonStyle]}
                  >
                    <Image source={images.iconTick} />
                    <CommonText
                      customTextStyle={style.saveTextStyle}
                      title={intl.formatMessage({ id: "label.save" })}
                    />
                  </View>
                ) : (
                  <View style={[style.buttonStyle, style.secondButtonStyle]}>
                    <Image source={images.iconDelete} />
                    <CommonText
                      customTextStyle={style.textStyle}
                      title={intl.formatMessage({ id: "label.remove" })}
                    />
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
