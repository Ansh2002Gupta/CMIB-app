import React, { useRef, useState } from "react";
import { TextInput } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import images from "../../images";
import styles from "./TriggerFileUpload.style";

const TriggerFileUpload = ({
  buttonTitle,
  customButtonStyle,
  iconLeft,
  initiateFileUpload,
  onImageUpload,
  setFile,
}) => {
  const { isLeftIconNotSvg, leftIconSource } = iconLeft;
  const fileInputRef = useRef(null);

  const onValidImageUpload = ({ uploadedFile }) => {
    setFile(uploadedFile);
    onImageUpload && onImageUpload({ uploadedFile });
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
        shouldShowHover
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
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  customButtonStyle: PropTypes.object,
  initiateFileUpload: PropTypes.any,
  setFile: PropTypes.func,
  iconLeft: PropTypes.object,
  onImageUpload: PropTypes.func,
};

export default TriggerFileUpload;
