import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  ScrollView,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SearchView from "../SearchView";
import SvgUri from "../SvgUri";
import images from "../../images";
import styles from "./DropDownModal.style";

const DropDownModal = ({
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
  const [selectedOption, setSelectedOption] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const defaultOptions = options?.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
    url: String(option[urlField]),
  }));

  const data = menuOptions?.length ? menuOptions : defaultOptions;

  let selectedValue = data?.find((option) => option.value === String(value));

  const onSearch = (filteredData) => {
    setSelectedOption(filteredData);
  };

  const handleSearch = (formattedQuery) => {
    const filteredData = data?.filter((item) => {
      return item.label.toLowerCase().includes(formattedQuery.toLowerCase());
    });
    return filteredData;
  };

  return (
    <>
      {isMobileNumber ? (
        <CustomTouchableOpacity
          style={styles.prefixContainer}
          onPress={handleDropDown}
        >
          <SvgUri width={20} height={20} uri={selectedValue?.url} />
          <CommonText customTextStyle={styles.prefixStyle}>
            {selectedValue?.value || "+91"}
          </CommonText>
          <CustomImage source={images.iconDownArrow} style={styles.iconStyle} />
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
          headerText={placeholder}
          headerTextStyle={styles.headerText}
          customInnerContainerStyle={styles.modalInnerContainer}
        >
          {/* If the list items greater than 20 then we have to implement search */}
          {data?.length >= 20 && (
            <SearchView
              data={data}
              onSearch={onSearch}
              customSearchCriteria={handleSearch}
            />
          )}
          <ScrollView style={styles.optionMainContainer}>
            {data?.length >= 20 && !selectedOption?.length ? (
              <CommonText customContainerStyle={styles.nothingFoundText}>
                {intl.formatMessage({ id: "label.no_result_found" })}
              </CommonText>
            ) : (
              (selectedOption?.length > 0 ? selectedOption : data).map(
                (item, index) => (
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
                        value === item.value
                          ? styles.selectedOption
                          : styles.optionsText
                      }
                    >
                      {item.label}
                    </CommonText>
                  </TouchableOpacity>
                )
              )
            )}
          </ScrollView>
        </CustomModal>
      )}
    </>
  );
};

DropDownModal.defaultProps = {
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
  labelField: PropTypes.string.isRequired,
  isMobileNumber: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
  menuOptions: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valueField: PropTypes.string.isRequired,
  urlField: PropTypes.string.isRequired,
};

export default DropDownModal;
