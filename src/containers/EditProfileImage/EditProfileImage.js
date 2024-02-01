import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomModal from "../../components/CustomModal";
import ImagePicker from "../../components/ImagePickerComponent/ImagePickerComponent";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import images from "../../images";
import styles from "./EditProfileImage.style";

const EditProfileImage = ({
  firstName,
  lastName,
  onPressIconCross,
  profileImage,
}) => {
  const intl = useIntl();
  const [profilePic, setProfilePic] = useState(profileImage);
  const [photoEditFlag, setPhotoEditFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const buttonTitle = profilePic
    ? intl.formatMessage({ id: "label.change" })
    : intl.formatMessage({ id: "label.add" });

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        customContainerStyle={styles.editProfileContainer}
        customImageStyle={styles.modalProfileImage}
        firstName={firstName}
        lastName={lastName}
        profileImage={profilePic}
      />
    );
  };

  const handleDismissToast = () => {
    setErrorMessage("");
  };

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        setProfilePic(image?.sourceURL || image?.path);
        setPhotoEditFlag(true);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <CustomModal
      headerText={intl.formatMessage({
        id: "label.edit_profile_picture",
      })}
      isIconCross
      onPressIconCross={onPressIconCross}
    >
      {renderProfileIcon()}
      <View style={styles.editButtonContainer}>
        <View style={styles.buttonStyle}>
          <Image source={images.iconChange} />
          <TouchableOpacity
            onPress={() => {
              openImagePicker();
            }}
          >
            <CommonText customTextStyle={styles.textStyle} fontWeight="600">
              {buttonTitle}
            </CommonText>
          </TouchableOpacity>
        </View>
        {!!profilePic &&
          (photoEditFlag ? (
            <View style={[styles.saveButtonStyle, styles.secondButtonStyle]}>
              <CustomImage source={images.iconTick} />
              <CommonText
                customTextStyle={styles.saveTextStyle}
                fontWeight="600"
              >
                {intl.formatMessage({ id: "label.save" })}
              </CommonText>
            </View>
          ) : (
            <View style={[styles.buttonStyle, styles.secondButtonStyle]}>
              <CustomImage source={images.iconDelete} />
              <CommonText customTextStyle={styles.textStyle} fontWeight="600">
                {intl.formatMessage({ id: "label.remove" })}
              </CommonText>
            </View>
          ))}
      </View>
      {!!errorMessage && (
        <ToastComponent
          toastMessage={errorMessage}
          onDismiss={handleDismissToast}
        />
      )}
    </CustomModal>
  );
};

EditProfileImage.defaultProps = {
  firstName: "",
  lastName: "",
  onPressIconCross: () => {},
  profileImage: "",
};

EditProfileImage.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onPressIconCross: PropTypes.func,
  profileImage: PropTypes.string,
};

export default EditProfileImage;
