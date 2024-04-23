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
    }
};

export default styles;
