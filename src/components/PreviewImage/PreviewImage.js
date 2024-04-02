import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import PdfCard from "../PdfCard/PdfCard";
import images from "../../images";
import styles from "./PreviewImage.style";

const PreviewImage = ({
  hideIconDelete,
  fileUrl,
  isDocumentUpload,
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
        {isDocumentUpload ? (
          <PdfCard pdfUrl={fileUrl} />
        ) : (
          <Image source={source} style={styles.selectedImageStyle} />
        )}
      </View>
      {!hideIconDelete && (
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onRemoveImage}>
            <Image source={images.iconTrash} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

PreviewImage.defaultProps = {
  hideIconDelete: false,
  isEditable: false,
  onRemoveImage: () => {},
  source: "",
};

PreviewImage.propTypes = {
  hideIconDelete: PropTypes.bool,
  fileUrl: PropTypes.string,
  isDocumentUpload: PropTypes.bool,
  isEditable: PropTypes.bool,
  onRemoveImage: PropTypes.func,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default PreviewImage;
