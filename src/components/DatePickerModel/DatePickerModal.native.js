import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { useTheme } from "@unthinkable/react-theme";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import { useIntl } from "react-intl";
import { convertToTime, formatDate } from "../../utils/util";
import getStyles from "./DatePickerModal.style";

const DatePickerModal = ({
  customTextInputOuterContainer,
  customStyles = {},
  format = "DD/MM/YYYY",
  isError,
  minDate,
  maxDate,
  onChangeValue,
  showTimeSelect,
  value,
  datePickerViewStyle,
  mode = "date",
  datePickerContainer,
}) => {
  const [open, setOpen] = useState(false);
  const handleDropDown = () => {
    setOpen(true);
  };
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const errorStyle = isError ? styles.invalidInput : {};

  return (
    <>
      <View
        style={[
          styles.container,
          open ? styles.focusedStyle : {},
          errorStyle,
          customStyles,
          datePickerContainer,
        ]}
      >
        <TouchableOpacity
          onPress={handleDropDown}
          style={{
            ...styles.mobileTouchableStyle,
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
              : showTimeSelect
              ? convertToTime({
                  dateString: value,
                  format24Hour: false,
                })
              : formatDate(value, format)}
          </CommonText>
          <View style={styles.imageContainer}>
            <CustomImage
              source={showTimeSelect ? images.iconClock : images.iconCalendar}
              style={styles.iconArrow}
            />
          </View>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={new Date(!value ? new Date() : value)}
        mode={mode}
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
