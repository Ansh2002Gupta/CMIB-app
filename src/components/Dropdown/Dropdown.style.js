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

export const customStyles = (dropdownStyle, placeholderStyle) => ({
  control: (base, state) => ({
    ...base,
    ...(styles.control ? styles.control(state.isFocused) : {}),
    ...dropdownStyle,
  }),
  placeholder: (base) => ({
    ...base,
    ...placeholderStyle,
  }),
  singleValue: (base) => ({
    ...base,
    ...(styles.valueStyle || {}),
    ...dropdownStyle,
  }),
});

export const styles = StyleSheet.create({
  control: (isFocused) => ({
    borderWidth: isFocused ? 0 : 1,
    marginTop: 4,
    borderRadius: 12,
    padding: 6,
    fontSize: 14,
    fontFamily,
  }),
  valueStyle: {
    color: colors.black,
  },
});
