import React from "react";
import { Text, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import styles from "./RenderHeadingAndValue.style";

const RenderHeadingAndValue = ({ label, value, isMandatory }) => {
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
