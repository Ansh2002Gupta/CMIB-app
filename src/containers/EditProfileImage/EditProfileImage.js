import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CropAndRotateImage from "../../components/CropAndRotateImage/CropAndRotateImage";
import CustomModal from "../../components/CustomModal";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import TriggerFileUpload from "../../components/TriggerFileUpload";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useUpdateLogo from "../../services/apiServices/hooks/CompanyLogo/useUpdateLogoAPI";
import useUploadedFileValidations from "../../hooks/useUploadedFileValidations";
import { getImageSource } from "../../utils/util";
import { setUserDetails } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import images from "../../images";
import styles from "./EditProfileImage.style";
import CustomButton from "../../components/CustomButton";

const EditProfileImage = ({ name, onPressIconCross, profileImage }) => {
  const intl = useIntl();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);

  const {
    errorWhileUpload,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
  } = useSaveLogo();

  const {
    errorWhileDeletion,
    handleDeleteLogo,
    isLoading: isDeletingFromServer,
  } = useDeleteLogo();

  const {
    fileTooLargeError,
    invalidFormatError,
    initiateFileUpload,
    nonUploadableImageError,
  } = useUploadedFileValidations();

  const { errorWhileUpdate, handleFileUpdate, isLoading, setErrorWhileUpdate } =
    useUpdateLogo();

  const buttonTitle = profileImage
    ? intl.formatMessage({ id: "label.change" })
    : intl.formatMessage({ id: "label.add" });

  const fileUploadError =
    fileTooLargeError || invalidFormatError || nonUploadableImageError;

  const onImageUploadSuccess = (file) => {
    const updatedProfilePhoto = file?.data?.url;
    userProfileDetails.userDetails.profile_photo = updatedProfilePhoto;
    userProfileDispatch(setUserDetails(userProfileDetails));
    onPressIconCross();
  };

  const handleImageUpload = (uploadedFile) => {
    handleFileUpload({
      file: uploadedFile,
      successCallback: (file) => {
        handleFileUpdate({
          file: { profile_photo: file?.data?.file_name },
          successCallback: () => onImageUploadSuccess(file),
        });
      },
    });
  };

  const handleRemoveImage = () => {
    const fileName = userProfileDetails?.userDetails?.profile_photo.split("/");
    handleFileUpdate({
      file: { profile_photo: "" },
      successCallback: () => {
        userProfileDetails.userDetails.profile_photo = "";
        userProfileDispatch(setUserDetails(userProfileDetails));
        handleDeleteLogo(fileName[fileName.length - 1]);
        onPressIconCross();
      },
    });
  };

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        customContainerStyle={styles.editProfileContainer}
        customImageStyle={styles.modalProfileImage}
        name={name}
        profileImage={
          Platform.OS === "web" ? getImageSource(profileImage) : profileImage
        }
      />
    );
  };

  const renderError = () => {
    return (
      <CommonText
        customTextStyle={styles.errorTextStyle}
        customContainerStyle={styles.errorContainerStyle}
        fontWeight="600"
      >
        {fileUploadError || errorWhileDeletion}
      </CommonText>
    );
  };

  const handleDismissToast = () => setErrorMessage("");

  return (
    <CustomModal
      headerText={
        !!file && Platform.OS === "web"
          ? intl.formatMessage({
              id: "label.crop_profile_picture",
            })
          : intl.formatMessage({
              id: "label.edit_profile_picture",
            })
      }
      isIconCross
      onPressIconCross={onPressIconCross}
      customHeaderStyle={styles.customHeadingStyle}
    >
      {!!file && Platform.OS === "web" ? (
        <CropAndRotateImage
          isLoading={isUploadingImageToServer || isLoading}
          file={file}
          photoURL={getImageSource(file)}
          errorWhileUpload={errorWhileUpload || errorWhileUpdate}
          handleFileUpload={handleFileUpload}
          initiateFileUpload={initiateFileUpload}
          onClose={() => {
            setErrorWhileUpdate("");
            setErrorWhileUpload("");
          }}
          onSuccess={onImageUploadSuccess}
          setFile={setFile}
          shouldOpenInModal={false}
        />
      ) : (
        <>
          {renderProfileIcon()}
          {renderError()}
          <View style={styles.editButtonContainer}>
            <TriggerFileUpload
              {...{
                buttonTitle,
                initiateFileUpload,
                setFile,
                onImageUpload: handleImageUpload,
                isLoading: isUploadingImageToServer || isLoading,
              }}
            />
            {!!profileImage && (
              <CustomButton
                onPress={handleRemoveImage}
                isLoading={isDeletingFromServer}
                style={{ ...styles.buttonStyle, ...styles.secondButtonStyle }}
                iconLeft={{
                  leftIconAlt: "delete",
                  leftIconSource: images.iconDelete,
                  isLeftIconNotSvg: true,
                }}
              >
                {intl.formatMessage({ id: "label.remove" })}
              </CustomButton>
            )}
          </View>
        </>
      )}
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
  name: "",
  onPressIconCross: () => {},
  profileImage: "",
};

EditProfileImage.propTypes = {
  name: PropTypes.string,
  onPressIconCross: PropTypes.func,
  profileImage: PropTypes.string,
};

export default EditProfileImage;
