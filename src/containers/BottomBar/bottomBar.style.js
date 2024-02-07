import colors from "../../assets/colors";

const styles = {
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  activeStyleDashboard: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginLeft: 5,
  },
  activeStyleMyaccount: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginRight: 5,
  },
  buttonStyle: {
    alignItems: "center",
    padding: 16,
  },
  sectionViewStyle: { width: 48, height: 48, padding: 15 },
  imageStyle: { width: "100%", height: "100%" },
  sectionStyle: { flex: 1 },
};

export default styles;
