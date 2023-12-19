import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { launchImageLibrary } from "react-native-image-picker";

import CommonText from "../CommonText";
import images from "../../images";
import styles from "./UploadImage.style";

const UploadImage = ({
  customContainerStyle,
  imageName,
  imageUrl,
  intl,
  onDeleteImage,
  onImageUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");

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
        console.log("Image picker error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let fileName = response.fileName || response.assets?.[0]?.fileName;
        let type = response.fileName || response.assets?.[0]?.type;
        const formData = new FormData();
        const file = {
          uri: imageUri,
          name: fileName,
          type: type,
        };
        formData.append("company_logo", file);
        onImageUpload(formData);
        setSelectedImage(imageUri);
        setFileName(fileName);
      }
    });
  };
  return (
    <View
      style={[
        styles.contentContainerStyle,
        selectedImage && styles.selectedImageContainer,
        imageUrl ? styles.showImageStyle : null,
        customContainerStyle,
      ]}
    >
      {!!selectedImage || imageUrl ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage || imageUrl }}
              style={styles.selectedImageStyle}
            />
          </View>
          <View style={styles.innerContainer}>
            <CommonText
              customTextStyle={styles.nameStyle}
              title={fileName || imageName}
            />
            {!imageUrl && (
              <TouchableOpacity onPress={onClickDeleteImage}>
                <Image source={images.iconTrash} />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <>
          <Image source={images.iconUpload} />
          <View style={styles.textContainer}>
            <CommonText
              customTextStyle={styles.textStyle}
              title={intl.formatMessage({ id: "label.drag_drop_files" })}
            />
            <TouchableOpacity onPress={openImagePicker}>
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
        </>
      )}
    </View>
  );
};

UploadImage.defaultProps = {
  customContainerStyle: {},
  onDeleteImage: () => {},
  onImageUpload: () => {},
  imageUrl: "",
  imageName: "",
};

UploadImage.propTypes = {
  customContainerStyle: PropTypes.object,
  imageName: PropTypes.string,
  imageUrl: PropTypes.string,
  intl: PropTypes.object.isRequired,
  onDeleteImage: PropTypes.func,
  onImageUpload: PropTypes.func,
};

export default UploadImage;
