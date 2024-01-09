import { Dimensions } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const deviceHeight = Dimensions.get("window").height;
const maxHeightPercentage = 0.8;
const minHeightThreshold = 500;
const maxHeight = deviceHeight * maxHeightPercentage;

let modalHeight = maxHeight;

if (deviceHeight < minHeightThreshold) {
  modalHeight = minHeightThreshold;
}

const style = {
  optionCotainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  optionCotainerBorder: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  optionCotainerBordeLight: {
    borderBottomWidth: 0.2,
    borderColor: colors.lightGrey,
  },
  profileParentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainerWeb: {
    marginTop: 16,
    marginBottom: 24,
    paddingLeft: 16,
    marginRight: 16,
    alignItems: "flex-start",
    minWidth: 240,
  },
  initialsContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 200,
    alignItems: "center",
    height: 64,
    width: 64,
  },
  detailContainer: {
    marginLeft: 12,
  },
  detailContainerWeb: {
    marginTop: 12,
  },
  fullNameStyle: {
    fontSize: 16,
    color: colors.black,
  },
  emailStyle: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  titleParentStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
  },
  titleStyle: {
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 12,
    color: colors.black,
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  leftIcon: {
    width: 24,
    height: 24,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  headerTextStyle: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  innerContainerStyle: {
    height: modalHeight,
    maxHeight: maxHeight,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
  },
};

export default style;
