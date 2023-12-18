import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import styles from "./Dialog.style";

const portalElement = document.getElementById("overlays");

const Backdrop = ({ closeOnBackdropClick, onClose }) => {
  return (
    <View
      style={styles.backdrop}
      onClick={closeOnBackdropClick ? () => onClose() : () => {}}
    ></View>
  );
};

// const Overlays = ({ children, maxWidth }) => {
//   return (
//     <View style={styles.modal}>
//       <View style={{ ...styles.contentBox, ...setMaxWidth() }}>
//         <View style={styles.content}>{children}</View>
//       </View>
//     </View>
//   );
// };

const Dialog = ({ children, maxWidth, onClose }) => {
  const setMaxWidth = () => {
    switch (maxWidth) {
      case "xs":
        return styles.xsWidth;
      case "sm":
        return styles.smWidth;
      case "md":
        return styles.mdWidth;
      case "lg":
        return styles.lgWidth;
      case "xl":
        return styles.xlWidth;
      default:
        return styles.defaultMaxWidth;
    }
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <View style={styles.modal}>
          <View style={{ ...styles.contentBox, ...setMaxWidth() }}>
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
  onClose: () => {},
};

Dialog.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
};

export default Dialog;
