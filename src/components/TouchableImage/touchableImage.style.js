import colors from "../../assets/colors";

const styles = {
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 44,
  },
  clickable: {
    cursor: "pointer",
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    borderColor: colors.black,
    borderWidth: 1,
  },
};

export default styles;
