import { Platform, View } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./TimeSlotLable.styles";
import { TwoColumn } from "../../core/layouts";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import images from "../../images";

const TimeSlotLabel = ({ dataObj, onSelect, selectedDateLabelID }) => {
  const isWeb = Platform.OS.toLowerCase() === "web";

  return (
    <CustomTouchableOpacity
      onPress={() => onSelect(dataObj)}
      disabled={false}
      style={[
        styles.outerContainer,
        selectedDateLabelID === dataObj?.id
          ? styles.selectedOuterContainer
          : {},
      ]}
    >
      <TwoColumn
        leftSection={
          <TouchableImage
            isSvg={true}
            onPress={null}
            source={
              selectedDateLabelID === dataObj?.id
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
            >{`${dataObj?.date}, ${dataObj?.time}`}</CommonText>
            <CommonText
              customTextStyle={styles.modeStyling}
            >{`${dataObj?.mode}`}</CommonText>
          </View>
        }
        rightSectionStyle={styles.dateAndModePortion}
      ></TwoColumn>
    </CustomTouchableOpacity>
  );
};

export default TimeSlotLabel;
