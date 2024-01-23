import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, TouchableOpacity } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import SearchView from "../SearchView";
import images from "../../images";
import styles from "./DropDownModal.style";

const DropDownModal = ({
  labelField,
  onChangeValue,
  options,
  placeholder,
  value,
  valueField,
}) => {
  const data = options.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
  }));
  const intl = useIntl();
  const flatListRef = useRef();
  const [selectedOption, setSelectedOption] = useState(data);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const selectedIndex = data.findIndex((item) => item.value === value);
    if (selectedIndex > -1 && !!flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
    }
  }, [selectedOption]);

  const isSearchView = data.length >= 20;
  let selectedValue = data.find((option) => option.value === String(value));

  const handleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const onSearch = (filteredData) => {
    setSelectedOption(filteredData);
  };

  const handleSearch = (formattedQuery) => {
    const filteredData = data.filter((item) => {
      return item.label.toLowerCase().includes(formattedQuery.toLowerCase());
    });
    return filteredData;
  };

  const scrollToIndex = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      if (flatListRef.current !== null) {
        flatListRef.current.scrollToIndex({
          index: info.index,
          animated: true,
        });
      }
    });
  };

  const renderOptions = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onChangeValue(item.value);
          handleDropDown();
        }}
        style={styles.optionContainer}
      >
        <CommonText
          customTextStyle={
            value === item.value ? styles.selectedOption : styles.optionsText
          }
        >
          {item.label}
        </CommonText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={handleDropDown} style={styles.textButton}>
        <CommonText
          customTextStyle={value ? styles.valueText : styles.placeHolderText}
        >
          {selectedValue?.label || placeholder}
        </CommonText>
        <CustomImage source={images.iconDownArrow} style={styles.iconArrow} />
      </TouchableOpacity>
      {isDropDownOpen && (
        <CustomModal
          headerText={placeholder}
          headerTextStyle={styles.headerText}
          customInnerContainerStyle={styles.modalInnerContainer}
          onBackdropPress={handleDropDown}
        >
          {/* If the list items greater than 20 then we have to implement search */}
          {isSearchView && (
            <>
              <SearchView
                data={data}
                onSearch={onSearch}
                customSearchCriteria={handleSearch}
                customParentStyle={styles.searchView}
              />
            </>
          )}
          <FlatList
            ref={flatListRef}
            data={selectedOption}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOptions}
            onScrollToIndexFailed={scrollToIndex}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            ListEmptyComponent={
              <CommonText customContainerStyle={styles.nothingFoundText}>
                {intl.formatMessage({ id: "label.no_result_found" })}
              </CommonText>
            }
          />
        </CustomModal>
      )}
    </>
  );
};

DropDownModal.defaultProps = {
  labelField: "label",
  onChangeValue: () => {},
  options: [],
  placeholder: "",
  value: "",
  valueField: "value",
};

DropDownModal.propTypes = {
  labelField: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};

export default DropDownModal;
