import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage/PreviewImage";
import { IMAGE_MAX_SIZE } from "../../constants/constants";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "./UploadImage.style";

const UploadImage = ({
  imageName,
  imageUrl,
  errorWhileUpload: errorWhileUploading,
  fileUploadResult,
  handleFileUpload,
  hideIconDelete,
  isUploadingImageToServer,
  onDeleteImage,
  setFileUploadResult,
  uploadPercentage,
}) => {
  const intl = useIntl();
  const [errorWhileUpload, setErrorWhileUpload] = useState("");
  const imageUploadedToServer = fileUploadResult?.data;

  const onClickDeleteImage = () => {
    setFileUploadResult(null);
    onDeleteImage();
  };

  const openImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        setErrorWhileUpload(response.error);
      } else if (
        response.assets &&
        response.assets[0].fileSize > IMAGE_MAX_SIZE
      ) {
        setErrorWhileUpload(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let fileName = response.fileName || response.assets?.[0]?.fileName;
        let type = response.type || response.assets?.[0]?.type;
        const formData = new FormData();
        const file = {
          uri: imageUri,
          name: fileName,
          type: type,
        };
        formData.append("file", file);
        handleFileUpload({
          file: formData,
        });
      }
    });
  };

  return (
    <View style={styles.containerStyle}>
      {((!isUploadingImageToServer && !!imageUploadedToServer) ||
        !!imageUrl) && (
        <PreviewImage
          {...{
            fileName: imageUploadedToServer?.["file_name"] || imageName || "",
            isEditable: !!imageUrl,
            hideIconDelete,
            onRemoveImage: onClickDeleteImage,
            source: { uri: imageUploadedToServer?.url || imageUrl || "" },
          }}
        />
      )}
      {!imageUploadedToServer && !imageUrl && (
        <DragAndDropCard
          {...{
            errorMessage: errorWhileUpload || errorWhileUploading,
            handleUploadClick: openImagePicker,
            isLoading: isUploadingImageToServer,
            uploadPercentage,
          }}
        />
      )}
    </View>
  );
};

UploadImage.defaultProps = {
  imageName: "",
  imageUrl: "",
  handleFileUpload: () => {},
  hideIconDelete: false,
  onDeleteImage: () => {},
  setFileUploadResult: () => {},
};

UploadImage.propTypes = {
  imageName: PropTypes.string,
  imageUrl: PropTypes.string,
  errorWhileUpload: PropTypes.string,
  fileUploadResult: PropTypes.object,
  handleFileUpload: PropTypes.func,
  hideIconDelete: PropTypes.bool,
  isUploadingImageToServer: PropTypes.bool,
  onDeleteImage: PropTypes.func,
  setFileUploadResult: PropTypes.func,
  uploadPercentage: PropTypes.string,
};

export default UploadImage;
