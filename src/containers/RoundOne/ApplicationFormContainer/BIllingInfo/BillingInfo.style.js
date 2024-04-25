import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.backgroundColor,
  },
  customTableStyle: {
    backgroundColor: colors.white,
    padding: 0,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  headerText: {
    fontSize: 16,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    paddingTop: 24,
    backgroundColor: colors.backgroundColor,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  backButtonStyle: {
    fontSize: 14,
  },
  interviewDatesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  columnStyleBorder: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderTopWidth: 0.5,
  },
  nextButtonStyle: { fontSize: 14, color: colors.white },
});
export default styles;
