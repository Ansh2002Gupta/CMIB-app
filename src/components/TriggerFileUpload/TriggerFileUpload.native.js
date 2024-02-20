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
  customButtonStyle,
  iconLeft,
}) => {
  const { isLeftIconNotSvg, leftIconSource } = iconLeft;
  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        setFile(image?.sourceURL || image?.path);
        const uri = image?.sourceURL || image?.path;
        const file = {
          uri: uri,
          name: image?.filename || extractFilename(uri),
          type: image.mime,
        };
        onImageUpload({ uploadedFile: file });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomButton
      style={{
        ...(customButtonStyle || styles.buttonStyle),
      }}
      onPress={openImagePicker}
      iconLeft={{
        isLeftIconNotSvg,
        leftIconSource,
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
  iconLeft: {
    isLeftIconNotSvg: true,
    leftIconSource: images.iconChange,
  },
  onImageUpload: () => {},
  setFile: () => {},
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  isLoading: PropTypes.bool,
  iconLeft: PropTypes.object,
  onImageUpload: PropTypes.func,
  setFile: PropTypes.func,
};

export default TriggerFileUpload;
