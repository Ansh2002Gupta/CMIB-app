import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  moduleListItem: (isSelected) => ({
    paddingLeft: isSelected ? 13 : 16,
    paddingRight: isSelected ? 13 : 16,
    paddingTop: 18,
    paddingBottom: 18,
    width: "100%",
    cursor: "pointer",
    justifyContent: "flex-start",
    borderLeftWidth: isSelected ? 3 : 0,
    borderColor: colors.white,
    backgroundColor: isSelected ? colors.offWhite : "transparent",
  }),
  changeText: {
    color: colors.white,
    fontSize: 14,
  },
  disabled: {
    color: colors.slateGray,
  },
  moduleListWithoutCursor: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: "flex-start",
  },
  containerGridStyle: () => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr  ",
    gap: 16,
  }),
  moduleTabStyle: {
    borderWidth: 1,
    flexDirection: "row",
    padding: 24,
    borderRadius: 8,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
  activeTabStyle: {
    backgroundColor: "#F2F4FC",
    borderColor: colors.darkBlue,
    borderWidth: 1,
    flexDirection: "row",
    padding: 24,
    borderRadius: 8,
  },
  containerTextStyle: {
    marginLeft: 16,
    justifyContent: "center",
    width: "70%",
  },
  mainViewStyle: {
    backgroundColor: colors.secondaryGrey,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 24,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  modalContainerStyle: {
    padding: 0,
    paddingTop: 24,
    borderRadius: 12,
    maxWidth: 700,
  },
  modalHeadingStyle: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 24,
  },
  experienceMemberTextStyle: {
    fontSize: 14,
    color: colors.subHeadingGray,
  },
  moduleImageStyle: {
    width: 48,
    height: 48,
  },
  moduleTextStyle: {
    fontSize: 18,
  },
  tickImageStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;
