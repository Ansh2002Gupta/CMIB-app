import React from "react";
import PropTypes from "prop-types";

import CustomModal from "../../components/CustomModal";
import TwoRowButton from "../../components/TwoRowButton";
import styles from "./ModalWithTitleButton.style";

const ModalWithTitleButton = ({
  children,
  customStyles = {},
  heading,
  enableBottomButton,
  leftLabelTxt,
  leftButtonLeftImage,
  leftButtonRightImage,
  onClickLeftButton,
  onClickRightButton,
  rightButtonLeftImage,
  rightButtonRightImage,
  rightLabelTxt,
}) => {
  const {
    containerStyle = {},
    leftButtonStyle = {},
    leftTextStyle = {},
    rightButtonStyle = {},
    rightTextStyle = {},
  } = customStyles;
  
  return (
    <CustomModal
      headerText={heading}
      style={{
        ...styles.containerStyle,
        ...styles.parentStyle,
        ...containerStyle,
      }}
    >
      {children}
      {enableBottomButton && (
        <TwoRowButton
          leftButtonLeftImage={leftButtonLeftImage}
          leftButtonRightImage={leftButtonRightImage}
          leftButtonStyle={{ ...styles.leftButtonStyle, ...leftButtonStyle }}
          leftButtonText={leftLabelTxt}
          leftTextStyle={{ ...styles.leftTextStyle, ...leftTextStyle }}
          onLeftButtonClick={onClickLeftButton}
          onRightButtonClick={onClickRightButton}
          rightButtonLeftImage={rightButtonLeftImage}
          rightButtonRightImage={rightButtonRightImage}
          rightButtonStyle={{ ...styles.rightButtonStyle, ...rightButtonStyle }}
          rightButtonText={rightLabelTxt}
          rightTextStyle={{ ...styles.rightTextStyle, ...rightTextStyle }}
        />
      )}
    </CustomModal>
  );
};

ModalWithTitleButton.propTypes = {
  children: PropTypes.node,
  customStyles: PropTypes.shape({
    containerStyle: PropTypes.object,
    leftButtonStyle: PropTypes.object,
    leftTextStyle: PropTypes.object,
    rightButtonStyle: PropTypes.object,
    rightTextStyle: PropTypes.object,
  }),
  heading: PropTypes.string,
  enableBottomButton: PropTypes.bool,
  leftLabelTxt: PropTypes.string,
  leftButtonLeftImage: PropTypes.node,
  leftButtonRightImage: PropTypes.node,
  onClickLeftButton: PropTypes.func,
  onClickRightButton: PropTypes.func,
  rightButtonLeftImage: PropTypes.node,
  rightButtonRightImage: PropTypes.node,
  rightLabelTxt: PropTypes.string,
};

export default ModalWithTitleButton;
