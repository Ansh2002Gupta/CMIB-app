import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  View,
} from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import ImageZoom from "react-native-image-pan-zoom";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import styles from "./ImagePreview.style";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const ImagePreview = ({ imageUrls, imageStyle, isPreview }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <CustomTouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrls }} style={imageStyle} />
      </CustomTouchableOpacity>
      <Modal
        visible={modalVisible && isPreview}
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
          imageWidth={WIDTH}
          imageHeight={HEIGHT}
          enableDoubleClickZoom
          onSwipeDown={handleModalClose}
          enableSwipeDown
        >
          <Image source={{ uri: imageUrls }} style={styles.fullImage} />
        </ImageZoom>
      </Modal>
    </View>
  );
};

ImagePreview.defaultProps = {
  imageUrls: "",
  imageStyle: {},
  isPreview: false,
};

ImagePreview.propTypes = {
  imageUrls: PropTypes.string,
  imageStyle: PropTypes.object,
  isPreview: PropTypes.bool,
};

export default ImagePreview;
