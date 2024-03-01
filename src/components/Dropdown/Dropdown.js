import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { View } from "@unthinkable/react-core-components";

import CustomChipCard from "../CustomChipCard/CustomChipCard";
import { customTheme, customStyles, styles } from "./Dropdown.style";
import CheckBox from "../CheckBox";

const Dropdown = ({
  data,
  dropdownStyle,
  isEditable,
  includeAllKeys,
  isMultiSelect,
  indexNumber,
  labelField,
  menuOptions,
  onChange,
  onDeleteSelectedItem,
  placeholder,
  placeholderStyle,
  value,
  valueField,
  indexField,
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
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));

  const options = menuOptions || defaultOptions;

  const [selectedItems, setSelectedItems] = useState([]);

  const selectedOption = options?.find(
    (option) => option.value === String(value)
  );

  const handleValueChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);

    const itemIndex = selectedItems.findIndex(
      (item) => item.value === selectedOption[0].value
    );

    let updatedSelectedItems;
    if (itemIndex !== -1) {
      updatedSelectedItems = [
        ...selectedItems.slice(0, itemIndex),
        ...selectedItems.slice(itemIndex + 1),
      ];
      onDeleteSelectedItem(selectedOption.map((item) => item.value));
    } else {
      updatedSelectedItems = [...selectedItems, selectedOption[0]];
      console.log("else");
    }
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems.map((item) => item.value));
  };

  const handleRemoveItems = (itemToRemove) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.value !== itemToRemove.value)
    );
    const updatedValues = selectedItems.filter(
      (item) => item.value !== itemToRemove.value
    );
    onDeleteSelectedItem(updatedValues.map((item) => item.value));
  };

  const CheckboxOption = ({ data }) => {
    return (
      <View style={styles.multiSelectOptionStyle}>
        <CheckBox
          handleCheckbox={() => handleValueChange([data])}
          id={data.value}
          isSelected={
            selectedItems?.find((ele) => ele.value === data.value) ||
            data.index !== null
          }
          title={data?.label}
          isDisabled={data.index !== null && indexNumber !== data.index}
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
          styles={customStyles(dropdownStyle, placeholderStyle)}
          theme={customTheme}
          onChange={handleValueChange}
          isMulti
          components={{ Option: CheckboxOption }}
        />
        {!!selectedItems.length && (
          <View style={styles.multiSelectOptions}>
            {selectedItems.map((item, index) => (
              <CustomChipCard
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
    <div>
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
    </div>
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
};

export default Dropdown;
