import {
  StyleSheet,
  Platform,
  Dimensions,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
import getModalHeight, { maxModalHeight } from "../../utils/getModalHeight";

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  notficationIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconNotification: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  headerTextStyle: {
    paddingTop: 0,
    fontWeight: "600",
    paddingBottom: 24,
  },
  innerContainerStyle: {
    height: getModalHeight(),
    maxHeight: maxModalHeight,
  },
  containerStyle: {
    padding: 0,
  },
  largeModalContainer: (keyboardHeight) => ({
    maxHeight: keyboardHeight * 2.2,
  }),
  modalInnerContainer: {
    ...Platform.select({
      ios: {
        maxHeight: deviceHeight / 1.5,
      },
      android: {
        maxHeight: deviceHeight * 0.65,
      },
    }),
  },
  buttonTwoStyle: {
    backgroundColor: colors.red,
  },
  buttonTwotextStyle: {
    color: colors.white,
  },
  disableStyle: {
    ...Platform.select({
      web: {
        cursor: "not-allowed",
      },
    }),
  },
});

export default styles;
