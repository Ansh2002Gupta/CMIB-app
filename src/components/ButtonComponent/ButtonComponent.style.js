import colors from "../../assets/colors";
import { StyleSheet } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  buttonStyle: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
  },
  disableButtonStyle: {
    backgroundColor: colors.voilet,
  },
  titleStyle: {
    fontSize: 16,
    color: colors.white,
    margin: 8,
    fontWeight: "600",
  },
});

export default styles;
