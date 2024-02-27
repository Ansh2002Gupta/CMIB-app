import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
    circleContainer: (isSelected) => ({
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: isSelected ? colors.green : colors.disabledGrey,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    }),
    circleText: {
        fontSize: 12,
        color: colors.white,
    },
    mainContainer: {
        flexDirection: "row",
        marginTop: 24,
    },
    stepperContainer: (isSelected) => ({
        flexDirection: "row",
        paddintTop: 9,
        paddingBottom: 9,
        marginRight: 24,
        borderColor: colors.black,
        borderBottomWidth: isSelected ? 1 : 0,
    }),
    titleText: {
        fontSize: 14,
        color: colors.black,
    }

});

export default styles;