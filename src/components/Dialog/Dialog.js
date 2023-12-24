import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import Backdrop from "../Backdrop/Backdrop";
import CommonText from "../CommonText";
import images from "../../images";
import { setMaxWidth, styles } from "./Dialog.style";

const portalElement = document.getElementById("overlays");

const Dialog = ({
  children,
  heading,
  omitCloseBtn,
  maxWidth,
  onClose,
  preventCloseOnBackdropClick,
}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} {...{ preventCloseOnBackdropClick }} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <View style={styles.modal}>
          <View style={{ ...styles.contentBox, ...setMaxWidth({ maxWidth }) }}>
            <View style={styles.headingRow}>
              <View>
                {heading ? (
                  <CommonText
                    title={heading}
                    customTextStyle={styles.heading}
                  />
                ) : (
                  <></>
                )}
              </View>
              <View>
                {!omitCloseBtn ? (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.dialogCloseBtn}
                  >
                    <Image source={images.iconCross} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={styles.content}>{children}</View>
          </View>
        </View>,
        portalElement
      )}
    </React.Fragment>
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
