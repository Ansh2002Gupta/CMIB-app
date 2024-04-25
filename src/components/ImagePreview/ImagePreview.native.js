import React, { useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions, Modal, View } from "@unthinkable/react-core-components";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import getStyles from "./ImagePreview.style";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const ImagePreview = ({ alt, resizeMode, source, style, preview }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const imagePreviewHandler = () => {
    if (preview) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      <CustomTouchableOpacity onPress={imagePreviewHandler}>
        <CustomImage
          source={{ uri: source }}
          resizeMode={resizeMode}
          style={{ ...style }}
          alt={alt}
        />
      </CustomTouchableOpacity>
      <Modal
        visible={modalVisible && preview}
        useNativeDriver
        transparent={false}
        onRequestClose={handleModalClose}
        style={styles.modalStyle}
      >
        <TouchableImage
          parentStyle={styles.closeIconImage}
          onPress={handleModalClose}
          source={images.iconCloseDark}
        />
        <ImageZoom
          cropWidth={WIDTH}
          cropHeight={HEIGHT}
          imageWidth={WIDTH * 0.9}
          imageHeight={HEIGHT * 0.75}
          enableDoubleClickZoom
          onSwipeDown={handleModalClose}
          enableSwipeDown
        >
          <CustomImage
            source={{ uri: source }}
            style={styles.fullImage}
            defaultSource={images.iconLoading}
            alt={alt}
          />
        </ImageZoom>
      </Modal>
    </View>
  );
};

ImagePreview.defaultProps = {
  alt: "Preview",
  source: "",
  style: {},
  preview: false,
};

ImagePreview.propTypes = {
  alt: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object,
  preview: PropTypes.bool,
};

export default ImagePreview;
