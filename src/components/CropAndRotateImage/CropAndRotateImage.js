import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import Dialog from "../Dialog";
import getCroppedImg from "../../utils/cropImage";
import { getImageSource } from "../../utils/util";
import styles from "./CropAndRotateImage.style";
import CustomButton from "../CustomButton";

const CropAndRotateImage = ({
  file,
  photoURL,
  setFile,
  setOpenCropView,
  setPhotoURL,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropImage = async () => {
    // setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      //   setPhotoURL(url);
      setFile(file);
      setOpenCropView(false);
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  const cancelCropHandler = () => {
    setOpenCropView(false);
    setFile(null);
  };

  return (
    <Dialog onClose={() => setOpenCropView(false)} maxWidth="sm">
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
        <CustomButton onPress={cropImage} withGreenBackground>
          {intl.formatMessage({ id: "label.save" })}
        </CustomButton>
      </View>
    </Dialog>
  );
};

CropAndRotateImage.defaultProps = {
  photoURL: "",
  setFile: () => {},
  setOpenCropView: () => {},
  setPhotoURL: () => {},
};

CropAndRotateImage.propTypes = {
  photoURL: PropTypes.string,
  setFile: PropTypes.func,
  setOpenCropView: PropTypes.func,
  setPhotoURL: PropTypes.func,
};

export default CropAndRotateImage;
