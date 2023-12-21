import React from "react";
import colors from "../../assets/colors";

const Dropdown = ({
  onChange,
  data,
  value,
  dropdownStyle,
  valueField,
  labelField,
  placeholder,
  placeholderStyle
}) => {
  return (
    <select
      style={{
        padding: 14,
        backgroundColor: colors.white,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 4,
        ...dropdownStyle,
        ...(value === '' ? placeholderStyle : {})
      }
    }
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      placeholder={placeholder}
    >
      <option value="" disabled={value !== ''} hidden={value !== ''} selected={value === ''}>
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
