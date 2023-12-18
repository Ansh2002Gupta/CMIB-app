import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./SignUpHeader.style";
import { MediaQueryContext } from "@unthinkable/react-theme";
import useIsWebView from "../../hooks/useIsWebView";

const SignUpHeader = (props) => {
  const { intl, onClickGoToLogin, headerText, image } = props;
  const isWeb = Platform.OS === "web";
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "steperContainer": {
        if (currentBreakpoint === "lg") {
          return {
            ...styles.lgStepperContainer,
          };
        }
        if (currentBreakpoint === "md") {
          return {
            ...styles.lgStepperContainer,
          };
        }
        if (currentBreakpoint === "sm") {
          return {
            ...styles.smStepperContainer,
          }
        }
        if (currentBreakpoint === "xs") {
          return;
        }
        return {
          ...styles.stepperContainer,
        };
      }
      default:
        return;
    }
  };

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
      <View style={isWeb && getResponsiveStyles("steperContainer")}>
        <Image
          source={image}
          style={
            isWebView ? [styles.iconBar, styles.webIconBar] : styles.iconBar
          }
        />
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
