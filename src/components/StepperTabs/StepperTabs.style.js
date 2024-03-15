import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const circleHeight = {
  height: 20,
  width: 20,
};

const circleBaseContainerStyle = {
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 24,
  },
  stepperContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  stepperActive: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.darkBlue,
    opacity: 1,
  },
  stepperpending: {
    opacity: 0.5,
  },
  stepperText: {
    fontSize: 14,
  },
  circleText: {
    fontSize: 14,
    color: colors.white,
  },
  stepperDoneIcon: {
    ...circleHeight,
  },
  activeCircleContainer: {
    ...circleHeight,
    ...circleBaseContainerStyle,
    backgroundColor: colors.green,
  },
  inActiveCircleContainer: {
    ...circleHeight,
    ...circleBaseContainerStyle,
    backgroundColor: colors.gray,
  },
});

export default styles;
