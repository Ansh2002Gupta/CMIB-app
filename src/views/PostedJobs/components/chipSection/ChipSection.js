import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import Chip from "../../../../components/Chip";
import CommonText from "../../../../components/CommonText";
import getStyles from "./styles";

const ChipSection = ({ headerText = "", data = [], style = {} }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
                bgColor={theme.colors.white}
                textColor={theme.colors.black}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ChipSection;
