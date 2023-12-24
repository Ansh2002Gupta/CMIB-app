import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import Backdrop from "../Backdrop/Backdrop";
import { setMaxWidth, styles } from "./Modal.style";

const portalElement = document.getElementById("overlays");

const Modal = ({
  children,
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
            {children}
          </View>
        </View>,
        portalElement
      )}
    </React.Fragment>
  );
};

Modal.defaultProps = {
  children: <></>,
  maxWidth: "",
  onClose: () => {},
  preventCloseOnBackdropClick: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Modal;
