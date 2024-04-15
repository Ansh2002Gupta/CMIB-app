import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  pdfImage: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  pdfLink: {
    color: colors.green,
    fontSize: 14,
    marginRight: 8,
  },
  arrowIconStyles: {
    width: 20,
    height: 20,
  },
});

export default styles;
