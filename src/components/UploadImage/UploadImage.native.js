import React, { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import DocumentPicker, { types } from "react-native-document-picker";
import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage/PreviewImage";
import { FILE_MAX_SIZE } from "../../constants/constants";
import styles from "./UploadImage.style";

const UploadImage = ({
  imageName,
  imageUrl,
  errorWhileUpload: errorWhileUploading,
  fileUploadResult,
  handleFileUpload,
  hideIconDelete,
  isDocumentUpload,
  isUploadingImageToServer,
  onDeleteImage,
  setFileUploadResult,
  uploadPercentage,
  isVideoUpload,
}) => {
  const intl = useIntl();
  const [errorWhileUpload, setErrorWhileUpload] = useState("");
  const imageUploadedToServer = fileUploadResult?.data;

  const onClickDeleteImage = () => {
    setFileUploadResult(null);
    onDeleteImage();
  };

  const createFormData = (uri, name, type) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name,
      type,
    });
    return formData;
  };

  const handleDocumentUpload = async () => {
    const response = await DocumentPicker.pick({
      presentationStyle: "fullScreen",
      type: [types.pdf],
    });
    if (response.didCancel) {
      return;
    } else if (response.error) {
      setErrorWhileUpload(response.error);
    } else if (response[0]?.fileSize > FILE_MAX_SIZE) {
      setErrorWhileUpload(
        intl.formatMessage({ id: "label.fileTooLargeError" })
      );
    } else {
      let fileUri = response[0].uri || response.assets?.[0]?.uri;
      let fileName = response[0].name || response.assets?.[0]?.fileName;
      let type = response[0].type || response.assets?.[0]?.type;
      const formData = createFormData(fileUri, fileName, type);
      handleFileUpload({
        file: formData,
      });
    }
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
        return;
      } else if (response.error) {
        setErrorWhileUpload(response.error);
      } else if (
        response.assets &&
        response.assets[0].fileSize > FILE_MAX_SIZE
      ) {
        setErrorWhileUpload(
          intl.formatMessage({ id: "label.fileTooLargeError" })
        );
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let fileName = response.fileName || response.assets?.[0]?.fileName;
        let type = response.type || response.assets?.[0]?.type;
        const formData = createFormData(imageUri, fileName, type);
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
            fileUrl: imageUploadedToServer?.["url"] || "",
            isEditable: !!imageUrl,
            hideIconDelete,
            isDocumentUpload,
            onRemoveImage: onClickDeleteImage,
            source: {
              uri: imageUploadedToServer?.url || imageUrl || "",
            },
          }}
        />
      )}
      {!imageUploadedToServer && !imageUrl && (
        <DragAndDropCard
          {...{
            errorMessage: errorWhileUpload || errorWhileUploading,
            handleUploadClick: isDocumentUpload
              ? handleDocumentUpload
              : openImagePicker,
            isDocumentUpload,
            isLoading: isUploadingImageToServer,
            uploadPercentage,
            isVideoUpload,
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
  isDocumentUpload: false,
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
  isDocumentUpload: PropTypes.bool,
  isUploadingImageToServer: PropTypes.bool,
  onDeleteImage: PropTypes.func,
  setFileUploadResult: PropTypes.func,
  uploadPercentage: PropTypes.string,
};

export default UploadImage;
