import React, { useRef, useState } from "react";
import { TextInput } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import images from "../../images";
import styles from "./TriggerFileUpload.style";

const TriggerFileUpload = ({ buttonTitle, initiateFileUpload, setFile }) => {
  const fileInputRef = useRef(null);

  const onValidImageUpload = ({ uploadedFile }) => {
    setFile(uploadedFile);
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
        style={styles.buttonStyle}
        onPress={handleUploadClick}
        shouldShowHover
        iconLeft={{
          isLeftIconNotSvg: true,
          leftIconSource: images.iconChange,
        }}
        customStyle={{ customTextStyle: { fontSize: 14 } }}
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
  setFile: () => {},
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  initiateFileUpload: PropTypes.any,
  setFile: PropTypes.func,
};

export default TriggerFileUpload;
