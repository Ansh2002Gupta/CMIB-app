import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import PdfCard from "../PdfCard/PdfCard";
import VideoCard from "../VideoCard/VideoCard";
import images from "../../images";
import getStyles from "./PreviewImage.style";

const PreviewImage = ({
  hideIconDelete,
  fileUrl,
  isDocumentUpload,
  isVideoUpload,
  isEditable,
  onRemoveImage,
  source,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View
      style={{
        ...styles.selectedImageContainer,
        ...(isEditable ? styles.showImageStyle : {}),
      }}
    >
      <View
        style={{
          ...styles.imageContainer,
          ...(isVideoUpload ? styles.videoContainer : {}),
        }}
      >
        {isDocumentUpload ? (
          <PdfCard pdfUrl={fileUrl} />
        ) : isVideoUpload ? (
          <VideoCard url={fileUrl} />
        ) : (
          <Image source={source} style={styles.selectedImageStyle} />
        )}
      </View>
      {!hideIconDelete && (
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onRemoveImage}>
            <Image source={images.iconTrashSVG} style={styles.deleteIcon} />
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
  isVideoUpload: PropTypes.bool,
  isEditable: PropTypes.bool,
  onRemoveImage: PropTypes.func,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default PreviewImage;
