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
      {iconLeft && <Image source={iconLeft} style={styles.iconStyle} />}
      <CommonText customTextStyle ={[styles.textStyle, textStyle]} title={title}/>
      {iconRight && <Image source={iconRight} style={styles.iconStyle} />}
    </TouchableOpacity>
  );
};

CustomColumn.propTypes = {
  onPress: PropTypes.func.isRequired, // Function called when the button is pressed
  title: PropTypes.string.isRequired, // Text displayed on the button
  style: PropTypes.oneOfType([ // Style applied to the button container
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  textStyle: PropTypes.oneOfType([ // Style applied to the button text
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool, // Indicates if the button is disabled
  iconLeft: PropTypes.oneOfType([ // Icon displayed on the left of the text
    PropTypes.element, // Use PropTypes.element for React elements
    PropTypes.number, // Use PropTypes.number for image require() calls
  ]),
  iconRight: PropTypes.oneOfType([ // Icon displayed on the right of the text
    PropTypes.element, // Use PropTypes.element for React elements
    PropTypes.number, // Use PropTypes.number for image require() calls
  ]),
};

CustomColumn.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
  iconLeft: null,
  iconRight: null,
};

export default CustomColumn;
