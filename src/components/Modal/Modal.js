import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import Backdrop from "../Backdrop/Backdrop";
import { setMaxWidth, styles } from "./Modal.style";

const portalElement = document.getElementById("overlays");

const Modal = ({
  children,
  containerStyle,
  maxWidth,
  onClose,
  preventCloseOnBackdropClick,
  style,
}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} {...{ preventCloseOnBackdropClick }} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <View style={{ ...styles.modal, ...style }}>
          <View
            style={{
              ...styles.contentBox,
              ...setMaxWidth({ maxWidth }),
              ...containerStyle,
            }}
          >
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
  containerStyle: {},
  maxWidth: "",
  onClose: () => {},
  preventCloseOnBackdropClick: false,
  style: {},
};

Modal.propTypes = {
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
  style: PropTypes.object,
};

export default Modal;
