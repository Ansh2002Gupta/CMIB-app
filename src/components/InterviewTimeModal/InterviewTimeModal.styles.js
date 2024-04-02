import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  webContainer: {},
  mobContainer: {
    marginBottom: 20,
  },
  dateLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxHeight: 212,
    overflow: "auto",
  },
  subHeaderText: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
  },
  footerText: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    color: colors.darkGrey,
  },
  jobDetailsOuterContainer: {
    backgroundColor: colors.secondaryGrey,
    padding: 16,
    borderRadius: 16,
  },
  companyText: {
    fontSize: 14,
  },
  designationText: {
    fontSize: 14,
  },
  inRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  cancelButtonContainer: {
    alignItems: "flex-end",
  },
  confirmButtonContainer: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "flex-end",
  },
  confirmButton: {
    width: 139,
  },
  actionButtonContainer: {
    paddingBottom: Platform.OS === "android" ? 0 : 22,
    maxHeight: Platform.OS === "web" ? 44 : "auto",
    justifyContent: "flex-end",
    gap: 10,
  },
});

export default styles;
