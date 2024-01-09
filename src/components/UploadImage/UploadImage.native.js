import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import DragAndDropCard from "../DragAndDropCard/DragAndDropCard";
import PreviewImage from "../PreviewImage/PreviewImage";
import { IMAGE_MAX_SIZE } from "../../constants/constants";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "./UploadImage.style";

const UploadImage = ({ imageName, imageUrl, onDeleteImage, onImageUpload }) => {
  const intl = useIntl();
  const [errorWhileUpload, setErrorWhileUpload] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onClickDeleteImage = () => {
    onDeleteImage(() => {
      setFileName("");
      setSelectedImage(null);
    });
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
        setIsUploading(true);
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
        onImageUpload(formData, () => {
          setSelectedImage(imageUri);
          setFileName(fileName);
          setIsUploading(false);
        });
      }
    });
  };

  return (
    <View style={styles.containerStyle}>
      {!!selectedImage || imageUrl ? (
        <PreviewImage
          isEditable={!!imageUrl}
          fileName={fileName || imageName}
          onRemoveImage={onClickDeleteImage}
          source={{ uri: selectedImage || imageUrl }}
        />
      ) : (
        <DragAndDropCard
          errorMessage={errorWhileUpload}
          handleUploadClick={openImagePicker}
          isLoading={isUploading}
        />
      )}
    </View>
  );
};

UploadImage.defaultProps = {
  onDeleteImage: () => {},
  onImageUpload: () => {},
  isEditable: false,
  imageUrl: "",
  imageName: "",
};

UploadImage.propTypes = {
  imageName: PropTypes.string,
  imageUrl: PropTypes.string,
  onDeleteImage: PropTypes.func,
  onImageUpload: PropTypes.func,
};

export default UploadImage;
