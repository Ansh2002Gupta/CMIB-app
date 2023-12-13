import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./SubHeading.style";

const SubHeadingText = ({ text }) => {
  return (
    <View>
      <CommonText customTextStyle={styles.heading} title={text} />
    </View>
  );
};

SubHeadingText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubHeadingText;
