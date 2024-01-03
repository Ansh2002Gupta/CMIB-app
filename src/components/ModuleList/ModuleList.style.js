import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
    moduleListItem: {
        padding: 16,
        width: '100%',
        cursor: 'pointer',
      },
      changeText: {
        color: colors.white,
        fontSize:14,
      },
      disabled: {
        color: colors.slateGray
      },
      moduleListWithoutCursor:{
        padding: 16,
        width: '100%',
      }
})

export default styles;