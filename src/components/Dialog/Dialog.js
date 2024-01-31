import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity";
import Modal from "../Modal";
import images from "../../images";
import styles from "./Dialog.style";

const Dialog = ({
  children,
  customHeadingStyle,
  heading,
  omitCloseBtn,
  maxWidth,
  modalContainerStyle,
  onClose,
  preventCloseOnBackdropClick,
}) => {
  return (
    <Modal
      {...{ maxWidth, onClose, preventCloseOnBackdropClick }}
      containerStyle={modalContainerStyle}
    >
      <View style={{ ...styles.headingRow, ...customHeadingStyle }}>
        <View>
          {heading ? (
            <CommonText customTextStyle={styles.heading} fontWeight="600">
              {heading}
            </CommonText>
          ) : (
            <></>
          )}
        </View>
        <View>
          {!omitCloseBtn ? (
            <CustomTouchableOpacity
              onPress={onClose}
              style={styles.dialogCloseBtn}
            >
              <Image source={images.iconCross} />
            </CustomTouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

Dialog.defaultProps = {
  children: <></>,
  customHeadingStyle: {},
  heading: "",
  omitCloseBtn: false,
  onClose: () => {},
  maxWidth: "",
  modalContainerStyle: {},
  preventCloseOnBackdropClick: false,
};

Dialog.propTypes = {
  children: PropTypes.node,
  customHeadingStyle: PropTypes.object,
  heading: PropTypes.string,
  omitCloseBtn: PropTypes.bool,
  maxWidth: PropTypes.string,
  modalContainerStyle: PropTypes.object,
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Dialog;
