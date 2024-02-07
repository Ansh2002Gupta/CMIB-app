import React from "react";
import PropTypes from "prop-types";

import CustomButton from "../CustomButton";
import ImagePicker from "../ImagePickerComponent/ImagePickerComponent";
import images from "../../images";
import styles from "./TriggerFileUpload.style";

const TriggerFileUpload = ({ buttonTitle, setFile }) => {
  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        setFile(image?.sourceURL || image?.path);
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
    >
      {buttonTitle}
    </CustomButton>
  );
};

TriggerFileUpload.defaultProps = {
  buttonTitle: "",
  setFile: () => {},
};

TriggerFileUpload.propTypes = {
  buttonTitle: PropTypes.string,
  setFile: PropTypes.func,
};

export default TriggerFileUpload;
