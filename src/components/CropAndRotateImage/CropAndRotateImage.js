import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomButton from "../CustomButton";
import Dialog from "../Dialog";
import getCroppedImg from "../../utils/cropImage";
import { getImageSource } from "../../utils/util";
import styles from "./CropAndRotateImage.style";

const CropAndRotateImage = ({
  file,
  heading,
  photoURL,
  setFile,
  setOpenCropView,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

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
      setFile(file);
      setOpenCropView(false);
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
  heading: "Edit Picture",
  photoURL: "",
  setFile: () => {},
  setOpenCropView: () => {},
};

CropAndRotateImage.propTypes = {
  file: PropTypes.object,
  photoURL: PropTypes.string,
  setFile: PropTypes.func,
  setOpenCropView: PropTypes.func,
  setPhotoURL: PropTypes.func,
};

export default CropAndRotateImage;
