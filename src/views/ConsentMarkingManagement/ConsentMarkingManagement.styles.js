import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
    webHeaderContainer: {
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        borderBottomColor: colors.white,
        borderTopColor: colors.white,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: colors.white,
    },
    headerText: (isWebView) => ({
        fontSize: isWebView ? 32 : 20,
    }),
    headerContainer: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        ...Platform.select({
            web: {
                borderTopColor: colors.white,
                borderTopWidth: 1,
                paddingTop: 24,
            },
        }),
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 16
    },
    mainContainer: {
        flex: 1,
    },
    row: {
        flex: 1
    },
    popupMessageStyle: {
        position: "absolute",
        top: 0,
        right: 15,
        height: "auto",
        width: "auto",
        minWidth: 233,
        zIndex: 1,
        backgroundColor: 'red'
    },
    mobileContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        paddingLeft: 24,
        borderBottomWidth: 1,
        borderColor: colors.greyOne,
        backgroundColor: colors.white,
        zIndex: 0,
        position: "relative",
    },
    rowsPerPageWeb: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconTicket: {
        height: 20,
        width: 20,
    },
    cellTextStyle: (fontSize = 14) => ({
        fontSize,
        ...Platform.select({
            web: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "100%",
            },
        }),
    }),
};

export default styles;
