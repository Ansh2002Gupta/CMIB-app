import React from "react";
import PropTypes from "prop-types";

import CustomColumn from "../CustomColumn/CustomColumn"
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import images from "../../images";
import styles from "./TwoRowButton.style";

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
  hasIconLeft: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  isDisabled: PropTypes.bool,
  leftButtonText: PropTypes.string.isRequired,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  rightButtonText: PropTypes.string.isRequired,
};

export default TwoRowButton;
