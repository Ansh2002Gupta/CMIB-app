import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CustomButton from "../CustomButton";
import Dialog from "../Dialog";
import ZoomSliderWithInfo from "../ZoomSliderWithInfo";
import getCroppedImg from "../../utils/cropImage";
import { getImageSource } from "../../utils/util";
import { ZOOM_CONSTANT } from "../../constants/constants";
import styles from "./CropAndRotateImage.style";

const CropAndRotateImage = ({
  file,
  handleFileUpload,
  heading,
  initiateFileUpload,
  photoURL,
  setFile,
  setOpenCropView,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONSTANT.MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

  const uploadImageToServer = ({ uploadedFile }) => {
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append("company_logo", uploadedFile);
    handleFileUpload(formData);
  };

  const cropImage = async () => {
    try {
      setIsCroppingImage(true);
      isErrorCroppingImage && setIsErrorCroppingImage(false);
      const { file } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setIsCroppingImage(false);
      setOpenCropView(false);
      initiateFileUpload({
        onLoad: () => uploadImageToServer({ uploadedFile: file }),
        uploadedFile: file,
      });
    } catch (error) {
      console.log(error);
      setIsErrorCroppingImage(true);
    }
  };

  const cancelCropHandler = () => {
    setOpenCropView(false);
    setFile(null);
  };

  const resetStates = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setIsCroppingImage(false);
    setIsErrorCroppingImage(false);
  };

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  return (
    <Dialog onClose={cancelCropHandler} maxWidth="sm" {...{ heading }}>
      <View style={styles.cropperContainer}>
        <Cropper
          aspect={1}
          crop={crop}
          cropShape="round"
          image={getImageSource(file)}
          onCropChange={setCrop}
          onCropComplete={(croppedArea, croppedAreaPixels) =>
            setCroppedAreaPixels(croppedAreaPixels)
          }
          onRotationChange={setRotation}
          onZoomChange={setZoom}
          rotation={rotation}
          zoom={zoom}
        />
      </View>
      <ZoomSliderWithInfo {...{ setZoom, zoom }} />
      <View style={styles.actionBtnContainer}>
        <CustomButton onPress={cancelCropHandler}>
          {intl.formatMessage({ id: "label.cancel" })}
        </CustomButton>
        <CustomButton
          onPress={cropImage}
          withGreenBackground
          isLoading={isCroppingImage}
        >
          <View>{intl.formatMessage({ id: "label.save" })}</View>
        </CustomButton>
      </View>
    </Dialog>
  );
};

CropAndRotateImage.defaultProps = {
  file: null,
  handleFileUpload: () => {},
  heading: "Edit Picture",
  initiateFileUpload: () => {},
  photoURL: "",
  setFile: () => {},
  setOpenCropView: () => {},
};

CropAndRotateImage.propTypes = {
  file: PropTypes.object,
  handleFileUpload: PropTypes.func,
  heading: PropTypes.string,
  initiateFileUpload: PropTypes.func,
  photoURL: PropTypes.string,
  setFile: PropTypes.func,
  setOpenCropView: PropTypes.func,
  setPhotoURL: PropTypes.func,
};

export default CropAndRotateImage;
