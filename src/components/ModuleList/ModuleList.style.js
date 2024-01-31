import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  disabled: {
    color: colors.slateGray,
  },
  leftArrow: {
    height: 15,
    width: 15,
  },
  leftArrowContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    cursor: "pointer",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 8,
  },
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
  moduleListWithoutCursor: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    cursor: "default",
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: "flex-start",
  },
  containerGridStyle: () => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
    backgroundColor: colors.secondaryGrey,
    borderColor: colors.darkBlue,
  },
  containerTextStyle: {
    marginLeft: 16,
    justifyContent: "center",
    width: "70%",
  },
  mainViewStyle: {
    backgroundColor: colors.secondaryGrey,
    padding: 24,
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
  text: {
    color: colors.white,
    fontSize: 14,
    ...Platform.select({
      web: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }),
  },
  textView: {
    justifyContent: "center",
  },
});

export default styles;
