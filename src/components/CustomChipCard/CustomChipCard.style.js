import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  selectedItemsContainer: {
    backgroundColor: colors.secondaryGrey,
    padding: 8,
    flexDirection: "row",
    borderRadius: 16,
    marginTop: 4,
    marginRight: 4,
    alignItems: "center",
  },
  iconCloseDark: {
    height: 5,
    width: 5,
    marginLeft: 4,
  },
});

export default styles;
