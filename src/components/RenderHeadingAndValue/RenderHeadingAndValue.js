import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { Text, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import getStyles from "./RenderHeadingAndValue.style";

const RenderHeadingAndValue = ({ label, value, isMandatory }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TwoRow
      style={styles.headingValueContainer}
      topSection={
        <View style={styles.headingContainer}>
          <CommonText customTextStyle={styles.headerText}>{label}</CommonText>
          {isMandatory && (
            <CommonText customTextStyle={styles.redText}>*</CommonText>
          )}
        </View>
      }
      bottomSection={
        <CommonText customTextStyle={styles.formalText}>{value}</CommonText>
      }
    />
  );
};

export default RenderHeadingAndValue;
