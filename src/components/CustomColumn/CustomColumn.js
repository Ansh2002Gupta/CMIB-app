import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./customColumn.style";

const CustomColumn = ({ 
  onPress, 
  title, 
  style, 
  textStyle, 
  disabled = false, 
  iconLeft, 
  iconRight 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, style, disabled && styles.disabledStyle]}
      disabled={disabled}
    >
      {!!iconLeft && <Image source={iconLeft} />}
      <CommonText customTextStyle ={[styles.textStyle, textStyle]} title={title}/>
      {!!iconRight && <Image source={iconRight}/>}
    </TouchableOpacity>
  );
};
CustomColumn.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
  iconLeft: null,
  iconRight: null,
};
CustomColumn.propTypes = {
  onPress: PropTypes.func.isRequired, 
  title: PropTypes.string.isRequired, 
  disabled: PropTypes.bool, 
};
export default CustomColumn;
