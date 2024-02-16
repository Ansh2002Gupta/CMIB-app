import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  disabled: {
    opacity: 0.8,
  },
  webContainer: {
    paddingTop: 40,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
  },
  headingText: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
  },
  roleText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: colors.lightGrey,
  },
  profileIcon: {
    alignSelf: "center",
  },
  detailsSection: {
    textAlign: "left",
    marginBottom: 24,
  },
  detailHeading: {
    color: colors.darkGrey,
    marginBottom: 8,
  },
  subDetailHeading: {
    fontSize: 14,
  },

  //Mobile styles

  mobileContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundColor,
  },

  ticketDetailsCard: {
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 24,
  },
});

export default styles;
