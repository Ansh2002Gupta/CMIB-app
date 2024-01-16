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
        formData.append("company_logo", file);
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
  onDeleteImage: () => {},
  onImageUpload: () => {},
};

UploadImage.propTypes = {
  imageName: PropTypes.string,
  imageUrl: PropTypes.string,
  onDeleteImage: PropTypes.func,
  onImageUpload: PropTypes.func,
};

export default UploadImage;
