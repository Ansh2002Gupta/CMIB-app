import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import { getResponsiveStyles, styles } from "./SignUpHeader.style";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, headerText, image } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const isWeb = Platform.OS === "web";

  return (
    <>
      {!isWebView && (
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
      )}
      <View style={isWeb && getResponsiveStyles({str: "steperContainer", currentBreakpoint})}>
        <Image
          source={image}
          style={
            isWebView ? [styles.iconBar, styles.webIconBar] : styles.iconBar
          }
        />
        {/* TODO: Replace the stepper */}
        {!isWebView && (
          <CommonText
            customTextStyle={styles.formHeaderStyle}
            title={headerText}
          />
        )}
      </View>
      {!isWebView && <View style={styles.borderStyle} />}
    </>
  );
};

SignUpHeader.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  image: PropTypes.node,
};

export default SignUpHeader;
