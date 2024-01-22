import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomModal from "../CustomModal";
import CommonText from "../CommonText";
import SearchView from "../SearchView";
import styles from "./DropDownModal.style";
import images from "../../images";
import { useIntl } from "react-intl";

const DropDownModal = ({
  labelField,
  onChangeValue,
  options,
  placeholder,
  value,
  valueField,
}) => {
  const intl = useIntl();
  const [selectedOption, setSelectedOption] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const data = options.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
  }));
  let selectedValue = data.find((option) => option.value === String(value));

  const onSearch = (filteredData) => {
    setSelectedOption(filteredData);
  };

  const handleSearch = (formattedQuery) => {
    const filteredData = data.filter((item) => {
      return item.label.toLowerCase().includes(formattedQuery.toLowerCase());
    });
    return filteredData;
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
        >
          {/* If the list items greater than 20 then we have to implement search */}
          {data.length >= 20 && (
            <>
              <SearchView
                data={data}
                onSearch={onSearch}
                customSearchCriteria={handleSearch}
              />
            </>
          )}

          <ScrollView style={styles.optionMainContainer}>
            {data.length >= 20 && !selectedOption.length ? (
              <CommonText customContainerStyle={styles.nothingFoundText}>
                {intl.formatMessage({ id: "label.no_result_found" })}
              </CommonText>
            ) : (
              (selectedOption.length > 0 ? selectedOption : data).map(
                (item, index) => (
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
