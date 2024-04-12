import React from "react";
import { Platform, View } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import { TwoColumn } from "../../core/layouts";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import {
  DATA_FORMATTER_LOCALES,
  DATA_FORMATTER_OPTIONS,
} from "../../constants/constants";
import images from "../../images";
import styles from "./TimeSlotLable.styles";

const TimeSlotLabel = ({
  labelId,
  dataObj,
  onSelect,
  selectedDateLabel,
  showPrimary,
}) => {
  const isWeb = Platform.OS.toLowerCase() === "web";

  const getData = (dateType) => {
    const date = new Date(dateType);
    const formattedDate = new Intl.DateTimeFormat(
      DATA_FORMATTER_LOCALES[0],
      DATA_FORMATTER_OPTIONS
    ).format(date);
    const dateTokens = formattedDate.split(" ");
    const month = dateTokens[0];
    let day = dateTokens[1];
    const time = dateTokens[3];
    const meridiem = dateTokens[4];
    switch (+day) {
      case 1:
        day += "st";
        break;
      case 2:
        day += "nd";
        break;
      case 3:
        day += "rd";
        break;
      default:
        day += "th";
    }
    const finalData = `${day} ${month}, ${time} ${meridiem}`;
    return finalData;
  };

  return (
    <CustomTouchableOpacity
      onPress={() =>
        onSelect({
          id: labelId,
          isPrimary: showPrimary,
          mode: showPrimary ? dataObj?.type : dataObj?.alternate_type,
        })
      }
      disabled={false}
      style={[
        styles.outerContainer,
        selectedDateLabel?.id === dataObj?.id &&
        selectedDateLabel?.isPrimary === showPrimary
          ? styles.selectedOuterContainer
          : {},
      ]}
    >
      <TwoColumn
        leftSection={
          <TouchableImage
            isSvg={true}
            onPress={() =>
              onSelect({
                id: labelId,
                isPrimary: showPrimary,
                mode: showPrimary ? dataObj?.type : dataObj?.alternate_type,
              })
            }
            source={
              selectedDateLabel?.id === dataObj?.id &&
              selectedDateLabel?.isPrimary === showPrimary
                ? images.iconSelectedSolidCircle
                : images.iconSelectCircle
            }
            style={styles.fixedWidthHeight}
          />
        }
        rightSection={
          <View>
            <CommonText
              customContainerStyle={styles.dateContainer}
              customTextStyle={styles.dateStyling}
              fontWeight="500"
            >
              {showPrimary
                ? !!dataObj?.primary_schedule
                  ? getData(dataObj?.primary_schedule)
                  : "-"
                : !!dataObj?.alternate_schedule
                ? getData(dataObj?.alternate_schedule)
                : "-"}
            </CommonText>
            <CommonText customTextStyle={styles.modeStyling}>
              {showPrimary
                ? !!dataObj?.type
                  ? dataObj?.type
                  : "-"
                : !!dataObj?.alternate_type
                ? dataObj?.alternate_type
                : "-"}
            </CommonText>
          </View>
        }
        rightSectionStyle={styles.dateAndModePortion}
      ></TwoColumn>
    </CustomTouchableOpacity>
  );
};

TimeSlotLabel.propTypes = {
  dataObj: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedDateLabel: PropTypes.object,
  showPrimary: PropTypes.bool,
};

TimeSlotLabel.defaultProps = {
  dataObj: {},
  onSelect: () => {},
  selectedDateLabel: {},
  showPrimary: true,
};

export default TimeSlotLabel;
