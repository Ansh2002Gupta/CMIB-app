import {
  StyleSheet,
  Dimensions,
  Platform,
} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

const basetextStyle = {
  fontSize: 14,
  flexWrap: "wrap",
  maxWidth: 480,
  wordBreak: "break-word",
  overFlow: "hidden",
  whiteSpace: "break-space",
};

const styles = StyleSheet.create({
  headerText: {
    color: colors.darkGrey,
    fontSize: 14,
  },
  formalText: {
    ...basetextStyle,
  },
  redText: {
    color: colors.red,
  },
  headingContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8,
  },
  headingValueContainer: {
    marginRight: 16,
    marginBottom: 16,
  },
});

export default styles;
