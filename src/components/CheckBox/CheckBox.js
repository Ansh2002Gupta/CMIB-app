import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import MultiColumn from "../../core/layouts/MultiColumn";
import Images from "../../images";
import styles from "./CheckBox.style";
import { View } from "@unthinkable/react-core-components";
import TouchableImage from "../TouchableImage";

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
  style,
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
        <View style={styles.containerStyle}>
          <TouchableImage
            Icon={getCheckBoxIcon()}
            style={styles.iconStyle}
            source={getCheckBoxIcon()}
            isSvg
            disabled={isDisabled}
            onPress={() => handleCheckbox(id)}
          />
          <CommonText
            customTextStyle={{
              ...styles.titleStyle,
              ...(isDisabled ? styles.disabledText : {}),
              ...customTextStyle,
            }}
            customContainerStyle={styles.alignJustifyCenter}
          >
            {title}
          </CommonText>
        </View>
      ),
    },
  ];

  return (
    <MultiColumn
      columns={rowCheckBox}
      columnStyle={styles.columnStyle}
      style={style}
    />
  );
};

CheckBox.defaultProps = {
  customTextStyle: {},
  isDisabled: false,
  isPartial: false,
  isSelected: false,
  iconCheck: Images.iconCheckbox,
  iconUnCheck: Images.iconUnCheckbox,
  style: {},
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
  style: PropTypes.object,
};

export default CheckBox;
