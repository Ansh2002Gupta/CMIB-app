import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { View } from "@unthinkable/react-core-components";

import SvgUri from "../SvgUri";
import CommonText from "../CommonText";
import { customTheme, customStyles, styles } from "./Dropdown.style";

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
  urlField,
}) => {
  const options = data?.map((option) => ({
    value: String(option[valueField]),
    label: (
      <View style={styles.selectedView}>
        {urlField && (
          <SvgUri
            source={{
              uri: option[urlField] || "http://api.cmib.cloudzmall.com/in.svg",
            }}
            style={{ height: 20, width: 20 }}
          />
        )}
        <CommonText style={styles.labelField}>{option[labelField]}</CommonText>
      </View>
    ),
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
  urlField: "",
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
  urlField: PropTypes.string,
};

export default Dropdown;
