import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import styles from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, headerText, image } = props;

  return (
    <View>
      <CustomTouchableOpacity
        onPress={() => {
          onClickGoToLogin();
        }}
        style={styles.headerContainerStyle}
      >
        <CommonText
          customTextStyle={styles.headerTextStyle}
          title={intl.formatMessage({ id: "label.go_back_to_login" })}
        />
      </CustomTouchableOpacity>
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
  image: PropTypes.node,
};

export default SignUpHeader;
