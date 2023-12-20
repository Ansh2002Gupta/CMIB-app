import React from "react";
import PropTypes from "prop-types";

import images from "../../images";
import CustomColumn from "../CustomColumn/CustomColumn"
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import styles from "./twoRowButton.style";

const TwoRowButton = (props) => {
  const {
    leftButtonText,
    rightButtonText,
    onLeftButtonClick,
    onRightButtonClick,
    hasIconLeft,
    hasIconRight,
    isDisabled,
  } = props;

  const columnConfigs = [
    {
      content: <CustomColumn
      onPress={onLeftButtonClick}
      title={leftButtonText}
      style={styles.disableButtonStyle}
      textStyle={styles.disableTextStyle}
      iconLeft={hasIconLeft ? images.iconArrowLeft : null}
    />,
    isFillSpace: true,
    },
    {
      content: <CustomColumn
      onPress={onRightButtonClick}
      title={rightButtonText}
      style={{...styles.buttonStyle, ...styles.secondButtonStyle}}
      textStyle={styles.titleStyle}
      disabled={isDisabled}
      iconRight={hasIconRight ? images.iconArrowRightWhite : null}
    /> ,
    isFillSpace: true,
    },
    
  ];

  return (
      <MultiColumn 
      columns={columnConfigs}  
      style={styles.containerStyle}
       />
  );
};
TwoRowButton.propTypes = {
  leftButtonText: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  hasIconLeft: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default TwoRowButton;
