import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      marginBottom: 16,
    },
    flexDirectionRow: {
      flexDirection: "row",
    },
    questionTextStyles: {
      fontSize: 14,
      color: colors.darkGrey,
    },
    marginLeft4: {
      marginLeft: 4,
    },
    questionTypeStyle: {
      fontSize: 14,
      color: colors.darkGrey,
    },
    mandatory: {
      fontSize: 14,
      color: colors.red,
    },
    marginTop8: {
      marginTop: 8,
    },
    optionStyle: {
      fontSize: 14,
      color: colors.black,
    },
    optionViewStyle: {
      marginTop: 8,
      marginBottom: 8,
    },
    innerOptionView: {
      marginBottom: 8,
      marginLeft: 2,
    },
  };
};

export default getStyles;
