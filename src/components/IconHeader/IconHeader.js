import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./IconHeader.style";

const IconHeader = ({ headerText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <CommonText customTextStyle={styles.formHeaderStyle} fontWeight="600">
          {headerText}
        </CommonText>
      </View>
      <View style={styles.borderStyle} />
    </View>
  );
};

IconHeader.propTypes = {
  headerText: PropTypes.string,
};

export default IconHeader;
