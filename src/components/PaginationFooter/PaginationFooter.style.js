import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  paginationFooterWeb: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.5,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  paginationFooter: {
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: colors.lightGrey,
    width: WIDTH - 2 * 24,
  },
  rowsPerPage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rowsPerPageWeb: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowsPerPageText: {
    fontSize: 14,
    marginRight: 14,
    color: colors.darkGrey,
  },
  previousButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
  previousButtonWeb: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
});

export default styles;
