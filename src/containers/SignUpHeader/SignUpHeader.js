import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, headerText, image } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onClickGoToLogin();
        }}
        style={styles.headerContainerStyle}
      >
        <CommonText
          customTextStyle={styles.headerTextStyle}
          title={intl.formatMessage({ id: "label.go_back_to_login" })}
        />
      </TouchableOpacity>
      <Image source={image} style={styles.iconBar} />
      <CommonText customTextStyle={styles.formHeaderStyle} title={headerText} />
      <View style={styles.borderStyle} />
    </View>
  );
};

SignUpHeader.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SignUpHeader;
