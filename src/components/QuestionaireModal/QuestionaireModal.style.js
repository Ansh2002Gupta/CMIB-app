import {
  Dimensions,
  StyleSheet,
  Platform,
} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomSectionStyle: { marginTop: 32 },
  mainSectionStyle: { marginTop: 16 },
  questionTextView: {
    backgroundColor: colors.secondaryGrey,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 16,
  },

  questionText: { color: colors.black, fontSize: 14 },
  questionAnswer: { marginBottom: 24 },
  questionView: {
    alignItems: "center",
    marginBottom: 16,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  customContainerStyle: {
    paddingBottom: Platform.OS === "android" ? 0 : 22,
    maxHeight: Platform.OS === "web" ? 44 : "auto",
    justifyContent: "flex-end",
  },
  subContainerStyle: {
    width: "50%",
  },
  buttonWebStyle: {
    width: "100%",
    alignItems: "flex-end",
  },
  starStyle: { color: colors.errorRed, marginLeft: 4 },
  modalContainerStyle: {
    padding: 2,
    ...Platform.select({
      ios: {
        maxHeight: deviceHeight / 1.5,
      },
      android: {
        maxHeight: deviceHeight / 2.5,
      },
      web: {
        maxHeight: deviceHeight * 0.5,
      },
    }),
  },
});

export default styles;
