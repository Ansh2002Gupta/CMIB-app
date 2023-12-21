import React from "react";
import colors from "../../assets/colors";
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

export default Dropdown;
