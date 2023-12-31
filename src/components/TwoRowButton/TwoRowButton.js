import React from "react";
import PropTypes from "prop-types";

import CustomCell from "../CustomCell";
import MultiColumn from "../../core/layouts/MultiColumn";

const TwoRowButton = ({
  isLeftDisabled,
  isRightDisabled,
  leftButtonLeftImage,
  leftButtonRightImage,
  leftButtonText,
  leftButtonStyle,
  leftTextStyle,
  onLeftButtonClick,
  onRightButtonClick,
  rightButtonLeftImage,
  rightButtonRightImage,
  rightButtonText,
  rightButtonStyle,
  rightTextStyle,
}) => {
  const bottomButton = [
    {
      content: (
        <CustomCell
          disabled={isLeftDisabled}
          leftSource={leftButtonLeftImage}
          onPress={onLeftButtonClick}
          rightSource={leftButtonRightImage}
          style={leftButtonStyle}
          title={leftButtonText}
          textStyle={leftTextStyle}
        />
      ),
      isFillSpace: true,
    },
    {
      content: (
        <CustomCell
          disabled={isRightDisabled}
          leftSource={rightButtonLeftImage}
          onPress={onRightButtonClick}
          rightSource={rightButtonRightImage}
          style={rightButtonStyle}
          title={rightButtonText}
          textStyle={rightTextStyle}
        />
      ),
      isFillSpace: true,
    },
  ];

  return <MultiColumn columns={bottomButton} />;
};

TwoRowButton.defaultProps = {
  isLeftDisabled: false,
  isRightDisabled: false,
  onLeftButtonClick: () => {},
  onRightButtonClick: () => {},
};

TwoRowButton.propTypes = {
  isLeftDisabled: PropTypes.bool,
  isRightDisabled: PropTypes.bool,
  leftButtonText: PropTypes.string.isRequired,
  leftButtonLeftImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  leftButtonRightImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  rightButtonText: PropTypes.string.isRequired,
  rightButtonLeftImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  rightButtonRightImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default TwoRowButton;
