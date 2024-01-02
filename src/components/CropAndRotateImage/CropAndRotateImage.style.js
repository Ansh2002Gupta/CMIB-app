import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
  cropperContainer: {
    position: "relative",
    overflowY: "auto",
    padding: "16 24",
    borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
    borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
    backgroundColor: colors.greyFour,
    ...Platform.select({
      web: {
        height: "max(20vh, 400px)",
      },
    }),
    borderRadius: 16,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginTop: 32,
  },
};

export default styles;
