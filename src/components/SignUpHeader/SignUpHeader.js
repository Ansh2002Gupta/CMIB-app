import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import styles from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, headerText, image, children } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onClickGoToLogin();
        }}
        style={styles.headerContainerStyle}
      >
        <Text style={styles.headerTextStyle}>
          {intl.formatMessage({ id: "label.go_back_to_login" })}
        </Text>
      </TouchableOpacity>
      <Image source={image} style={styles.iconBar} />
      <Text style={styles.formHeaderStyle}>{headerText}</Text>
      <View style={styles.borderStyle} />
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
};

SignUpHeader.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default SignUpHeader;
