import { StyleSheet } from "@unthinkable/react-core-components";
import { fontFamily } from "../../theme/styles/commonStyles";
import colors from "../../assets/colors";

export const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: colors.secondaryGrey,
    primary: colors.lightBlue,
    primary50: colors.lightBlue,
    primary75: colors.lightBlue,
  },
});

export const customStyles = (dropdownStyle, placeholderStyle, isDisabled) => ({
  control: (base, state) => ({
    ...base,
    ...(styles.control ? styles.control(state.isFocused, isDisabled) : {}),
    marginTop: "4px",
    ...dropdownStyle,
  }),
  placeholder: (base) => ({
    ...base,
    ...placeholderStyle,
    fontWeight: "500",
  }),
  singleValue: (base) => ({
    ...base,
    ...(styles.valueStyle || {}),
    ...dropdownStyle,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? colors.lightGray : "inherit",
    color: colors.black,
    fontFamily,
    fontSize: 14,
    "&:hover": {
      backgroundColor: state.isSelected
        ? colors.lightGray
        : colors.secondaryGrey,
    },
  }),
});

export const styles = StyleSheet.create({
  control: (isFocused, isDisabled) => ({
    borderWidth: isFocused ? 0 : 1,
    borderColor: colors.lightGrey,
    borderRadius: 12,
    padding: 6,
    fontSize: 14,
    fontFamily,
    transition: "none",
    "&:hover": {
      borderColor: colors.lightGrey,
      cursor: isDisabled ? "not-allowed" : "pointer",
    },
    ...(isDisabled
      ? {
          backgroundColor: colors.disabledTextFieldColor,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }
      : {}),
  }),
  valueStyle: {
    color: colors.black,
    fontWeight: "500",
  },
  multiSelectOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  multiSelectOptionStyle: {
    paddingLeft: 16,
    paddingTop: 14,
  },
  multiSelectOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  multiSelectOptionStyle: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  multiSelectOptionStyleDisabled: {
    opacity: 0.5,
  },
});
