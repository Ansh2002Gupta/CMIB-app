import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { View } from "@unthinkable/react-core-components";

import { customTheme, customStyles } from "./Dropdown.style";
import CustomChipCard from "../CustomChipCard/CustomChipCard";

const Dropdown = ({
  data,
  dropdownStyle,
  isEditable,
  includeAllKeys,
  isMultiSelect,
  labelField,
  menuOptions,
  onChange,
  onDeleteSelectedItem,
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

  const [selectedItems, setSelectedItems] = useState([]);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const handleValueChange = (selectedOption) => {
    const selectedItemsList = [...selectedItems, selectedOption[0]];
    if (!selectedItems.find((item) => item.value === selectedOption[0].value)) {
      setSelectedItems((prev) => [...prev, ...selectedOption]);
      onChange(selectedItemsList.map((item) => item.value));
    }
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
        />
        {!!selectedItems.length && (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
        value={selectedOptions[0]}
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
