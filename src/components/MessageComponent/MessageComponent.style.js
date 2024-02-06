import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  senderMessageStyle: {
    margin: 10,
    padding: 16,
    backgroundColor: colors.backgroundSecondGrey,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 2,
    maxWidth: 680,
  },
  recieverMessageStyle: {
    margin: 10,
    padding: 16,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 16,
    maxWidth: 680,
  },
});

export default styles;
