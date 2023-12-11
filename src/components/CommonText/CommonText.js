import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import styles from "./CommonText.style";

const ButtonComponent = (props) => {
  const { title, customTextStyle } = props;
  return (
    <View>
      <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
    </View>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ButtonComponent;
