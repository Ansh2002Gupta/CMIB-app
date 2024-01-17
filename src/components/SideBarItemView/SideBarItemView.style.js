import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
    titleText: {
        color: colors.darkGrey,
        fontSize: 14,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 16,
    },
    contentText: {
        padding: 16,
        backgroundColor: colors.offWhite,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.slateGray,
    },
    changeTextContainer: {
        backgroundColor: colors.offWhite,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        cursor: "pointer",
    },
    changeText: {
        color: colors.white,
        fontSize: 14,
    },
});

export default styles;