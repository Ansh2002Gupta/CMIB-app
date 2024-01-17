import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
    listItem: (isSelected) => ({
        paddingLeft: isSelected ? 13 : 16,
        paddingRight: isSelected ? 13 : 16,
        paddingTop: 18,
        paddingBottom: 18,
        width: "100%",
        borderLeftWidth: isSelected ? 3 : 0,
        borderColor: colors.white,
        justifyContent: 'flex-start',
        backgroundColor: isSelected ? colors.offWhite : 'transparent',
    }),
    text: (isSelected) => ({
        color: isSelected ? colors.white : colors.lightGrey,
        fontSize: 14,
        fontWeight: isSelected ? '600' : '500',
    }),
    searchParent: {
        borderColor: colors.black,
        backgroundColor: colors.offWhite,
        margin: 16,
    },
    searchInput: {
        color: colors.lightGrey,
        backgroundColor: 'transparent',
    },
});

export default styles;
