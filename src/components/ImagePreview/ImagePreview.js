import React, { useState } from "react";
import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { View } from "@unthinkable/react-core-components";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import TouchableImage from "../TouchableImage";
import { MIN_ZOOM_SCALE, MAX_ZOOM_SCALE } from "../../constants/constants";
import images from "../../images";
import styles from "./ImagePreview.style";

const ImagePreview = ({ alt, resizeMode, source, style, preview }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(1);

  const isModalVisible = preview && modalVisible;
  const imagePreviewHandler = () => {
    if (preview) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      <CustomTouchableOpacity onPress={imagePreviewHandler}>
        <CustomImage
          alt={alt}
          resizeMode={resizeMode}
          source={source}
          style={{ ...style }}
        />
      </CustomTouchableOpacity>
      {isModalVisible && (
        <Modal containerStyle={styles.transformerImageWrapper} maxWidth="md">
          <TransformWrapper
            initialScale={scale}
            initialPositionX={0}
            initialPositionY={0}
            maxScale={MAX_ZOOM_SCALE}
            minScale={MIN_ZOOM_SCALE}
            onTransformed={(zoomState) => {
              setScale(zoomState?.state?.scale);
            }}
          >
            {({ zoomIn, zoomOut }) => (
              <React.Fragment>
                <View style={styles.crossIconContainer}>
                  <TouchableImage
                    style={styles.iconCloseDarkBtn}
                    onPress={() => {
                      setScale(1);
                      setModalVisible(false);
                    }}
                    source={images.iconCloseDark}
                  />
                </View>
                <TransformComponent>
                  <CustomImage
                    alt={alt}
                    defaultSource={images.iconLoading}
                    source={source}
                    style={styles.previewImage}
                  />
                </TransformComponent>
                <View style={styles.zoomBtnContainer}>
                  <TouchableImage
                    parentStyle={styles.iconZoomBtnParent}
                    imageStyle={styles.iconZoomBtn}
                    onPress={() => zoomIn()}
                    source={images.iconZoomIn}
                    disabled={scale === MAX_ZOOM_SCALE}
                  />
                  <TouchableImage
                    parentStyle={styles.iconZoomBtnParent}
                    imageStyle={styles.iconZoomBtn}
                    onPress={() => zoomOut()}
                    source={images.iconZoomOut}
                    disabled={scale === MIN_ZOOM_SCALE}
                  />
                </View>
              </React.Fragment>
            )}
          </TransformWrapper>
        </Modal>
      )}
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
