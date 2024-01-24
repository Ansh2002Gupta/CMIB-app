import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { customTheme, customStyles } from "./Dropdown.style";

const Dropdown = ({
  exclusiveKey,
  data,
  dropdownStyle,
  labelField,
  onChange,
  placeholder,
  placeholderStyle,
  value,
  valueField,
}) => {
  const options = data?.map((option) => ({
    value: String(option[valueField]),
    label: exclusiveKey
      ? `${String(option[labelField])} (${String(option[exclusiveKey])})`
      : String(option[labelField]),
  }));
  const selectedOption = options?.find(
    (option) => option.value === String(value)
  );

  return (
    <div>
      <Select
        value={selectedOption}
        placeholder={placeholder}
        options={options}
        styles={customStyles(dropdownStyle, placeholderStyle)}
        theme={customTheme}
        onChange={(selectedItem) => {
          onChange(selectedItem.value);
        }}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  data: [],
  dropdownStyle: {},
  exclusiveKey: "",
  labelField: "",
  onChange: () => {},
  placeholder: "",
  placeholderStyle: {},
  value: "",
  valueField: "",
};

Dropdown.propTypes = {
  data: PropTypes.array,
  dropdownStyle: PropTypes.object,
  exclusiveKey: PropTypes.string,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
};

export default Dropdown;
