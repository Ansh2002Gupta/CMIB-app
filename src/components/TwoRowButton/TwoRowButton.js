import React from "react";
import PropTypes from "prop-types";

import CustomCell from "../CustomCell/";
import MultiColumn from "../../core/layouts/MultiColumn";

const TwoRowButton = ({
  isDisabled,
  leftButtonText,
  leftButtonStyle,
  leftTextStyle,
  onLeftButtonClick,
  onRightButtonClick,
  rightButtonText,
  rightButtonStyle,
  rightTextStyle,
}) => {
  const columnConfigs = [
    {
      content: (
        <CustomCell
          onPress={onLeftButtonClick}
          title={leftButtonText}
          style={leftButtonStyle}
          textStyle={leftTextStyle}
          disabled={isDisabled}
        />
      ),
      isFillSpace: true,
    },
    {
      content: (
        <CustomCell
          onPress={onRightButtonClick}
          title={rightButtonText}
          style={rightButtonStyle}
          textStyle={rightTextStyle}
          disabled={isDisabled}
        />
      ),
      isFillSpace: true,
    },
  ];

  return <MultiColumn columns={columnConfigs} />;
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
