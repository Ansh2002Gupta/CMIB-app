import React, { useRef, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { TextInput } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import images from "../../images";
import getStyles from "./TriggerFileUpload.style";

const TriggerFileUpload = ({
  buttonTitle,
  customButtonStyle,
  iconLeft,
  initiateFileUpload,
  onImageUpload,
  openCropViewAfterImageSelection,
  setFile,
  shouldShowHover,
}) => {
  const { isLeftIconNotSvg, leftIconSource } = iconLeft;
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  const onValidImageUpload = ({ uploadedFile }) => {
    setFile(uploadedFile);
    !openCropViewAfterImageSelection &&
      onImageUpload &&
      onImageUpload({ uploadedFile });
  };

  const fileUploadHandler = (e) => {
    initiateFileUpload({
      onLoad: onValidImageUpload,
      resetUploadInput: () => (e.target.value = null),
      uploadedFile: e.target.files[0],
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <CustomButton
        style={{
          ...(customButtonStyle || styles.buttonStyle),
        }}
        onPress={handleUploadClick}
        shouldShowHover={shouldShowHover}
        iconLeft={{
          isLeftIconNotSvg,
          leftIconSource,
        }}
        customStyle={{ customTextStyle: styles.customStyle }}
      >
        {buttonTitle}
      </CustomButton>
      <TextInput
        type="file"
        ref={fileInputRef}
        name="fileUpload"
        accept="image/png, image/jpeg, image/svg, image/eps"
        onChange={(event) => fileUploadHandler(event)}
        style={styles.hideRawInputField}
      />
    </>
  );
};

TriggerFileUpload.defaultProps = {
  buttonTitle: "",
  customButtonStyle: {},
  setFile: () => {},
  iconLeft: {
    isLeftIconNotSvg: true,
    leftIconSource: images.iconChange,
  },
  onImageUpload: () => {},
  shouldShowHover: false,
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  customButtonStyle: PropTypes.object,
  iconLeft: PropTypes.object,
  initiateFileUpload: PropTypes.any,
  onImageUpload: PropTypes.func,
  openCropViewAfterImageSelection: PropTypes.bool,
  setFile: PropTypes.func,
  shouldShowHover: PropTypes.bool,
};

export default TriggerFileUpload;
