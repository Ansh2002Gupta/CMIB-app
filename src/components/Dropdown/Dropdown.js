import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { customTheme, customStyles } from "./Dropdown.style";

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
  const options = data.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
  }));
  const selectedOption = options.find(
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
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
};

export default Dropdown;
