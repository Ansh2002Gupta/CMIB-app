import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import { Button } from "react-native";
import DatePicker from "react-native-date-picker";
import styles from "./DatePickerModal.style";
import { useIntl } from "react-intl";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";

const DatePickerModal = ({
  placeholder,
  minData,
  maxData,
  value,
  onChangeValue,
}) => {
  const [open, setOpen] = useState(false);
  const handleDropDown = () => {
    setOpen(true);
  };
  return (
    <>
      <View style={[styles.container, open ? styles.focusedStyle : {}]}>
        <TouchableOpacity
          onPress={handleDropDown}
          style={styles.mobileTouchableStyle}
        >
          <View style={styles.textViewStyles}>
            <CommonText
              customContainerStyle={styles.mobileTextStyle}
              customTextStyle={styles.valueText}
            >
              {(value && value?.toDateString()) || placeholder}
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
        date={new Date(value)}
        mode={"date"}
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

export default DatePickerModal;
