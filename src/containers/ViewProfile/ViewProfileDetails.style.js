import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  headingText: {
    color: colors.neutralGrey,
    fontSize: 24,
  },
  subHeadingText: {
    color: colors.subHeadingGray,
    fontSize: 14,
  },
  imageContainerStyle: {
    backgroundColor: colors.white,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: colors.white,
  },
  initialContainerStyle: {
    backgroundColor: colors.white,
    borderRadius: 200,
    height: 104,
    width: 104,
  },
  profileMainContainer: {
    background: `linear-gradient(to bottom, ${colors.silver} 40%, ${colors.white} 30%)`,
    padding: 8,
    borderRadius: 12,
    gap: 24,
  },
  secondSectionStyle: {
    gap: 8,
    alignItems: "center",
  },
  crossIconStyle: {
    height: 24,
    width: 24,
    paddingLeft: 16,
  },
  crossStyle: {
    alignSelf: "flex-end",
    marginBottom: 40,
  },
  designationContainer: {
    paddingTop: 6,
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  designationText: {
    fontSize: 14,
    color: colors.neutralGrey,
  },
  headerLeftIcons: {
    flexDirection: "row",
    paddingTop: 16,
    paddingRight: 16,
    alignItems: "center",
    zIndex: 2,
  },
  iconMoreContainer: {
    position: "relative",
  },
  deletetextContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    right: 12,
    top: 24,
    padding: 16,
    minWidth: 176,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
  },
  deletetext: {
    fontSize: 14,
  },
  customOuterContainer: {
    borderWidth: 6.5,
    borderColor: colors.white,
  },
});

export default styles;
