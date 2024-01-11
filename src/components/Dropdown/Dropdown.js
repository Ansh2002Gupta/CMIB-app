import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
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
  const options = data.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
  }));
  const selectedOption = options.find((option) => option[valueField] === value);

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedOption}
        placeholder={placeholder}
        options={options}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: colors.secondaryGrey,
            primary: colors.lightBlue,
            primary50: colors.lightBlue,
            primary75: colors.lightBlue,
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...styles.control(state.isFocused),
            ...dropdownStyle,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            ...placeholderStyle,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            ...styles.valueStyle,
            ...dropdownStyle,
          }),
        }}
        onChange={(selectedOption) => {
          handleChange(selectedOption.value);
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
  value: PropTypes.string,
  valueField: PropTypes.string,
};

export default Dropdown;
