import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
    changeText: {
        color: colors.white,
        fontSize: 14,
    },
    changeTextContainer: {
        backgroundColor: colors.offWhite,
        borderRadius: 12,
        cursor: "pointer",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
    contentText: {
        alignItems: "center",
        backgroundColor: colors.offWhite,
        borderBottomColor: colors.slateGray,
        borderBottomWidth: 1,
        justifyContent: "space-between", 
        padding: 16, 
    },
    titleText: {
        color: colors.darkGrey,
        fontSize: 14,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 16,
    },
});

export default styles;