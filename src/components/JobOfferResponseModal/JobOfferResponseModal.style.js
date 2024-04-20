import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mobContainer: {
    marginBottom: 20,
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
});

export default styles;
