import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import styles from "./CommonText.style";

const CommonText = (props) => {
  const { title, customTextStyle } = props;
  return (
    <View>
      <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
    </View>
  );
};

CommonText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CommonText;
