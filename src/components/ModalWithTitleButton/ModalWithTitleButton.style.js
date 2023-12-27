import { Platform , StyleSheet} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles =StyleSheet.create( {
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  leftButtonStyle: {
    backgroundColor: colors.white,
  },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.green,
  },
  rightButtonStyle: {
    backgroundColor: colors.green,
  },
  rightTextStyle: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: "600",
  },
  parentStyle:{
    ...Platform.select({
      ios: {
        marginBottom: 30, 
      },
    }),
  },
});

export default styles;
