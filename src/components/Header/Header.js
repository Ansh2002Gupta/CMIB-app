import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./Header.style";

const Header = (props) => {
  const { customHeaderTextStyle, headerText } = props;
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
