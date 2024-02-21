import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  enabled: {
    fontSize: 14,
  },
  disabled: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  slashStyles: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default styles;
