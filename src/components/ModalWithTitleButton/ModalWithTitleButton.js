import React from "react";
import PropTypes from "prop-types";

import CustomModal from "../../components/CustomModal";
import TwoRowButton from "../../components/TwoRowButton";
import styles from "./ModalWithTitleButton.style";

const ModalWithTitleButton = ({
  children,
  containerStyle,
  heading,
  enableBottomButton,
  leftLabelTxt,
  leftButtonLeftImage,
  leftButtonRightImage,
  leftButtonStyle,
  leftTextStyle,
  onClickLeftButton,
  onClickRightButton,
  rightButtonLeftImage,
  rightButtonRightImage,
  rightLabelTxt,
  rightButtonStyle,
  rightTextStyle,
}) => {
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
  containerStyle: PropTypes.object,
  heading: PropTypes.string,
  isTwoEnable: PropTypes.bool,
  leftLabelTxt: PropTypes.string,
  leftButtonLeftImage: PropTypes.node,
  leftButtonRightImage: PropTypes.node,
  leftButtonStyle: PropTypes.object,
  leftTextStyle: PropTypes.object,
  onClickLeftButton: PropTypes.func,
  onClickRightButton: PropTypes.func,
  rightButtonLeftImage: PropTypes.node,
  rightButtonRightImage: PropTypes.node,
  rightLabelTxt: PropTypes.string,
  rightButtonStyle: PropTypes.object,
  rightTextStyle: PropTypes.object,
};

export default ModalWithTitleButton;
