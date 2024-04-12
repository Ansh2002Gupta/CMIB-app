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

import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import CheckBox from "../CheckBox";
import SearchView from "../SearchView";
import SvgUri from "../SvgUri";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./DropDownModal.style";

const DropDownModal = ({
  customHeading,
  isEditable,
  isMobileNumber,
  isMultiSelect,
  isSelected,
  indexNumber,
  indexField,
  isSingleMutliSelect,
  labelField,
  onChangeValue,
  menuOptions,
  options,
  placeholder,
  selectedItems,
  value,
  valueField,
  urlField,
  selectAllField,
  includeAllKeys,
  onChangeDropDownText,
  dropdownStyle,
  customHandleBlur,
}) => {
  const intl = useIntl();
  const flatListRef = useRef();
  const isFirstTimeRef = useRef(true);
  const [modalStyle, setModalStyle] = useState({});

  const getAllKeys = (option) => {
    let finalObj = {};
    Object.keys(option).forEach((key) => {
      if (key !== valueField && key !== labelField) {
        finalObj = { ...finalObj, [key]: option[key] };
      }
    });
    return finalObj;
  };

  const defaultOptions = options?.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
    url: String(option[urlField]),
    index: option[indexField],
    isSelected: option[isSelected],
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));

  const data = menuOptions?.length ? menuOptions : defaultOptions;
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";
  const [selectedOption, setSelectedOption] = useState(data);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const selectedIndex = data?.findIndex((item) => item.value === value);
    if (
      selectedIndex > -1 &&
      selectedIndex < selectedOption?.length &&
      flatListRef.current
    ) {
      const timer = setTimeout(() => {
        scrollAnimation(selectedIndex);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, isDropDownOpen]);
  useEffect(() => {
    if (!isDropDownOpen && !isFirstTimeRef.current) {
      customHandleBlur && customHandleBlur();
    } else {
      isFirstTimeRef.current = false;
    }
  }, [isDropDownOpen]);

  const handleValueChange = (selectedOption) => {
    onChangeValue(selectAllField ? selectedOption : selectedOption.value);
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
      onChangeDropDownText && onChangeDropDownText("");
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
      return item?.label
        ?.toLowerCase()
        ?.includes(formattedQuery?.toLowerCase());
    });
    return filteredData;
  };

  const scrollToIndex = (info) => {
    if (flatListRef.current && selectedOption?.length > info.index) {
      scrollAnimation(info.index);
    }
  };

  const renderOptions = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          if (selectAllField) {
            onChangeValue(item);
          } else {
            onChangeValue(item.value);
          }
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
        data={!!onChangeDropDownText ? data : selectedOption}
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
          style={{
            ...styles.textButton(isEditable),
            ...dropdownStyle,
          }}
        >
          <CommonText
            customTextStyle={{
              ...(value ? styles.valueText : styles.placeHolderText),
            }}
            customContainerStyle={styles.customContainerStyle}
          >
            {placeholder}
          </CommonText>
          <CustomImage source={images.iconDownArrow} style={styles.iconArrow} />
        </TouchableOpacity>
        {isSingleMutliSelect ? (
          <View style={styles.multiSelectOptions}>
            {options
              ?.filter((item) => item.isSelected)
              ?.map((item, index) => (
                <CustomChipCard
                  key={index}
                  message={item?.name || item?.label}
                  onPress={() => handleValueChange(item)}
                />
              ))}
          </View>
        ) : (
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
            {(data?.length >= 20 || onChangeDropDownText) && (
              <SearchView
                data={data}
                onSearch={onSearch}
                customSearchCriteria={handleSearch}
                customParentStyle={styles.searchView}
                onChangeDropDownText={onChangeDropDownText}
              />
            )}
            <FlatList
              data={data}
              style={styles.modalContainer}
              getItemLayout={getItemLayout}
              initialNumToRender={10}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={renderEmptyFooter()}
              ref={flatListRef}
              renderItem={({ item, index }) => {
                const isDisabled =
                  item.index !== null && indexNumber !== item.index;
                return (
                  <View
                    style={{
                      ...styles.multiSelectOptionStyle,
                      ...(isDisabled && styles.multiSelectOptionStyleDisabled),
                    }}
                  >
                    <CheckBox
                      customTextStyle={styles.checkBoxTextStyle}
                      handleCheckbox={() => handleValueChange(item)}
                      id={item.value}
                      isSelected={
                        item?.isSelected ||
                        (item.index && item.index !== null) ||
                        (!isSelected &&
                          selectedItems.findIndex(
                            (items) => items.id === item.id
                          ) !== -1)
                      }
                      title={item?.label}
                      isDisabled={isDisabled}
                    />
                  </View>
                );
              }}
              onScrollToIndexFailed={scrollToIndex}
            />
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
          style={{ ...styles.textButton(isEditable), ...dropdownStyle }}
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
          {(data?.length >= 20 || onChangeDropDownText) && (
            <SearchView
              data={data}
              onSearch={onSearch}
              customSearchCriteria={handleSearch}
              customParentStyle={styles.searchView}
              onChangeDropDownText={onChangeDropDownText}
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
  dropdownStyle: {},
  isEditable: true,
  labelField: "label",
  includeAllKeys: false,
  isMobileNumber: false,
  isSingleMutliSelect: false,
  onChangeValue: () => {},
  selectAllField: false,
  menuOptions: {},
  options: [],
  placeholder: "",
  value: "",
  valueField: "value",
  urlField: "url",
  selectAllField: false,
};

DropDownModal.propTypes = {
  customHeading: PropTypes.string,
  customHandleBlur: PropTypes.func,
  dropdownStyle: PropTypes.object,
  isEditable: PropTypes.bool,
  labelField: PropTypes.string,
  isMobileNumber: PropTypes.bool,
  isSingleMutliSelect: PropTypes.bool,
  includeAllKeys: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onChangeDropDownText: PropTypes.func,
  menuOptions: PropTypes.object,
  selectAllField: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
  selectAllField: PropTypes.bool,
};

export default DropDownModal;
