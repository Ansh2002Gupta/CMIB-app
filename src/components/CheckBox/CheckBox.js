import React from "react";
import PropTypes from "prop-types";

import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MultiColumn from "../../core/layouts/MultiColumn";
import Images from "../../images";
import styles from "./CheckBox.style";

const CheckBox = ({ handleCheckbox, id, isSelected, title }) => {
  const CheckIcon = Images.iconCheckbox;
  const UncheckIcon = Images.iconUnCheckbox;

  const rowCheckBox = [
    {
      content: (
        <CustomTouchableOpacity onPress={() => handleCheckbox(id)}>
          <CustomImage
            Icon={isSelected ? CheckIcon : UncheckIcon}
            style={styles.iconStyle}
            source={isSelected ? CheckIcon : UncheckIcon}
            isSvg
          />
          <CommonText customTextStyle={styles.titleStyle}>{title}</CommonText>
        </CustomTouchableOpacity>
      ),
    },
  ];

  return <MultiColumn columns={rowCheckBox} columnStyle={styles.columnStyle} />;
};

CheckBox.defaultProps = {
  isSelected: false,
};

CheckBox.propTypes = {
  handleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isSelected: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CheckBox;
