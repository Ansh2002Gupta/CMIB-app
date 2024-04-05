import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 16,
    paddingBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGrey,
    justifyContent: "center",
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerMain: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  designationText: {
    fontSize: 16,
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  detailRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
  },
  dotIcon: {
    height: 6,
    width: 6,
  },
  numberTextStyle: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  iconTicket: {
    height: 6,
    width: 6,
  },
  flexOneRow: {
    flex: 1,
    flexDirection: "row",
  },
  marginLeft4: {
    marginLeft: 4,
  },
  tableStyle: {
    height: 18,
    width: 18,
  },
  textAlign: {
    textAlign: "left",
  },
  marginRight16: {
    marginRight: 16,
  },
});
export default styles;
