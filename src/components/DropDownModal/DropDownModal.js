import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SearchView from "../SearchView";
import SvgUri from "../SvgUri";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./DropDownModal.style";

const DropDownModal = ({
  customHeading,
  isMobileNumber,
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
    url: String(option[urlField]),
  }));

  const data = menuOptions?.length ? menuOptions : defaultOptions;
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";
  const [selectedOption, setSelectedOption] = useState(data);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
    Keyboard.dismiss();
    setIsDropDownOpen((prev) => !prev);
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
    return (
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
        <TouchableOpacity onPress={handleDropDown} style={styles.textButton}>
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
          <FlatList
            data={selectedOption}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={renderEmptyFooter()}
            ref={flatListRef}
            renderItem={renderOptions}
            onScrollToIndexFailed={scrollToIndex}
          />
        </CustomModal>
      )}
    </>
  );
};

DropDownModal.defaultProps = {
  customHeading: "",
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
