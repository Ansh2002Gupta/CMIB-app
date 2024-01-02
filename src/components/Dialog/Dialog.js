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
  heading,
  omitCloseBtn,
  maxWidth,
  onClose,
  preventCloseOnBackdropClick,
}) => {
  return (
    <Modal {...{ maxWidth, onClose, preventCloseOnBackdropClick }}>
      <View style={styles.headingRow}>
        <View>
          {heading ? (
            <CommonText title={heading} customTextStyle={styles.heading} />
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
  maxWidth: "",
  heading: "",
  omitCloseBtn: false,
  onClose: () => {},
  preventCloseOnBackdropClick: false,
};

Dialog.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  omitCloseBtn: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Dialog;
