import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
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
            <TouchableOpacity onPress={onClose} style={styles.dialogCloseBtn}>
              <Image source={images.iconCross} />
            </TouchableOpacity>
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
