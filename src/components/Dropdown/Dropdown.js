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

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: colors.secondaryGrey,
      primary: colors.lightBlue,
      primary50: colors.lightBlue,
      primary75: colors.lightBlue,
    },
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      ...(styles.control ? styles.control(state.isFocused) : {}),
      ...dropdownStyle,
    }),
    placeholder: (base) => ({
      ...base,
      ...placeholderStyle,
    }),
    singleValue: (base) => ({
      ...base,
      ...(styles.valueStyle || {}),
      ...dropdownStyle,
    }),
  };

  return (
    <div>
      <Select
        value={selectedOption}
        placeholder={placeholder}
        options={options}
        theme={customTheme}
        onChange={(selectedOption) => {
          onChange(selectedOption.value);
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
