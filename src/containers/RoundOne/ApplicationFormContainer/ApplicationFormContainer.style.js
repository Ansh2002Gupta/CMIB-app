import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  saveCancelButtonStyle: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
    marginRight: 16,
    marginLeft: 16,
  },
  actionBtnContainer: {
    flexDirection: "row",
    gap: 16,
  },
  mainViewStyle: {
    flex: 1,
  },
});

export default styles;
