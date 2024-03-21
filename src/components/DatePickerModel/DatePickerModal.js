import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomImage from "../CustomImage";
import styles from "./DatePickerModal.style";
import images from "../../images";
import { useIntl } from "react-intl";
import classes from "../../theme/styles/CssClassProvider";
import CommonText from "../CommonText";
import { getDisplayValue } from "../../utils/util";
import PropTypes from "prop-types";

const accountComponentProp = classes["react_datepicker__input_container"];
function DatePickerModal({
  value,
  onChangeValue,
  customTextInputOuterContainer,
  isError,
  format = "MMMM d, yyyy",
  minDate = Date.now(),
  maxDate,
  customStyles = {},
}) {
  const [open, setOpen] = useState(false);
  const intl = useIntl();
  const handleDropDown = () => {
    setOpen((prev) => {
      return !prev;
    });
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  const errorStyle = isError ? styles.invalidInput : {};

  return (
    <View
      style={[
        styles.container,
        open ? styles.focusedStyle : {},
        errorStyle,
        customStyles,
      ]}
      ref={wrapperRef}
    >
      <TouchableOpacity onPress={handleDropDown} style={styles.textButtonStyle}>
        <View style={{ ...styles.flex1, ...customTextInputOuterContainer }}>
          <CommonText
            customTextStyle={
              value ? styles.prefixStyle : styles.placeHolderText
            }
          >
            {getDisplayValue(value, intl)}
          </CommonText>
        </View>
        <View style={styles.iconContainer}>
          <CustomImage source={images.iconCalendar} style={styles.iconArrow} />
        </View>
      </TouchableOpacity>
      {open && (
        <View style={styles.datePickerContainerStyle}>
          <DatePicker
            selected={value}
            minDate={minDate}
            maxDate={maxDate}
            portalId="my-popper"
            className={accountComponentProp}
            onChange={(date) => {
              let datetoBeFormatted = new Date(date);
              onChangeValue(datetoBeFormatted);
              setOpen(false);
            }}
            showMonthDropdown
            showYearDropdown
            inline
            dropdownMode="select"
            dateFormat={format}
          />
        </View>
      )}
    </View>
  );
}

DatePickerModal.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChangeValue: PropTypes.func.isRequired,
  format: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  customStyles: PropTypes.object,
  // ...otherProps propTypes
};

export default DatePickerModal;
