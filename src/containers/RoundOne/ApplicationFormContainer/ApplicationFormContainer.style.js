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
  cardContainer: {
    height: 44,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
    zIndex: 0,
    cursor: "pointer",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  flexRowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginLeft8: {
    marginLeft: 8,
    width: 50,
  },
});

export default styles;
