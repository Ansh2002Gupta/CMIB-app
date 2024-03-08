import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import images from "../../images";
import styles from "./PreviewImage.style";

const PreviewImage = ({
  fileName,
  hideIconDelete,
  isEditable,
  onRemoveImage,
  source,
}) => {
  return (
    <View
      style={[
        styles.selectedImageContainer,
        isEditable && styles.showImageStyle,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.selectedImageStyle} />
      </View>
      <View style={styles.innerContainer}>
        <CommonText
          customContainerStyle={styles.textContainerBox}
          customTextStyle={styles.nameStyle}
        >
          {fileName}
        </CommonText>
        {!hideIconDelete && (
          <TouchableOpacity onPress={onRemoveImage}>
            <Image source={images.iconTrash} style={styles.deleteIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

PreviewImage.defaultProps = {
  fileName: "",
  hideIconDelete: false,
  isEditable: false,
  onRemoveImage: () => {},
  source: "",
};

PreviewImage.propTypes = {
  fileName: PropTypes.string,
  hideIconDelete: PropTypes.bool,
  isEditable: PropTypes.bool,
  onRemoveImage: PropTypes.func,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default PreviewImage;
