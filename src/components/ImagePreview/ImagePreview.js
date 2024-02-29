import { Image, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import Modal from "../Modal";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import styles from "./ImagePreview.style";

const ImagePreview = ({ imageUrls, imageStyle }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <CustomTouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrls }} style={{ ...imageStyle }} />
      </CustomTouchableOpacity>
      {modalVisible && (
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
                  <img
                    src={imageUrls}
                    alt="image preview"
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

export default ImagePreview;
