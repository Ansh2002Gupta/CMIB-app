import colors from "../../assets/colors";

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    paddingBottom: 24,
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: 26,
    paddingLeft: 26,
    paddingRight: 26,
    paddingBottom: 26,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  headerText: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    color: colors.black,
  },
  listContainer: {
    marginRight: 24,
    marginLeft: 24,
  },
  jobComponent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  customParentStyle: {},
  topSection: {
    width: "40%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  bottomSectionStyle: {},
  noResultText: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.black,
    fontWeight: "600",
  },
};

export default styles;
