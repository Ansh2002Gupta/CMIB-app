import { View } from "@unthinkable/react-core-components";
import React from "react";
import Chip from "../../../../components/Chip";
import styles from "./styles";
import colors from "../../../../assets/colors";
import CommonText from "../../../../components/CommonText";

const ChipSection = ({ headerText = "", data = [], style = {} }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <CommonText customTextStyle={{ ...styles.headerTextStyle }}>
        {headerText}
      </CommonText>
      <View style={styles.chipContainer}>
        {data?.map((value) => {
          return (
            <View style={styles.chipView}>
              <Chip
                label={value}
                style={styles.chip}
                bgColor={colors.white}
                textColor={colors.black}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ChipSection;
