import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const style = {
  containerStyle: {
    alignSelf: "center",
    backgroundColor: colors.black,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    zIndex:1,
  },
  textStyle: {
    color: colors.white,
    fontSize: 14,
    textAlign: "center",
    ...Platform.select({
      web:{
        whiteSpace: 'pre-line',
      }
    })
  },
};

export default style;
