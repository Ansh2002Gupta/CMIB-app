import React, { useState } from "react";
import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { View } from "@unthinkable/react-core-components";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import styles from "./ImagePreview.style";

const ImagePreview = ({ alt, source, style, preview }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const isModalVisible = preview && modalVisible;
  const imagePreviewHandler = () => {
    if (preview) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      <CustomTouchableOpacity onPress={imagePreviewHandler}>
        <CustomImage source={source} style={{ ...style }} alt={alt} />
      </CustomTouchableOpacity>
      {isModalVisible && (
        <Modal containerStyle={styles.transformerImageWrapper} maxWidth="sm">
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <div className="tools">
                  <TouchableImage
                    style={styles.iconCloseDarkBtn}
                    onPress={() => {
                      resetTransform();
                      setModalVisible(false);
                    }}
                    source={images.iconCloseDark}
                  />
                </div>
                <TransformComponent>
                  <CustomImage
                    source={source}
                    alt={alt}
                    style={styles.previewImage}
                  />
                </TransformComponent>
                <View style={styles.zoomBtnContainer}>
                  <TouchableImage
                    parentStyle={styles.iconZoomBtnParent}
                    imageStyle={styles.iconZoomBtn}
                    onPress={() => zoomIn()}
                    source={images.iconZoomIn}
                  />
                  <TouchableImage
                    parentStyle={styles.iconZoomBtnParent}
                    imageStyle={styles.iconZoomBtn}
                    onPress={() => zoomOut()}
                    source={images.iconZoomOut}
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
