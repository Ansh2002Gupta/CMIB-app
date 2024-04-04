import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import { fontFamily } from "../../theme/styles/commonStyles";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 44,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 4,
    borderRadius: Platform.OS === "web" ? 12 : 8,
    fontSize: 14,
    fontFamily:  Platform.OS === "web" ? "General Sans" : fontFamily,
    color: colors.black,
    borderStyle: "solid",
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
      chip: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        padding: 8,
        margin: 4,
        alignItems: 'center',
      },
      chipText: {
        marginRight: 4,
      },
      chipCloseButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 2,
      },
      chipCloseText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 16,
      },
});

export default styles;
