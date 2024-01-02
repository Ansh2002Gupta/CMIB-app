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

const PreviewImage = ({ fileName, onRemoveImage, source }) => {
  return (
    <View style={styles.selectedImageContainer}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.selectedImageStyle} />
      </View>
      <View style={styles.innerContainer}>
        <CommonText customTextStyle={styles.nameStyle} title={fileName} />
        <TouchableOpacity onPress={onRemoveImage}>
          <Image source={images.iconTrash} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

PreviewImage.defaultProps = {
  fileName: "",
  onRemoveImage: () => {},
  source: "",
};

PreviewImage.propTypes = {
  fileName: PropTypes.string,
  onRemoveImage: PropTypes.func,
  source: PropTypes.string,
};

export default PreviewImage;
