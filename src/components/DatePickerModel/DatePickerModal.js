import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomImage from "../CustomImage";
import styles from "./DatePickerModal.style";
import images from "../../images";
import { useIntl } from "react-intl";
import classes from "../../theme/styles/CssClassProvider";
import CommonText from "../CommonText";
const accountComponentProp = classes["react_datepicker__input_container"];
function DatePickerModal({
  value,
  onChangeValue,
  placeholder,
  customTextInputOuterContainer,
  isError,
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

  // Function to format the selected date or return the placeholder
  const getDisplayValue = () => {
    if (value && value instanceof Date) {
      return value.toDateString();
    }
    return intl.formatMessage({ id: "label.select" });
  };

  return (
    <View
      style={[styles.container, open ? styles.focusedStyle : {}]}
      ref={wrapperRef}
    >
      <TouchableOpacity onPress={handleDropDown} style={styles.textButtonStyle}>
        <View style={{ flex: 1 }}>
          <CommonText
            customTextStyle={
              value ? styles.prefixStyle : styles.placeHolderText
            }
          >
            {getDisplayValue()}
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
            minDate={new Date()}
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
            dateFormat="MMMM d, yyyy"
          />
        </View>
      )}
    </View>
  );
}

export default DatePickerModal;
