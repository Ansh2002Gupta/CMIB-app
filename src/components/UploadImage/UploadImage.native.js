import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import styles from "./UploadImage.style";
import { launchImageLibrary } from "react-native-image-picker";
import images from "../../images";

const UploadImage = ({ intl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const onClickDeleteImage = () => {
    setFileName("");
    setSelectedImage(null);
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
      ]}
    >
      {selectedImage ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImageStyle}
            />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.nameStyle}>{fileName}</Text>
            <TouchableOpacity onPress={onClickDeleteImage}>
              <Image source={images.iconTrash} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={images.iconUpload} />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              {intl.formatMessage({ id: "label.drag_drop_files" })}
            </Text>
            <TouchableOpacity onPress={openImagePicker}>
              <Text style={styles.browseStyle}>
                {` ${intl.formatMessage({ id: "label.browse" })}`}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoStyle}>
            {intl.formatMessage({ id: "label.supported_type" })}
          </Text>
        </>
      )}
    </View>
  );
};

UploadImage.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default UploadImage;
