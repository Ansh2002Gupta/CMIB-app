import React, { useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import Select from "react-select";

import CheckBox from "../CheckBox";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import { customTheme, customStyles, styles } from "./Dropdown.style";

const Dropdown = ({
  data,
  defaultValues,
  dropdownStyle,
  isEditable,
  includeAllKeys,
  isMultiSelect,
  handleMultiSelect,
  labelField,
  menuOptions,
  onChange,
  placeholder,
  placeholderStyle,
  value,
  valueField,
}) => {
  const [selectedItems, setSelectedItems] = useState(defaultValues);
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
    disabled: option?.isDisabled,
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));

  const options = menuOptions || defaultOptions;
  const selectedOption = options?.find(
    (option) => option.value === String(value)
  );

  const handleValueChange = (selectedOption) => {
    const itemIndex = selectedItems.findIndex(
      (item) => item.value === selectedOption[0].value
    );

    let updatedSelectedItems;
    if (itemIndex !== -1) {
      updatedSelectedItems = [
        ...selectedItems.slice(0, itemIndex),
        ...selectedItems.slice(itemIndex + 1),
      ];
    } else {
      updatedSelectedItems = [...selectedItems, selectedOption[0]];
    }
    setSelectedItems(updatedSelectedItems);
    handleMultiSelect && handleMultiSelect(updatedSelectedItems);
  };

  const handleRemoveItems = (itemToRemove) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.value !== itemToRemove.value
    );
    setSelectedItems(newSelectedItems);
    handleMultiSelect && handleMultiSelect(newSelectedItems);
  };

  const CheckboxOption = ({ data }) => {
    return (
      <View style={styles.multiSelectOptionStyle}>
        <CheckBox
          handleCheckbox={() => handleValueChange([data])}
          id={data.value}
          isDisabled={data.disabled}
          isSelected={selectedItems?.find((ele) => ele.value == data.value)}
          title={data?.label}
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
          isDisabled={!isEditable}
          styles={customStyles(dropdownStyle, placeholderStyle, !isEditable)}
          theme={customTheme}
          onChange={handleValueChange}
          isMulti
          components={{ Option: CheckboxOption }}
        />
        {!!selectedItems.length && (
          <View style={styles.multiSelectOptions}>
            {selectedItems.map((item, index) => (
              <CustomChipCard
                key={index}
                message={item?.label}
                onPress={() => handleRemoveItems(item)}
              />
            ))}
          </View>
        )}
      </div>
    );
  }
  return (
    <Select
      value={selectedOption}
      placeholder={placeholder}
      options={options}
      isDisabled={!isEditable}
      styles={customStyles(dropdownStyle, placeholderStyle)}
      theme={customTheme}
      onChange={(selectedItem) => {
        onChange(selectedItem.value);
      }}
    />
  );
};

Dropdown.defaultProps = {
  data: [],
  defaultValues: [],
  dropdownStyle: {},
  isEditable: true,
  isMultiSelect: false,
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
  defaultValues: PropTypes.array,
  dropdownStyle: PropTypes.object,
  isEditable: PropTypes.bool,
  includeAllKeys: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
};

export default Dropdown;
