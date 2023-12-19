import React from "react";
import PropTypes from "prop-types";

import images from "../../images";
import styles from "./twoRowButton.style";
import CustomColumn from "../TwoColumnButton/CustomColumn";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";

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
      style={[styles.buttonStyle, styles.secondButtonStyle]}
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


export default TwoRowButton;
