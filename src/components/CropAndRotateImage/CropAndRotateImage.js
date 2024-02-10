import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import Dialog from "../Dialog";
import ZoomSliderWithInfo from "../ZoomSliderWithInfo";
import getCroppedImg from "../../utils/cropImage";
import { getImageSource } from "../../utils/util";
import { ZOOM_CONSTANT } from "../../constants/constants";
import styles from "./CropAndRotateImage.style";

const CropAndRotateImage = ({
  file,
  errorWhileUpload,
  handleFileUpload,
  heading,
  isLoading,
  initiateFileUpload,
  onClose,
  onSuccess,
  photoURL,
  setFile,
  setOpenCropView,
  shouldOpenInModal,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONSTANT.MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  const uploadImageToServer = ({ uploadedFile }) => {
    // setFile(uploadedFile);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    handleFileUpload({
      file: formData,
      successCallback: (file) => {
        onSuccess(file);
      },
    });
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
    onClose && onClose();
  };

  const resetStates = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setIsCroppingImage(false);
    setIsErrorCroppingImage(false);
  };

  const renderModalContent = () => {
    return (
      <View>
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
            showGrid={false}
            zoomSpeed={2}
            style={{ cropAreaStyle: styles.cropAreaStyle }}
          />
        </View>
        <ZoomSliderWithInfo {...{ setZoom, zoom, setRotation }} />
        {!!errorWhileUpload && (
          <CommonText
            fontWeight="600"
            customTextStyle={styles.customTextStyle}
            customContainerStyle={styles.customContainerStyle}
          >
            {errorWhileUpload}
          </CommonText>
        )}
        <View style={styles.actionBtnContainer}>
          <CustomButton
            onPress={
              isCroppingImage || isLoading ? () => {} : cancelCropHandler
            }
            style={{
              ...styles.buttonStyle,
              ...(isCroppingImage || isLoading ? styles.additionalStyles : {}),
            }}
          >
            {intl.formatMessage({ id: "label.cancel" })}
          </CustomButton>
          <CustomButton
            isLoading={isCroppingImage || isLoading}
            onPress={cropImage}
            style={styles.buttonStyle}
            withGreenBackground
          >
            <View>{intl.formatMessage({ id: "label.save" })}</View>
          </CustomButton>
        </View>
      </View>
    );
  };

  return (
    <>
      {shouldOpenInModal ? (
        <Dialog onClose={cancelCropHandler} maxWidth="sm" {...{ heading }}>
          {renderModalContent()}
        </Dialog>
      ) : (
        renderModalContent()
      )}
    </>
  );
};

CropAndRotateImage.defaultProps = {
  file: null,
  errorWhileUpload: "",
  handleFileUpload: () => {},
  heading: "Edit Picture",
  isLoading: false,
  initiateFileUpload: () => {},
  onClose: () => {},
  onSuccess: () => {},
  photoURL: "",
  setFile: () => {},
  setOpenCropView: () => {},
  shouldOpenInModal: true,
};

CropAndRotateImage.propTypes = {
  file: PropTypes.object,
  errorWhileUpload: PropTypes.string,
  handleFileUpload: PropTypes.func,
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
  initiateFileUpload: PropTypes.func,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  photoURL: PropTypes.string,
  setFile: PropTypes.func,
  setOpenCropView: PropTypes.func,
  setPhotoURL: PropTypes.func,
  shouldOpenInModal: PropTypes.bool,
};

export default CropAndRotateImage;
