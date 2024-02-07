import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
  modalProfileImage: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  editProfileContainer: {
    alignSelf: "center",
    height: 152,
    width: 152,
    marginTop: 32,
    marginBottom: 32,
  },
  editButtonContainer: {
    paddingTop: 4,
    flexDirection: "row",
    flex: 1,
    marginBottom: 16,
    ...Platform.select({
      web: {
        paddingBottom: 0,
        paddingTop: 12,
      },
    }),
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
  },
  saveButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 14,
    flex: 1,
    backgroundColor: colors.green,
  },
  secondButtonStyle: {
    marginLeft: 16,
    flex: 1,
  },
  saveTextStyle: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },
  errorTextStyle: {
    fontSize: 14,
    color: colors.errorRed,
  },
  errorContainerStyle: {
    minHeight: 20,
    lineHeight: 20,
  },
  customHeadingStyle: {
    paddingBottom: 16,
  },
};
export default styles;
