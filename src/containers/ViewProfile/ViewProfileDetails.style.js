import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  headingText: {
    color: colors.black,
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
    cursor: "pointer",
    padding: 16,
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
    color: colors.black,
  },
});
export default styles;
