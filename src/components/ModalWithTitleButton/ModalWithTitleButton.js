import React from "react";
import PropTypes from "prop-types";

import CustomModal from "../../components/CustomModal";
import TwoRowButton from "../../components/TwoRowButton";
import styles from "./ModalWithTitleButton.style";

const ModalWithTitleButton = ({
  children,
  customStyles,
  heading,
  enableBottomButton,
  isRightDisabled,
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
          parentStyle={styles.bottomStyle}
          isRightDisabled={isRightDisabled}
          rightButtonLeftImage={rightButtonLeftImage}
          rightButtonRightImage={rightButtonRightImage}
          rightButtonStyle={{
            ...styles.rightButtonStyle,
            ...(isRightDisabled ? styles.rightButtonDisableStyle : {}),
            ...rightButtonStyle,
          }}
          rightButtonText={rightLabelTxt}
          rightTextStyle={{ ...styles.rightTextStyle, ...rightTextStyle }}
        />
      )}
    </CustomModal>
  );
};

ModalWithTitleButton.defaultProps = {
  children: null,
  customStyles: {},
  heading: "",
  enableBottomButton: false,
  isRightDisabled: false,
  leftLabelTxt: "",
  leftButtonLeftImage: null,
  leftButtonRightImage: null,
  onClickLeftButton: () => {},
  onClickRightButton: () => {},
  rightButtonLeftImage: null,
  rightButtonRightImage: null,
  rightLabelTxt: "",
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
  isRightDisabled: PropTypes.object,
  enableBottomButton: PropTypes.bool,
  heading: PropTypes.string,
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
