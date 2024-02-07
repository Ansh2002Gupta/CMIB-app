import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CropAndRotateImage from "../../components/CropAndRotateImage/CropAndRotateImage";
import CustomImage from "../../components/CustomImage";
import CustomModal from "../../components/CustomModal";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import TriggerFileUpload from "../../components/TriggerFileUpload";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useUpdateLogo from "../../services/apiServices/hooks/CompanyLogo/useUpdateLogoAPI";
import useUploadedFileValidations from "../../hooks/useUploadedFileValidations";
import { getImageSource } from "../../utils/util";
import { setUserDetails } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import images from "../../images";
import styles from "./EditProfileImage.style";

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

  const { initiateFileUpload } = useUploadedFileValidations();

  const { errorWhileUpdate, handleFileUpdate, isLoading, setErrorWhileUpdate } =
    useUpdateLogo();

  const buttonTitle = profileImage
    ? intl.formatMessage({ id: "label.change" })
    : intl.formatMessage({ id: "label.add" });

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        customContainerStyle={styles.editProfileContainer}
        customImageStyle={styles.modalProfileImage}
        name={name}
        profileImage={
          Platform.OS === "web"
            ? getImageSource(!!file ? file : profileImage)
            : file || profileImage
        }
      />
    );
  };

  const handleDismissToast = () => {
    setErrorMessage("");
  };

  return (
    <CustomModal
      headerText={intl.formatMessage({
        id: "label.edit_profile_picture",
      })}
      isIconCross
      onPressIconCross={onPressIconCross}
    >
      {!!file ? (
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
          onSuccess={(file) => {
            handleFileUpdate({
              file: { profile_photo: file?.data?.file_name },
              successCallback: () => {
                userProfileDetails.userDetails.profile_photo = file?.data?.url;
                userProfileDispatch(setUserDetails(userProfileDetails));
                onPressIconCross();
              },
            });
          }}
          setFile={setFile}
        />
      ) : (
        <>
          {renderProfileIcon()}
          {/* <CommonText>{errorWhileUplaod}</CommonText> */}
          <View style={styles.editButtonContainer}>
            <TriggerFileUpload
              buttonTitle={buttonTitle}
              setFile={setFile}
              openCropViewAfterImageSelection
            />
            {!!(file || profileImage) &&
              (!!file ? (
                <View
                  style={{
                    ...styles.saveButtonStyle,
                    ...styles.secondButtonStyle,
                  }}
                >
                  <CustomImage source={images.iconTick} />
                  <CommonText
                    customTextStyle={styles.saveTextStyle}
                    fontWeight="600"
                  >
                    {intl.formatMessage({ id: "label.save" })}
                  </CommonText>
                </View>
              ) : (
                <View
                  style={{ ...styles.buttonStyle, ...styles.secondButtonStyle }}
                >
                  <CustomImage source={images.iconDelete} />
                  <CommonText
                    customTextStyle={styles.textStyle}
                    fontWeight="600"
                  >
                    {intl.formatMessage({ id: "label.remove" })}
                  </CommonText>
                </View>
              ))}
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
