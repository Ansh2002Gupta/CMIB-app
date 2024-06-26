import React, { useContext } from "react";
import { ColorModeContext, useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import MultiColumn from "../../core/layouts/MultiColumn";
import Images from "../../images";
import { View } from "@unthinkable/react-core-components";
import TouchableImage from "../TouchableImage";
import getStyles from "./CheckBox.style";

const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const CheckBox = ({
  customTextStyle,
  handleCheckbox,
  id,
  isDisabled,
  isEditable,
  isPartial,
  isSelected,
  title,
  iconCheck,
  iconUnCheck,
  checkBoxTextStyle,
  style,
  isFillSpace,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const colorMode = useContext(ColorModeContext).colorMode;

  const CheckIcon = () => {
    if (iconCheck) {
      return iconCheck;
    }
    if (colorMode === "dark") {
      return Images.checkboxRed;
    }
    return Images.iconCheckbox;
  };

  const PartialIcon = () => {
    if (colorMode === "dark") {
      return Images.partialSelectIcon;
    }
    return Images.iconPartial;
  };

  const UncheckIcon = iconUnCheck ? iconUnCheck : Images.iconUnCheckbox;
  const DisabledCheckBoxIcon = Images.iconDisabledCheck;

  const getCheckBoxIcon = () => {
    if (isDisabled) {
      return DisabledCheckBoxIcon;
    }
    if (isPartial) {
      return PartialIcon();
    }
    if (isSelected) {
      return CheckIcon();
    }
    return UncheckIcon;
  };

  const rowCheckBox = [
    {
      isFillSpace,
      content: (
        <View style={{ ...styles.containerStyle, ...customTextStyle }}>
          <TouchableImage
            hitSlop={hitSlop}
            Icon={getCheckBoxIcon()}
            style={isEditable ? styles.iconStyle : styles.disabledIconStyle}
            source={getCheckBoxIcon()}
            isSvg
            disabled={isDisabled}
            onPress={() => handleCheckbox(id)}
          />
          <CommonText
            customTextStyle={{
              ...styles.titleStyle,
              ...(isDisabled ? styles.disabledText : {}),
              ...checkBoxTextStyle,
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
  isEditable: true,
  isPartial: false,
  isSelected: false,
  style: {},
};

CheckBox.propTypes = {
  customTextStyle: PropTypes.object,
  handleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDisabled: PropTypes.bool,
  isEditable: PropTypes.bool,
  isPartial: PropTypes.bool,
  isSelected: PropTypes.bool,
  title: PropTypes.string.isRequired,
  iconCheck: PropTypes.node,
  iconUnCheck: PropTypes.node,
  style: PropTypes.object,
};

export default CheckBox;
