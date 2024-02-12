import React from "react";
import PropTypes from "prop-types";

import CustomButton from "../CustomButton";
import ImagePicker from "../ImagePickerComponent/ImagePickerComponent";
import { extractFilename } from "../../utils/util";
import images from "../../images";
import styles from "./TriggerFileUpload.style";

const TriggerFileUpload = ({
  buttonTitle,
  setFile,
  onImageUpload,
  isLoading,
}) => {
  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        setFile(image?.sourceURL || image?.path);
        const uri = image?.sourceURL || image?.path;
        const formData = new FormData();
        const file = {
          uri: uri,
          name: image?.filename || extractFilename(uri),
          type: image.mime,
        };
        formData.append("file", file);
        onImageUpload(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomButton
      style={styles.buttonStyle}
      onPress={openImagePicker}
      iconLeft={{
        isLeftIconNotSvg: true,
        leftIconSource: images.iconChange,
      }}
      isLoading={isLoading}
    >
      {buttonTitle}
    </CustomButton>
  );
};

TriggerFileUpload.defaultProps = {
  buttonTitle: "",
  isLoading: false,
  onImageUpload: () => {},
  setFile: () => {},
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  isLoading: PropTypes.bool,
  onImageUpload: PropTypes.func,
  setFile: PropTypes.func,
};

export default TriggerFileUpload;
