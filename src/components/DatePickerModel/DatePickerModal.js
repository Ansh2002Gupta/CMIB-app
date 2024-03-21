import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import "react-datepicker/dist/react-datepicker.css";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import { useIntl } from "react-intl";
import { formatDate } from "../../utils/util";
import classes from "../../theme/styles/CssClassProvider";
import styles from "./DatePickerModal.style";

const accountComponentProp = classes["react_datepicker__input_container"];
function DatePickerModal({
  customTextInputOuterContainer,
  customStyles = {},
  format = "MMMM d, yyyy",
  isError,
  minDate = Date.now(),
  maxDate,
  onChangeValue,
  value,
}) {
  const [open, setOpen] = useState(false);
  const intl = useIntl();
  const handleDropDown = () => {
    setOpen((prev) => {
      return !prev;
    });
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setOpen(false));

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
              !value ? styles.placeholderTextStyle : styles.valueStyle
            }
          >
            {!value
              ? intl.formatMessage({ id: "label.select" })
              : formatDate(value)}
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
              onChangeValue(new Date(date));
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
  customStyles: PropTypes.object,
  format: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChangeValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default DatePickerModal;
