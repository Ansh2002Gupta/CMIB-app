import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { customTheme, customStyles } from "./Dropdown.style";

const Dropdown = ({
  data,
  dropdownStyle,
  isEditable,
  includeAllKeys,
  labelField,
  menuOptions,
  onChange,
  placeholder,
  placeholderStyle,
  value,
  valueField,
  selectAllField = false,
  onChangeDropDownText,
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
        isDisabled={!isEditable}
        styles={customStyles(dropdownStyle, placeholderStyle)}
        theme={customTheme}
        onInputChange={(inputValue) => {
          onChangeDropDownText && onChangeDropDownText(inputValue);
          //get the character entered by user here in inputValue
        }}
        onChange={(selectedItem) => {
          if (selectAllField) {
            onChange(selectedItem);
          } else {
            onChange(selectedItem.value);
          }
        }}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  data: [],
  dropdownStyle: {},
  isEditable: true,
  labelField: "",
  onChange: () => {},
  placeholder: "",
  placeholderStyle: {},
  value: "",
  valueField: "",
  urlField: "",
  selectAllField: false,
};

Dropdown.propTypes = {
  data: PropTypes.array,
  dropdownStyle: PropTypes.object,
  isEditable: PropTypes.bool,
  includeAllKeys: PropTypes.bool,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
  selectAllField: PropTypes.bool,
};

export default Dropdown;
