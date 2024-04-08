import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import { useIntl } from "react-intl";
import { formatDate } from "../../utils/util";
import styles from "./DatePickerModal.style";

const DatePickerModal = ({
  customTextInputOuterContainer,
  customStyles = {},
  format = "date",
  isError,
  minDate,
  maxDate,
  onChangeValue,
  value,
  datePickerViewStyle,
}) => {
  const [open, setOpen] = useState(false);
  const handleDropDown = () => {
    setOpen(true);
  };
  const intl = useIntl();
  const errorStyle = isError ? styles.invalidInput : {};
  return (
    <>
      <View
        style={[
          styles.container,
          open ? styles.focusedStyle : {},
          customStyles,
          errorStyle,
        ]}
      >
        <TouchableOpacity
          onPress={handleDropDown}
          style={styles.mobileTouchableStyle}
        >
          <View
            style={{
              ...styles.textViewStyles,
              ...customTextInputOuterContainer,
            }}
          >
            <CommonText
              customContainerStyle={styles.mobileTextStyle}
              customTextStyle={
                !value ? styles.placeholderTextStyle : styles.valueStyle
              }
            >
              {!value
                ? intl.formatMessage({ id: "label.select" })
                : formatDate(value)}
            </CommonText>
          </View>
          <View style={styles.imageContainer}>
            <CustomImage
              source={images.iconCalendar}
              style={styles.iconArrow}
            />
          </View>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={new Date(!value ? new Date() : value)}
        mode={format}
        minimumDate={minDate ? new Date(minDate) : ""}
        maximumDate={maxDate ? new Date(maxDate) : ""}
        onConfirm={(date) => {
          setOpen(false);
          onChangeValue(date);
        }}
        style={datePickerViewStyle}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

DatePickerModal.propTypes = {
  customStyles: PropTypes.object,
  format: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChangeValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default DatePickerModal;
