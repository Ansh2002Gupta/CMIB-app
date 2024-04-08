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
  lableID,
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
    return formattedDate;
  };

  return (
    <CustomTouchableOpacity
      onPress={() =>
        onSelect({
          id: lableID,
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
                id: lableID,
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
            style={{ height: 24, width: 24 }}
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
