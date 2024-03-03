import React from "react";
import PropTypes from "prop-types";

import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MultiColumn from "../../core/layouts/MultiColumn";
import Images from "../../images";
import styles from "./CheckBox.style";

const CheckBox = ({
  handleCheckbox,
  id,
  isDisabled,
  isPartial,
  isSelected,
  title,
}) => {
  const CheckIcon = Images.iconCheckbox;
  const UncheckIcon = Images.iconUnCheckbox;
  const PartialIcon = Images.iconPartial;
  const DisabledCheckBoxIcon = Images.iconDisabledCheck;

  const getIcon = () => {
    if (isDisabled) {
      return DisabledCheckBoxIcon;
    } else if (isPartial) {
      return PartialIcon;
    } else {
      return isSelected ? CheckIcon : UncheckIcon;
    }
  };

  const rowCheckBox = [
    {
      content: (
        <CustomTouchableOpacity
          onPress={() => handleCheckbox(id)}
          disabled={isDisabled}
        >
          <CustomImage
            Icon={getIcon()}
            style={styles.iconStyle}
            source={getIcon()}
            isSvg
          />
          <CommonText
            customTextStyle={{
              ...styles.titleStyle,
              ...(isDisabled ? styles.disabledText : {}),
            }}
          >
            {title}
          </CommonText>
        </CustomTouchableOpacity>
      ),
    },
  ];

  return <MultiColumn columns={rowCheckBox} columnStyle={styles.columnStyle} />;
};

CheckBox.defaultProps = {
  isDisabled: false,
  isSelected: false,
  isPartial: false,
};

CheckBox.propTypes = {
  handleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  isPartial: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CheckBox;
