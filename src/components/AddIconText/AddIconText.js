import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";

import { TouchableOpacity } from "@unthinkable/react-core-components";

import CardComponent from "../CardComponent/CardComponent";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import getStyles from "./AddIconText.style";

const AddIconText = ({ customViewStyle, label, onPress }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={customViewStyle}>
      <CardComponent customStyle={styles.customCardComponentStyle}>
        <CustomImage
          Icon={images.iconAdd}
          isSvg
          source={images.iconAdd}
          style={styles.imageStyle}
        />
        <CommonText
          customTextStyle={styles.addDesignationTextStyle}
          fontWeight="600"
        >
          {label}
        </CommonText>
      </CardComponent>
    </TouchableOpacity>
  );
};

AddIconText.defaultProps = {
  customViewStyle: {},
};

AddIconText.propTypes = {
  customViewStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AddIconText;
