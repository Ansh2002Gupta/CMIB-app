import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles =StyleSheet.create( {
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    color: colors.black,
    marginTop: 20,
  },
  subHeaderText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 22,
    marginTop: 8,
  },
  logo: {
    ...Platform.select({
      web: {
        height: 48,
        width: 48,
      },
      default: {
        height: 24,
        width: 24,
      },
    }),
  },
  cancelStyle: {
    ...Platform.select({
      web: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
      },
      default: {
        padding: 14,
      },
    }),
  },
  saveStyle: {
    ...Platform.select({
      web: {
        backgroundColor: colors.yellow,
        marginLeft: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
      },
      default: {
        backgroundColor: colors.yellow,
        marginLeft: 16,
        padding: 14,
      },
    }),
  },
  rightTextStyle: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
  gapStyle: {
    ...Platform.select({
      web: {
        marginTop: 32,
      },
      default: {
        marginTop: 24,
      },
    }),
  },
  parentStyle: {
    ...Platform.select({
      web: {
        padding: 8,
      },
      default: {
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
    }),
  },
});

export default styles;
