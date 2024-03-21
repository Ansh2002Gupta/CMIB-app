import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import styles from "./DatePickerModal.style";
import { useIntl } from "react-intl";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import { getDisplayValue } from "../../utils/util";
import PropTypes from "prop-types";

const DatePickerModal = ({
  value,
  onChangeValue,
  customTextInputOuterContainer,
  isError,
  format = "date",
  minDate,
  maxDate,
  customStyles = {},
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
              customTextStyle={styles.valueText}
            >
              {getDisplayValue(value, intl)}
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
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
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
