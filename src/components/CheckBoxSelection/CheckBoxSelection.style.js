import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  iconStyle: {
    height: 20,
    width: 20,
  },
  titleStyle: {
    marginLeft: 8,
    marginBottom: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  disabledText: {
    color: colors.disabledGrey,
  },
  columnStyle: {
    ...Platform.select({
      web: {
        flexShrink: "unset",
      },
    }),
  },
  levelColor: color => ({
    color: color, 
    fontWeight: 'bold', 
  }),
  row: {
    flexDirection: 'row',
  },
});

export default styles;
