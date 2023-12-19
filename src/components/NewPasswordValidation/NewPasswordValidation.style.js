import colors from "../../assets/colors";

const style = {
  bulletText: {
    fontSize: 14,
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    color: colors.black,
  },
  validationView: {
    flexDirection: "row",
    marginTop: 8,
  },
  bulletIconStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    margin: 5,
  },
  activityBulletStyle: (isValid) => ({
    backgroundColor: isValid ? colors.green : colors.lightGrey,
  }),
};
export default style;
