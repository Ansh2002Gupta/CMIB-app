import { Platform } from "@unthinkable/react-core-components";
import { fontFamily } from "../../theme/styles/commonStyles";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {},
    input: {
      height: 44,
      borderColor: colors.lightGrey,
      borderWidth: 1,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 4,
      borderRadius: Platform.OS === "web" ? 12 : 8,
      fontSize: 14,
      fontFamily: fontFamily,
      color: colors.black,
      borderStyle: "solid",
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };
};

export default getStyles;
