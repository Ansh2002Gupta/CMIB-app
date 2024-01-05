import React from "react";
import PropTypes from "prop-types";

import styles from "./Dropdown.style";

const Dropdown = ({
  data,
  dropdownStyle,
  labelField,
  onChange,
  placeholder,
  placeholderStyle,
  value,
  valueField,
}) => {
  return (
    <select
      style={{
        ...styles.dropdownContainer,
        ...dropdownStyle,
        ...(value === "" ? placeholderStyle : {}),
      }}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
    >
      <option
        value=""
        disabled={value !== ""}
        hidden={value !== ""}
        selected={value === ""}
      >
        {placeholder || ""}
      </option>
      {data.map((option, index) => (
        <option key={index} value={option[valueField]}>
          {option[labelField]}
        </option>
      ))}
    </select>
  );
};

Dropdown.defaultProps = {
  data: [],
  dropdownStyle: {},
  labelField: "",
  onChange: ()=>{},
  placeholder: "",
  placeholderStyle: {},
  value: "",
  valueField: ""
};

Dropdown.propTypes = {
  data: PropTypes.array,
  dropdownStyle: PropTypes.object,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.string,
  valueField: PropTypes.string,
};

export default Dropdown;
