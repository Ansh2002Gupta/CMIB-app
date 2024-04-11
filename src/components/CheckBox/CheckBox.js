import React from "react";
import PropTypes from "prop-types";

import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MultiColumn from "../../core/layouts/MultiColumn";
import Images from "../../images";
import styles from "./CheckBox.style";

const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const CheckBox = ({
  customTextStyle,
  handleCheckbox,
  id,
  isDisabled,
  isPartial,
  isSelected,
  title,
  iconCheck,
  iconUnCheck,
  checkBoxTextStyle,
}) => {
  const CheckIcon = iconCheck ? iconCheck : Images.iconCheckbox;
  const UncheckIcon = iconUnCheck ? iconUnCheck : Images.iconUnCheckbox;
  const PartialIcon = Images.iconPartial;
  const DisabledCheckBoxIcon = Images.iconDisabledCheck;

  const getCheckBoxIcon = () => {
    if (isDisabled) {
      return DisabledCheckBoxIcon;
    }
    if (isPartial) {
      return PartialIcon;
    }
    if (isSelected) {
      return CheckIcon;
    }
    return UncheckIcon;
  };

  const rowCheckBox = [
    {
      content: (
        <CustomTouchableOpacity
          disabled={isDisabled}
          onPress={() => handleCheckbox(id)}
          style={styles.customTouchableOpacity}
          hitSlop={hitSlop}
        >
          <CustomImage
            Icon={getCheckBoxIcon()}
            style={styles.iconStyle}
            source={getCheckBoxIcon()}
            isSvg
          />
          <CommonText
            customTextStyle={{
              ...styles.titleStyle,
              ...(isDisabled ? styles.disabledText : {}),
              ...customTextStyle,
              ...checkBoxTextStyle,
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
  customTextStyle: {},
  isDisabled: false,
  isPartial: false,
  isSelected: false,
  iconCheck: Images.iconCheckbox,
  iconUnCheck: Images.iconUnCheckbox,
};

CheckBox.propTypes = {
  customTextStyle: PropTypes.object,
  handleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDisabled: PropTypes.bool,
  isPartial: PropTypes.bool,
  isSelected: PropTypes.bool,
  title: PropTypes.string.isRequired,
  iconCheck: PropTypes.node,
  iconUnCheck: PropTypes.node,
};

export default CheckBox;
