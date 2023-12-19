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
  onPress: PropTypes.func.isRequired, 
  title: PropTypes.string.isRequired, 
  style: PropTypes.oneOfType([ 
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  textStyle: PropTypes.oneOfType([ 
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool, 
  iconLeft: PropTypes.oneOfType([ 
    PropTypes.element,
    PropTypes.number, 
  ]),
  iconRight: PropTypes.oneOfType([ 
    PropTypes.element, 
    PropTypes.number, 
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
