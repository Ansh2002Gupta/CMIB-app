import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  contentStyle: {
    paddingBottom: 8,
  },
  innerContainerStyle: {
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: "row",
    paddingBottom: 24,
    alignItems: "center",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
  },
  cardContainer: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: colors.backgroundColor,
  },
  cardStyle: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
  },
  imageContainer: {
    marginBottom: 24,
    ...Platform.select({
      web: {
        width: 374,
      },
    }),
  },
  headingText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  valueStyle: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.black,
  },
  badgeContainer: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
  },
  customCardStyle: {
    marginTop: 16,
    marginBottom: 24,
    marginRight: 0,
    marginLeft: 0,
    padding: 0,
  },
  balanceInputStyle: {
    width: "30%",
  },
  customContainerStyle: {
    gridTemplateColumns: "1fr 1fr",
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 24,
    width: 192,
  },
  mobButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryGrey,
    paddingLeft: 14,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 24,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
  mobTextStyle: {
    color: colors.darkBlue,
    fontSize: 14,
  },
  customButtonStyle: {
    height: 44,
    width: 135,
  },
  webButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  infoStyle: {
    marginTop: -16,
    marginBottom: 24,
    color: colors.darkGrey,
    fontSize: 14,
    lineHeight: 24,
  },
};

export default style;
