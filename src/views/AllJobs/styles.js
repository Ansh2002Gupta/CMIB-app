import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const isWeb = Platform.OS.toLowerCase() === "web";

const LIST_HEIGHT = isWeb ? "60vh" : undefined;

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
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
  customParentStyle: {
    width: "45%",
  },
  topSection: {
    // width: "40%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  noResultContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  bottomSectionStyle: {
    flex: 1,
  },
  noResultText: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.black,
    fontWeight: "600",
  },
  scrollStyle: {
    height: "60vh",
  },
  pagination: {
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: colors.red,
  },
  listSectionContainer: {
    marginTop: 20,
    height: LIST_HEIGHT,
  },
  savedJobComponent: {
    marginTop: undefined,
  },
  flatlist: {
    height: LIST_HEIGHT,
  },
  webTopSection: {},
  mobileTopSection: {},
  listFooter: {
    height: 30,
  },
};

export default styles;
