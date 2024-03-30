import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { View } from "@unthinkable/react-core-components";

import CheckBox from "../CheckBox";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import { customTheme, customStyles, styles } from "./Dropdown.style";

const Dropdown = ({
  data,
  dropdownStyle,
  isEditable,
  includeAllKeys,
  isMultiSelect,
  isSelected,
  indexNumber,
  labelField,
  menuOptions,
  onChange,
  placeholder,
  placeholderStyle,
  selectedItems,
  value,
  valueField,
  selectAllField = false,
  onChangeDropDownText,
  indexField,
  customHandleBlur,
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
    index: option[indexField],
    isSelected: option[isSelected],
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));

  const options = menuOptions || defaultOptions;

  const selectedOption = options?.find(
    (option) => option.value === String(value)
  );

  const handleValueChange = (selectedOption) => {
    if (!Array.isArray(selectedOption)) {
      if (selectAllField) {
        onChange(selectedOption);
      } else {
        onChange(selectedOption.value);
      }
    }
  };

  const CheckboxOption = ({ data }) => {
    const isDisabled = data.index !== null && indexNumber !== data.index;
    return (
      <View
        style={{
          ...styles.multiSelectOptionStyle,
          ...(isDisabled && styles.multiSelectOptionStyleDisabled),
        }}
      >
        <CheckBox
          customTextStyle={styles.checkBoxTextStyle}
          handleCheckbox={() => handleValueChange(data)}
          id={data.value}
          isSelected={
            data?.isSelected ||
            (data.index && data.index !== null) ||
            (!isSelected &&
              selectedItems.findIndex((item) => item.id === data.id) !== -1)
          }
          title={data?.label}
          isDisabled={isDisabled}
        />
      </View>
    );
  };

  if (isMultiSelect) {
    return (
      <div>
        <Select
          value={""}
          placeholder={placeholder}
          options={options}
          onBlur={customHandleBlur}
          isDisabled={!isEditable}
          styles={customStyles(dropdownStyle, placeholderStyle, !isEditable)}
          theme={customTheme}
          onInputChange={(inputValue) => {
            onChangeDropDownText && onChangeDropDownText(inputValue);
          }}
          onChange={handleValueChange}
          isMulti
          components={{ Option: CheckboxOption }}
        />
        {!!selectedItems.length && (
          <View style={styles.multiSelectOptions}>
            {selectedItems?.map((item, index) => (
              <CustomChipCard
                key={index}
                message={item?.name ?? item.value}
                onPress={() => handleValueChange(item)}
              />
            ))}
          </View>
        )}
      </div>
    );
  }
  return (
    <Select
      value={selectedOption || ""}
      placeholder={placeholder}
      options={options}
      onBlur={customHandleBlur}
      isDisabled={!isEditable}
      styles={customStyles(dropdownStyle, placeholderStyle, !isEditable)}
      theme={customTheme}
      onInputChange={(inputValue) => {
        onChangeDropDownText && onChangeDropDownText(inputValue);
      }}
      onChange={handleValueChange}
    />
  );
};

Dropdown.defaultProps = {
  data: [],
  dropdownStyle: {},
  isEditable: true,
  labelField: "",
  onChange: () => {},
  onDeleteSelectedItem: () => {},
  placeholder: "",
  placeholderStyle: {},
  value: "",
  valueField: "",
  urlField: "",
  selectAllField: false,
  isMultiSelect: false,
};

Dropdown.propTypes = {
  data: PropTypes.array,
  dropdownStyle: PropTypes.object,
  isEditable: PropTypes.bool,
  includeAllKeys: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  onDeleteSelectedItem: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
  selectAllField: PropTypes.bool,
};

export default Dropdown;
