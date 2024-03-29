import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  innerContainerStyle: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.white,
  },
  customCardStyle: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  addButtonStyle: {
    marginBottom: 20
  },
  customTextStyle: {
    fontSize: 14,
  },
};

export default style;
