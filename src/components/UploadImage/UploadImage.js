import React, { useRef, useState } from "react";
import { useIntl } from "react-intl";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CropAndRotateImage from "../CropAndRotateImage";
import TextInput from "../TextInput";
import images from "../../images";
import { getImageSource } from "../../utils/util";
import styles from "./UploadImage.style";

const UploadImage = ({ openCropViewAfterImageSelection }) => {
  const intl = useIntl();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [openCropView, setOpenCropView] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const fileUploadHandler = (e) => {
    // setFileIsTooLarge(false);
    // setIsInvalidFormat(false);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (!uploadedFile.type.match(imageMimeType)) {
        // setIsInvalidFormat(true);
        e.target.value = null;
        return;
      }
      if (uploadedFile.size > 5000000) {
        // setFileIsTooLarge(true);
        e.target.value = null;
        return;
      }
    }
    setFile(uploadedFile);
    openCropViewAfterImageSelection && setOpenCropView(true);
    e.target.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files?.[0]);
    openCropViewAfterImageSelection && setOpenCropView(true);
  };

  return (
    <>
      {!!file && openCropView && (
        <CropAndRotateImage
          {...{
            file,
            photoURL: getImageSource(file),
            setFile,
            setOpenCropView,
            setPhotoURL,
          }}
        />
      )}
      {!!file && !openCropView && (
        <View style={styles.selectedImageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={getImageSource(file)}
              style={styles.selectedImageStyle}
            />
          </View>
          <View style={styles.innerContainer}>
            <CommonText customTextStyle={styles.nameStyle} title={file?.name} />
            <TouchableOpacity onPress={() => setFile(null)}>
              <Image source={images.iconTrash} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {(!file || openCropView) && (
        <View
          style={styles.contentContainerStyle}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Image source={images.iconUpload} />
          <View style={styles.textContainer}>
            <CommonText
              customTextStyle={styles.textStyle}
              title={intl.formatMessage({ id: "label.drag_drop_files" })}
            />
            &nbsp;
            <TouchableOpacity onPress={handleUploadClick}>
              <CommonText
                customTextStyle={styles.browseStyle}
                title={` ${intl.formatMessage({ id: "label.browse" })}`}
              />
            </TouchableOpacity>
          </View>
          <CommonText
            customTextStyle={styles.infoStyle}
            title={intl.formatMessage({ id: "label.supported_type" })}
          />
          <TextInput
            type="file"
            ref={fileInputRef}
            name="fileUpload"
            accept="image/png, image/jpeg, image/svg, image/eps"
            onChange={(event) => fileUploadHandler(event)}
            style={styles.hideRawInputField}
          />
        </View>
      )}
    </>
  );
};

export default UploadImage;
