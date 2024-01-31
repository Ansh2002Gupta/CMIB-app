import colors from "../../assets/colors";
const styles = {
  mainContainer: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 12,
  },
  imageStyle: {
    height: 48,
    width: 48,
    borderRadius: 48,
  },
  middleSectionStyle: {
    marginTop: 20,
    marginBottom: 32,
    gap: 5,
  },
  bottomSectionStyle: {
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 8,
    width: 140,
    alignItems: "center",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: colors.mustardYellow,
    padding: 12,
    borderRadius: 8,
    width: 140,
    alignItems: "center",
    cursor: "pointer",
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
  },
  headingText: {
    color: colors.black,
    fontSize: 24,
  },
  subHeadingText: {
    color: colors.subHeadingGray,
    fontSize: 14,
  },
  imageContainerStyle: {
    backgroundColor: "white",
    borderRadius: 200,
    borderWidth: 5,
    borderColor: colors.white,
  },
  initialContainerStyle: {
    backgroundColor: "white",
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
  thirdSectionStyle: {
    gap: 5,
    alignItems: "center",
  },
  lastSectionStyle: {
    alignItems: "center",
    gap: 8,
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
  headingStyle: {
    justifyContent: "space-between",
  },
  changeProfileContainer: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 12,
    gap: 40,
  },
  profileImageStyle: {
    height: 152,
    width: 152,
    borderRadius: 152,
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
};
export default styles;
