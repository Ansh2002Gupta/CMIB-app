import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { customTheme, customStyles } from "./Dropdown.style";

const Dropdown = ({
  data,
  dropdownStyle,
  includeAllKeys,
  labelField,
  menuOptions,
  onChange,
  placeholder,
  placeholderStyle,
  value,
  valueField,
}) => {
  const getAllKeys = (option) => {
    let finalObj = {};
    Object.keys(option).forEach((key) => {
      if (key !== valueField && key !== labelField) {
        finalObj = { ...finalObj, [key]: option[key] };
      }
    });
    return finalObj;
  };

  const defaultOptions = data?.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));

  const options = menuOptions || defaultOptions;

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
  labelField: "",
  onChange: () => {},
  placeholder: "",
  placeholderStyle: {},
  value: "",
  valueField: "",
  urlField: "",
};

Dropdown.propTypes = {
  data: PropTypes.array,
  dropdownStyle: PropTypes.object,
  includeAllKeys: PropTypes.bool,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
};

export default Dropdown;
