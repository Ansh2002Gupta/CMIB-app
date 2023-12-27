import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    color: colors.black,
    marginTop:20,
  },
  subHeaderText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 22,
    marginTop:8,
  },
  logo: {
    height : 24,
    width :24,
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 24,
    paddingBottom: 24,
  },
  saveStyle: {
    backgroundColor: colors.yellow,
    marginLeft: 16,
  },
  rightTextStyle: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
    lineHeight:20,
  },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
  vacancyStyle: {
    marginTop: 24,
  },
  parentStyle:{
    ...Platform.select({
      ios: {
        marginBottom: 18, 
      },
    }),
  },
};

export default styles;
