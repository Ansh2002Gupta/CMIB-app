import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  backIcon: {
    height: 18,
    width: 18,
  },
  container: {
    flexDirection: "row",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    backgroundColor: colors.offWhite,
  },
  text: {
    fontSize: 14,
    color: colors.backgroundColor,
    marginLeft: 8,
  },
  touchableContainer: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 16,
    marginRight: 8,
    marginTop: 16,
  }
});

export default styles;
