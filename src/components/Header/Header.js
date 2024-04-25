import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import getStyles from "./Header.style";

const Header = (props) => {
  const { customHeaderTextStyle, headerText } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <CommonText
          customTextStyle={{
            ...styles.formHeaderStyle,
            ...customHeaderTextStyle,
          }}
        >
          {headerText}
        </CommonText>
      </View>
      <View style={styles.borderStyle} />
      <ThemeSwitcher />
    </View>
  );
};

Header.defaultProps = {
  customHeaderTextStyle: {},
};

Header.propTypes = {
  customHeaderTextStyle: PropTypes.object,
  headerText: PropTypes.string.isRequired,
};

export default Header;
