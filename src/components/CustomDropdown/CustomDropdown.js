import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import styles from "./CustomDropdown.style";

const CustomDropdown = ({ dropdownIcon, onSelect, options, placeholder }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <CustomTouchableOpacity
        style={styles.dropdownButton}
        onPress={toggleDropdown}
      >
        <CommonText customTextStyle={styles.rowSelectedNumber}>
          {selectedOption ? selectedOption.label : placeholder}
        </CommonText>
        <CustomImage source={dropdownIcon} style={styles.iconTicket} />
      </CustomTouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <CustomTouchableOpacity onPress={() => handleOptionSelect(item)}>
                <CommonText customTextStyle={styles.optionText}>{item.label}</CommonText>
              </CustomTouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

CustomDropdown.defaultProps = {
  dropdownIcon: "",
  onSelect: () => {},
  options: [],
  placeholder: "Select an option",
};

CustomDropdown.propTypes = {
  dropdownIcon: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default CustomDropdown;
