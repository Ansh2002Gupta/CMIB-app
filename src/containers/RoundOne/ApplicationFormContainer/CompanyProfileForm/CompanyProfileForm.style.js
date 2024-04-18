import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGrey,
    flex: 1,
  },
  containerGridStyle: (columnCount) => ({
    display: "grid",
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
    paddingBottom: 8,
  }),
  cardStyle: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
  },
  companyLogo: {
    marginTop: 24,
    marginBottom: 24,
    height: 184,
    width: 347,
  },
  imageContainer: {
    marginBottom: 24,
    ...Platform.select({
      web: {
        maxWidth: 374,
      },
    }),
  },
  infoStyle: {
    marginBottom: 24,
    color: colors.darkGrey,
    fontSize: 14,
    lineHeight: 24,
  },
  textContainer: {
    flexDirection: "row",
    paddingBottom: 24,
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    padding: 24,
    backgroundColor: colors.backgroundGrey,
  },
  valueStyle: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.black,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  loading: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonStyle: {
    fontSize: 14,
  },
});

export default styles;
