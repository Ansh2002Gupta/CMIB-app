import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CheckBox from "../CheckBox";
import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SearchView from "../SearchView";
import SvgUri from "../SvgUri";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./DropDownModal.style";

const DropDownModal = ({
  customHeading,
  defaultValues,
  isEditable,
  isMobileNumber,
  isMultiSelect,
  labelField,
  onChangeValue,
  menuOptions,
  options,
  placeholder,
  value,
  valueField,
  urlField,
}) => {
  const intl = useIntl();
  const flatListRef = useRef();
  const [modalStyle, setModalStyle] = useState({});

  const defaultOptions = options?.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
    disabled: option?.isDisabled,
    url: String(option[urlField]),
  }));

  const data = menuOptions?.length ? menuOptions : defaultOptions;
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";
  const [selectedOption, setSelectedOption] = useState(data);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(defaultValues);

  useEffect(() => {
    const selectedIndex = data?.findIndex((item) => item.value === value);
    if (
      selectedIndex > -1 &&
      selectedIndex < selectedOption.length &&
      flatListRef.current
    ) {
      const timer = setTimeout(() => {
        scrollAnimation(selectedIndex);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, isDropDownOpen]);

  const handleValueChange = (selectedOption) => {
    const selectedItemsList = [...selectedItems, selectedOption[0]];
    if (!selectedItems.find((item) => item.value === selectedOption[0].value)) {
      setSelectedItems((prev) => [...prev, ...selectedOption]);
      onChangeValue(selectedItemsList.map((item) => item.value));
    }
  };

  const handleRemoveItems = (itemToRemove) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.value !== itemToRemove.value)
    );
  };

  const keyboardDidHideCallback = () => {
    if (isIosPlatform) {
      setModalStyle({ ...styles.modalInnerContainer });
    }
  };

  const keyboardDidShowCallback = (e) => {
    const keyboardHeight = e.endCoordinates.height;
    if (isIosPlatform) {
      setModalStyle(commonStyles.largeModalContainer(keyboardHeight));
    }
  };

  useKeyboardShowHideListener({
    keyboardDidHideCallback,
    keyboardDidShowCallback,
  });

  let selectedValue = data?.find((option) => option.value === String(value));

  const onSearch = (filteredData) => {
    setSelectedOption(filteredData);
  };

  const handleDropDown = () => {
    if (isEditable) {
      Keyboard.dismiss();
      setIsDropDownOpen((prev) => !prev);
    }
  };

  const scrollAnimation = (index) => {
    if (Platform.OS.toLowerCase() === "web") {
      flatListRef?.current?.scrollIntoViewIfNeeded({
        behavior: "smooth",
      });
    } else {
      flatListRef?.current?.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const handleSearch = (formattedQuery) => {
    const filteredData = data?.filter((item) => {
      return item.label.toLowerCase().includes(formattedQuery.toLowerCase());
    });
    return filteredData;
  };

  const scrollToIndex = (info) => {
    if (flatListRef.current && selectedOption.length > info.index) {
      scrollAnimation(info.index);
    }
  };

  const renderOptions = ({ item, index }) => {
    const isSelected = selectedItems.some(
      (selected) => selected.value === item.value
    );
    return isMultiSelect ? (
      <CheckBox
        id={item}
        title={item.label}
        handleCheckbox={(item) => {
          isSelected ? handleRemoveItems(item) : handleValueChange([item]);
        }}
        isDisabled={item.disabled}
        isSelected={isSelected}
      />
    ) : (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onChangeValue(item.value);
          handleDropDown();
        }}
        style={styles.optionContainer}
      >
        <SvgUri width={20} height={20} uri={item?.url} />
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

  const getItemLayout = (data, index) => ({
    length: 52,
    offset: 52 * index,
    index,
  });

  const renderEmptyFooter = () => {
    return (
      <CommonText customContainerStyle={styles.nothingFoundText}>
        {intl.formatMessage({ id: "label.no_result_found" })}
      </CommonText>
    );
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={data}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyFooter()}
        ref={flatListRef}
        renderItem={renderOptions}
        onScrollToIndexFailed={scrollToIndex}
      />
    );
  };

  if (isMultiSelect) {
    return (
      <>
        <TouchableOpacity
          onPress={handleDropDown}
          style={styles.textButton(isEditable)}
        >
          <CommonText customTextStyle={styles.placeHolderText}>
            {placeholder}
          </CommonText>
          <CustomImage source={images.iconDownArrow} style={styles.iconArrow} />
        </TouchableOpacity>
        {!!selectedItems.length && (
          <View style={styles.multiSelectOptions}>
            {selectedItems.map((item) => (
              <CustomChipCard
                message={item?.label}
                onPress={() => handleRemoveItems(item)}
              />
            ))}
          </View>
        )}
        {isDropDownOpen && (
          <CustomModal
            headerText={customHeading || placeholder}
            headerTextStyle={styles.headerText}
            customInnerContainerStyle={{
              ...styles.modalInnerContainer,
              ...modalStyle,
            }}
            onBackdropPress={handleDropDown}
          >
            {renderFlatList()}
          </CustomModal>
        )}
      </>
    );
  }

  return (
    <>
      {isMobileNumber ? (
        <CustomTouchableOpacity
          style={styles.prefixContainer}
          onPress={handleDropDown}
        >
          <SvgUri width={20} height={20} uri={selectedValue?.url} />
          <CommonText
            customTextStyle={
              selectedValue?.value ? styles.prefixStyle : styles.placeHolderText
            }
          >
            {selectedValue?.value || intl.formatMessage({ id: "label.select" })}
          </CommonText>
          <CustomImage source={images.iconDownArrow} style={styles.iconArrow} />
          <CustomImage source={images.iconDivider} style={styles.iconStyle} />
        </CustomTouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleDropDown}
          style={styles.textButton(isEditable)}
        >
          <CommonText
            customTextStyle={value ? styles.valueText : styles.placeHolderText}
          >
            {selectedValue?.label || placeholder}
          </CommonText>
          <CustomImage source={images.iconDownArrow} style={styles.iconArrow} />
        </TouchableOpacity>
      )}
      {isDropDownOpen && (
        <CustomModal
          headerText={customHeading || placeholder}
          headerTextStyle={styles.headerText}
          customInnerContainerStyle={{
            ...styles.modalInnerContainer,
            ...modalStyle,
          }}
          onBackdropPress={handleDropDown}
        >
          {/* If the list items greater than 20 then we have to implement search */}
          {data?.length >= 20 && (
            <SearchView
              data={data}
              onSearch={onSearch}
              customSearchCriteria={handleSearch}
              customParentStyle={styles.searchView}
            />
          )}
          {renderFlatList()}
        </CustomModal>
      )}
    </>
  );
};

DropDownModal.defaultProps = {
  customHeading: "",
  defaultValues: [],
  isEditable: true,
  labelField: "label",
  isMobileNumber: false,
  onChangeValue: () => {},
  menuOptions: {},
  options: [],
  placeholder: "",
  value: "",
  valueField: "value",
  urlField: "url",
};

DropDownModal.propTypes = {
  customHeading: PropTypes.string,
  defaultValues: PropTypes.array,
  isEditable: PropTypes.bool,
  labelField: PropTypes.string,
  isMobileNumber: PropTypes.bool,
  onChangeValue: PropTypes.func,
  menuOptions: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
};

export default DropDownModal;
